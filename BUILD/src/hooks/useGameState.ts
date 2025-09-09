
import { useState, useCallback } from 'react';
import { GameState, ZenkaiType, Gym, Trainer, Zenkai, League, WeeklyReport, Upgrade, EndOfSeasonChallenge, SponsorshipDeal, ZenkaiData, TrainerData, TrainerTraitId, GymBattleReport, Roster, LeagueRankChange, SeasonalMission, Notification, Tab } from '../types';
import { ZENKAI_TYPES, INITIAL_MONEY, INITIAL_POPULARITY, GYM_WEEKLY_COST, WEEKS_PER_SEASON, NUM_LEAGUES, EXPEDITION_COST, BATTLE_WIN_MONEY, ZENKAI_TRAIN_COST_BASE, TRAINER_TRAIN_COST_BASE, NUM_AVAILABLE_TRAINERS, TRAINER_REROLL_COST, INCOME_PER_10_POPULARITY, ZENKAI_SELL_PRICE } from '../constants';
import { ZENKAI_DATA, TRAINER_DATA, SPONSORSHIP_DEALS_DATA, TRAINER_TRAITS_DATA, ZENKAI_TYPE_MATCHUPS } from '../data';

const generateId = () => Math.random().toString(36).substr(2, 9);

const INITIAL_TRAINER_LEVEL = 1;
const INITIAL_ZENKAI_LEVEL = 5;

const BASE_FORM_ZENKAIS = ZENKAI_DATA.filter(p => p.forma === 'Base');

const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const MISSION_TEMPLATES: { type: string; baseTarget: number; baseReward: number; text: string; }[] = [
    { type: 'win_battles', baseTarget: 20, baseReward: 7000, text: 'Vença {target} batalhas de ginásio.' },
    { type: 'earn_money_battles', baseTarget: 10000, baseReward: 9000, text: 'Ganhe ${target} em batalhas de ginásio.' },
    { type: 'complete_expeditions', baseTarget: 5, baseReward: 10500, text: 'Complete com sucesso {target} expedições.' },
    { type: 'catch_zenkais', baseTarget: 10, baseReward: 13500, text: 'Capture {target} novos Zenkais.' },
    { type: 'train_zenkai', baseTarget: 15, baseReward: 6500, text: 'Treine seus Zenkais {target} vezes.' },
    { type: 'train_trainer', baseTarget: 5, baseReward: 7000, text: 'Treine seus Treinadores {target} vezes.' },
    { type: 'hire_trainers', baseTarget: 2, baseReward: 17000, text: 'Contrate {target} novos treinadores.' },
    { type: 'gain_popularity', baseTarget: 50, baseReward: 12000, text: 'Ganhe {target} pontos de popularidade.' },
    { type: 'purchase_upgrades', baseTarget: 3, baseReward: 8500, text: 'Compre {target} melhorias de infraestrutura.' },
    { type: 'accept_sponsorships', baseTarget: 1, baseReward: 7000, text: 'Aceite {target} novos acordos de patrocínio.' },
    { type: 'evolve_zenkais', baseTarget: 1, baseReward: 10000, text: 'Evolua {target} Zenkai.' },
    { type: 'reach_total_power', baseTarget: 1200, baseReward: 11000, text: 'Atinja um poder total da liga de {target}.' },
    { type: 'assign_all_gyms', baseTarget: 4, baseReward: 7000, text: 'Designe líderes para {target} dos seus ginásios.' },
    { type: 'achieve_money', baseTarget: 35000, baseReward: 5500, text: 'Atinja um saldo bancário de ${target}.' },
    { type: 'level_up_zenkai', baseTarget: 25, baseReward: 5500, text: 'Suba o nível dos seus Zenkais {target} vezes.' },
    { type: 'level_up_trainer', baseTarget: 10, baseReward: 7500, text: 'Suba o nível dos seus Treinadores {target} vezes.' },
    { type: 'max_out_upgrade', baseTarget: 1, baseReward: 17000, text: 'Maximize {target} melhoria de infraestrutura.' },
    { type: 'defeat_stronger_opponent', baseTarget: 5, baseReward: 12500, text: 'Vença {target} batalhas de ginásio contra oponentes mais fortes.' },
];

const generateSeasonalMissions = (rank: number, season: number): SeasonalMission[] => {
    const tier = rank > 10 ? 1 : (rank > 5 ? 2 : 3);
    const multipliers: { [key: number]: { target: number, reward: number } } = {
        1: { target: 1.0, reward: 1.0 },
        2: { target: 1.8, reward: 2.0 },
        3: { target: 3.0, reward: 3.5 },
    };
    const selectedMultiplier = multipliers[tier];

    const shuffledMissions = shuffleArray(MISSION_TEMPLATES);
    const selectedTemplates = shuffledMissions.slice(0, 6);

    return selectedTemplates.map(template => {
        const targetValue = Math.ceil(template.baseTarget * selectedMultiplier.target);
        const reward = Math.floor(template.baseReward * selectedMultiplier.reward / 100) * 100;
        const description = template.text.replace('{target}', targetValue.toLocaleString());
        return {
            id: `${template.type}_${season}`,
            type: template.type,
            description,
            targetValue,
            currentProgress: 0,
            reward,
            isCompleted: false,
            isClaimed: false,
        };
    });
};

const getZenkaiPower = (basePower: number, level: number) => basePower + (level * 10);
const calculateXpForLevel = (level: number) => Math.floor(100 * Math.pow(level, 1.2));
const XP_FOR_LOSS = 40;
const XP_FOR_WIN = 80;
const TRAINER_XP_FOR_LOSS = 10;
const TRAINER_XP_FOR_WIN = 20;

const AI_LEAGUE_POWER_RANGES: { [rank: number]: [number, number] } = {
    14: [950, 1100], 13: [1100, 1400], 12: [1400, 1600],
    11: [1600, 1900], 10: [1900, 2100], 9: [2100, 2300],
    8: [2300, 2600], 7: [2600, 3000], 6: [3000, 3500],
    5: [3500, 3700], 4: [3700, 3900], 3: [3900, 4100],
    2: [4100, 4500], 1: [4500, 5000],
};


// UTILITY FUNCTIONS (moved outside the hook for purity)
const levelUpZenkai = (zenkai: Zenkai): Zenkai => {
    const newLevel = zenkai.level + 1;
    const newXpToNext = calculateXpForLevel(newLevel);
    let updatedZenkai = {
        ...zenkai,
        level: newLevel,
        power: getZenkaiPower(zenkai.basePower, newLevel),
        xp: 0,
        xpToNextLevel: newXpToNext,
    };

    const evolutionData = ZENKAI_DATA.find(p => p.name === zenkai.name)?.evolution;
    if (evolutionData && evolutionData.level && newLevel >= evolutionData.level) {
        const evolutionTemplate = ZENKAI_DATA.find(p => p.name === evolutionData.to);
        if (evolutionTemplate) {
            updatedZenkai = {
                ...updatedZenkai,
                name: evolutionTemplate.name,
                type: evolutionTemplate.type,
                basePower: evolutionTemplate.basePower,
                power: getZenkaiPower(evolutionTemplate.basePower, newLevel),
                forma: evolutionTemplate.forma,
                habitat: evolutionTemplate.habitat,
            }
        }
    }
    return updatedZenkai;
};

const levelUpTrainer = (trainer: Trainer): Trainer => {
    const newLevel = trainer.level + 1;
    const newXpToNext = calculateXpForLevel(newLevel);
    return {
        ...trainer,
        level: newLevel,
        xp: 0,
        xpToNextLevel: newXpToNext,
    };
};

const createAndLevelUpZenkai = (template: ZenkaiData, targetLevel: number): Zenkai => {
    let zenkai: Zenkai = {
        id: generateId(),
        name: template.name,
        type: template.type,
        level: 1,
        basePower: template.basePower,
        power: getZenkaiPower(template.basePower, 1),
        xp: 0,
        xpToNextLevel: calculateXpForLevel(1),
        habitat: template.habitat,
        forma: template.forma,
        isLocked: false,
    };

    for (let i = 1; i < targetLevel; i++) {
        const leveledUp = levelUpZenkai(zenkai);
        zenkai = { ...leveledUp, xp: 0 }; 
    }
    // Final check for level 1
    if (targetLevel === 1) {
        return zenkai;
    }

    return { ...zenkai, level: targetLevel, power: getZenkaiPower(zenkai.basePower, targetLevel) };
}

const calculatePureTeamPower = (trainer: Trainer, team: Zenkai[], upgrades: Record<string, number>, gymType?: ZenkaiType, opponentPower?: number): number => {
    const baseZenkaiPower = team.reduce((sum, p) => sum + p.power, 0);
    const trainerLevelPower = trainer.level * 3;
    const synergyBonusMultiplier = 1 + ((upgrades['synergyBonus'] || 0) * 0.1);
    const zenkaiSynergyBonus = team.reduce((sum, p) => {
        if (p.type === trainer.synergyType) {
            let synergyBonus = p.power * 0.4 * synergyBonusMultiplier;
            if (trainer.trait?.id === 'type_specialist') synergyBonus *= 2;
            return sum + synergyBonus;
        }
        return sum;
    }, 0);
    let gymSynergyBonus = 0;
    if(gymType && gymType === trainer.synergyType) {
        gymSynergyBonus = (trainer.basePower + baseZenkaiPower) * 0.25 * synergyBonusMultiplier;
    }
    let totalPower = trainer.basePower + trainerLevelPower + baseZenkaiPower + zenkaiSynergyBonus + gymSynergyBonus;
    if (trainer.trait?.id === 'militant') totalPower *= 1.05;
    if (trainer.trait?.id === 'generalist') {
        const uniqueTypes = new Set(team.map(p => p.type));
        if (uniqueTypes.size >= 4) totalPower *= 1 + (uniqueTypes.size * 0.03);
    }
    if (opponentPower) {
        if (totalPower < opponentPower) {
            if (trainer.trait?.id === 'strategist') totalPower *= 1.05;
            if (trainer.trait?.id === 'warrior') totalPower *= 1.10;
        } else if (totalPower > opponentPower) {
            if (trainer.trait?.id === 'relentless') totalPower *= 1.15;
        }
    }
    return Math.floor(totalPower);
};

const getStrongestTeamFromRoster = (roster: Roster, upgrades: Record<string, number> = {}): { champion: Trainer, team: Zenkai[], power: number } => {
    if (!roster || roster.trainers.length === 0 || roster.zenkais.length === 0) {
        const dummyTrainer: Trainer = { id: 'dummy', name: 'N/A', level: 1, basePower: 0, synergyType: ZenkaiType.Noturno, salary: 0, xp: 0, xpToNextLevel: 100, zenkais: [] };
        return { champion: dummyTrainer, team: [], power: 0 };
    }
    const strongestTrainer = roster.trainers.reduce((strongest, current) => ((current.basePower + current.level * 3) > (strongest.basePower + strongest.level * 3) ? current : strongest));
    const top6Zenkais = [...roster.zenkais].sort((a, b) => b.power - a.power).slice(0, 6);
    const power = calculatePureTeamPower(strongestTrainer, top6Zenkais, upgrades);
    return { champion: strongestTrainer, team: top6Zenkais, power: power };
};

const createTrainerFromTemplate = (template: TrainerData, level: number, isInitial: boolean = false): Trainer => {
    const trait = template.traitId ? TRAINER_TRAITS_DATA.find(t => t.id === template.traitId) : undefined;
    let salary = template.salary || (100 + (level * 20) + (template.basePower * 2));
    if (trait?.id === 'humble') {
        salary = Math.floor(salary * 0.8);
    }
    return {
        id: generateId(), name: template.name, level: level, synergyType: template.type,
        salary: isInitial ? 0 : salary, zenkais: [], basePower: template.basePower,
        isInitial: isInitial, xp: 0, xpToNextLevel: calculateXpForLevel(level), trait,
    };
};

const generateAiRoster = (rank: number): { roster: Roster, power: number } => {
    const [minPower, maxPower] = AI_LEAGUE_POWER_RANGES[rank] || [500, 800];
    const targetPower = minPower + Math.random() * (maxPower - minPower);
    
    let trainers: Trainer[] = shuffleArray(TRAINER_DATA).slice(0, 2).map(t => createTrainerFromTemplate(t, 1, false));
    let zenkais: Zenkai[] = Array.from({ length: 8 }).map(() => createAndLevelUpZenkai(shuffleArray(BASE_FORM_ZENKAIS)[0], 1));
    
    let currentRoster: Roster = { trainers, zenkais };
    let currentPower = getStrongestTeamFromRoster(currentRoster, {}).power;
    let attempts = 0;
    while (currentPower < targetPower && attempts < 1500) {
        if (Math.random() < 0.2) {
            const trainerIndex = Math.floor(Math.random() * currentRoster.trainers.length);
            currentRoster.trainers[trainerIndex] = levelUpTrainer(currentRoster.trainers[trainerIndex]);
        } else {
            const zenkaiIndex = Math.floor(Math.random() * currentRoster.zenkais.length);
            currentRoster.zenkais[zenkaiIndex] = levelUpZenkai(currentRoster.zenkais[zenkaiIndex]);
        }
        currentPower = getStrongestTeamFromRoster(currentRoster, {}).power;
        attempts++;
    }
    return { roster: currentRoster, power: currentPower };
}

const createInitialState = (): GameState => {
    const shuffledTypes = shuffleArray(ZENKAI_TYPES);
    const initialGyms: Gym[] = shuffledTypes.slice(0, 8).map(type => ({
        id: generateId(),
        type: type,
        trainerId: null,
    }));
    
    const initialTrainers: Trainer[] = [];
    const usedTrainerNames = new Set<string>();

    // Find trainers for the first two gyms, respecting their predefined types
    for (let i = 0; i < 2; i++) {
        const gymType = initialGyms[i].type;
        
        // Prioritize finding an unused trainer that matches the gym's type
        let suitableTemplates = TRAINER_DATA.filter(t => t.type === gymType && !usedTrainerNames.has(t.name));

        // If no matching type is found, fall back to any unused trainer to prevent getting stuck
        if (suitableTemplates.length === 0) {
            suitableTemplates = TRAINER_DATA.filter(t => !usedTrainerNames.has(t.name));
        }

        // If we found a suitable template, create the trainer
        if (suitableTemplates.length > 0) {
            const chosenTemplate = shuffleArray(suitableTemplates)[0];
            const trainer = createTrainerFromTemplate(chosenTemplate, INITIAL_TRAINER_LEVEL, true);
            initialTrainers.push(trainer);
            usedTrainerNames.add(trainer.name);
        }
    }
    
    const initialZenkais: Zenkai[] = [];
    const createZenkaiForTrainer = (trainer: Trainer, level: number) => {
        const initialZenkaiPool = BASE_FORM_ZENKAIS.filter(p => p.basePower === 20);
        if (initialZenkaiPool.length === 0) return;
        let suitableZenkais = initialZenkaiPool.filter(p => p.type === trainer.synergyType);
        const chosenZenkaiTemplate = (suitableZenkais.length > 0 ? shuffleArray(suitableZenkais) : shuffleArray(initialZenkaiPool))[0];
        if (!chosenZenkaiTemplate) return;

        const zenkai = createAndLevelUpZenkai(chosenZenkaiTemplate, level);
        initialZenkais.push(zenkai);
        trainer.zenkais.push(zenkai.id);
    }
    
    // Ensure we have at least 2 trainers before assigning Zenkais
    if (initialTrainers.length >= 2) {
        createZenkaiForTrainer(initialTrainers[0], INITIAL_ZENKAI_LEVEL);
        createZenkaiForTrainer(initialTrainers[0], INITIAL_ZENKAI_LEVEL);
        createZenkaiForTrainer(initialTrainers[1], INITIAL_ZENKAI_LEVEL);
        createZenkaiForTrainer(initialTrainers[1], INITIAL_ZENKAI_LEVEL);
    } else if (initialTrainers.length === 1) {
        // Handle edge case where only one trainer could be created
        createZenkaiForTrainer(initialTrainers[0], INITIAL_ZENKAI_LEVEL);
        createZenkaiForTrainer(initialTrainers[0], INITIAL_ZENKAI_LEVEL);
    }


    const otherLeagues: League[] = Array.from({ length: NUM_LEAGUES - 1 }).map((_, i) => {
        const rank = i + 1; // Ranks 1-14
        const { roster, power } = generateAiRoster(rank);
        const xpRate = 0.02 + Math.random() * 0.13;
        return { name: `Liga Rival ${rank}`, isPlayer: false, points: (NUM_LEAGUES - rank) * 10, power, roster, xpRate };
    });

    const playerLeague: League = { name: 'Sua Liga', isPlayer: true, points: 0, power: 0 };
    
    // Player league starts at rank 15
    const allLeagues = [...otherLeagues, playerLeague].sort((a,b) => b.power - a.power);
    
    const initialSponsorships: SponsorshipDeal[] = SPONSORSHIP_DEALS_DATA.map(deal => ({
        ...deal, weeksRemaining: deal.totalWeeks, status: 'available',
    }));

    const generateAvailableTrainers = (existingTrainers: Trainer[], upgrades: Record<string, number>): Trainer[] => {
        const scoutLevel = upgrades['scoutNetwork'] || 0;
        const existingNames = new Set(existingTrainers.map(t => t.name));
        const availableTemplates = TRAINER_DATA.filter(t => !existingNames.has(t.name));
        const templatesWithTraits = shuffleArray(availableTemplates.filter(t => t.traitId));
        const templatesWithoutTraits = shuffleArray(availableTemplates.filter(t => !t.traitId));
        const finalTemplates: TrainerData[] = [];
        const traitPickChance = 0.40 + (scoutLevel * 0.20);
        while (finalTemplates.length < NUM_AVAILABLE_TRAINERS && (templatesWithTraits.length > 0 || templatesWithoutTraits.length > 0)) {
            let pickedTemplate = (Math.random() < traitPickChance && templatesWithTraits.length > 0)
                ? templatesWithTraits.pop()
                : (templatesWithoutTraits.pop() || templatesWithTraits.pop());
            if (pickedTemplate) finalTemplates.push(pickedTemplate);
        }
        return finalTemplates.map(template => {
            const minLevel = 1 + (scoutLevel * 2);
            const level = minLevel + Math.floor(Math.random() * 10);
            return createTrainerFromTemplate(template, level, false);
        });
    };

    const initialPlayerRank = allLeagues.findIndex(l => l.isPlayer) + 1;

    return {
        money: INITIAL_MONEY, popularity: INITIAL_POPULARITY, week: 1, season: 1,
        gyms: initialGyms, trainers: initialTrainers, zenkais: initialZenkais, leagues: allLeagues,
        reports: [], upgrades: {}, isProcessingWeek: false,
        availableForHire: generateAvailableTrainers(initialTrainers, {}),
        isGameOver: false, gameOverReason: '', isEndOfSeason: false,
        endOfSeasonChallenge: { promotion: null, relegation: null },
        sponsorships: initialSponsorships, endOfSeasonPrize: undefined, endOfSeasonSummary: null,
        seasonalMissions: generateSeasonalMissions(initialPlayerRank, 1),
        seasonalMissionRerollsUsed: 0,
        hasChosenStarter: false,
        notifications: [],
    };
};

export const useGameState = () => {
    const [gameState, setGameState] = useState<GameState>(createInitialState);

    const getTeamPower = useCallback((trainer: Trainer, team: Zenkai[], gymType?: ZenkaiType, opponentPower?: number): number => {
        return calculatePureTeamPower(trainer, team, gameState.upgrades, gymType, opponentPower);
    }, [gameState.upgrades]);

    const calculateTeamAdvantageScore = useCallback((team1: Zenkai[], team2: Zenkai[]): number => {
        let score = 0;
        if (team1.length === 0 || team2.length === 0) return 0;

        for (const p1 of team1) {
            for (const p2 of team2) {
                const matchup = ZENKAI_TYPE_MATCHUPS[p1.type]?.[p2.type] ?? 1;
                if (matchup === 2) score += 2;      // Super effective
                else if (matchup === 0.5) score -= 1; // Not very effective
            }
        }
        
        const maxPossibleMagnitude = team1.length * team2.length * 2;
        if (maxPossibleMagnitude === 0) return 0;

        return (score / maxPossibleMagnitude) * 10;
    }, []);

    const generateAvailableTrainers = useCallback((existingTrainers: Trainer[], upgrades: Record<string, number>): Trainer[] => {
        const scoutLevel = upgrades['scoutNetwork'] || 0;
        const existingNames = new Set(existingTrainers.map(t => t.name));
        const availableTemplates = TRAINER_DATA.filter(t => !existingNames.has(t.name));
        const templatesWithTraits = shuffleArray(availableTemplates.filter(t => t.traitId));
        const templatesWithoutTraits = shuffleArray(availableTemplates.filter(t => !t.traitId));
        const finalTemplates: TrainerData[] = [];
        const traitPickChance = 0.40 + (scoutLevel * 0.20);
        while (finalTemplates.length < NUM_AVAILABLE_TRAINERS && (templatesWithTraits.length > 0 || templatesWithoutTraits.length > 0)) {
            let pickedTemplate = (Math.random() < traitPickChance && templatesWithTraits.length > 0)
                ? templatesWithTraits.pop()
                : (templatesWithoutTraits.pop() || templatesWithTraits.pop());
            if (pickedTemplate) finalTemplates.push(pickedTemplate);
        }
        return finalTemplates.map(template => {
            const minLevel = 1 + (scoutLevel * 2);
            const level = minLevel + Math.floor(Math.random() * 10);
            return createTrainerFromTemplate(template, level, false);
        });
    }, []);

    const assignZenkaiToTrainer = useCallback((zenkaiId: string, trainerId: string) => {
        setGameState(prev => {
            const trainer = prev.trainers.find(t => t.id === trainerId);
            if (!trainer || trainer.zenkais.length >= 6) return prev;
            const newTrainers = prev.trainers.map(t => ({ ...t, zenkais: t.zenkais.filter(id => id !== zenkaiId) }));
            const targetTrainerIndex = newTrainers.findIndex(t => t.id === trainerId);
            if (targetTrainerIndex !== -1) {
                newTrainers[targetTrainerIndex].zenkais.push(zenkaiId);
            }
            return { ...prev, trainers: newTrainers };
        });
    }, []);

    const unassignZenkai = useCallback((zenkaiId: string) => {
        setGameState(prev => {
            return {
                ...prev,
                trainers: prev.trainers.map(t => ({...t, zenkais: t.zenkais.filter(id => id !== zenkaiId)}))
            }
        });
    }, []);
    
    const reassignZenkaiToTrainer = useCallback((zenkaiId: string, sourceTrainerId: string, targetTrainerId: string) => {
        setGameState(prev => {
            const targetTrainer = prev.trainers.find(t => t.id === targetTrainerId);
            if (!targetTrainer || targetTrainer.zenkais.length >= 6 || sourceTrainerId === targetTrainerId) return prev;
            const newTrainers = prev.trainers.map(t => {
                if (t.id === sourceTrainerId) return { ...t, zenkais: t.zenkais.filter(id => id !== zenkaiId) };
                if (t.id === targetTrainerId) return { ...t, zenkais: [...t.zenkais, zenkaiId] };
                return t;
            });
            return { ...prev, trainers: newTrainers };
        });
    }, []);

    const assignTrainerToGym = useCallback((trainerId: string, gymId: string) => {
        setGameState(prev => {
            const newGyms = prev.gyms.map(gym => {
                if (gym.trainerId === trainerId) return { ...gym, trainerId: null };
                if (gym.id === gymId) return { ...gym, trainerId };
                return gym;
            });

            const notificationsToAdd: Omit<Notification, 'id' | 'week' | 'season' | 'isRead'>[] = [];
            const newMissions = prev.seasonalMissions.map(m => {
                if (m.type === 'assign_all_gyms' && !m.isCompleted) {
                    const assignedGymsCount = newGyms.filter(g => g.trainerId !== null).length;
                    const newProgress = assignedGymsCount;
                    const isCompleted = newProgress >= m.targetValue;
                    if (isCompleted && !m.isCompleted) {
                        notificationsToAdd.push({ type: 'success', message: `Missão Concluída: ${m.description.substring(0, 40)}...`, targetTab: 'Missions' });
                    }
                    return { ...m, currentProgress: Math.min(newProgress, m.targetValue), isCompleted };
                }
                return m;
            });

            const newNotifications = [...notificationsToAdd.map(n => ({ ...n, id: generateId(), week: prev.week, season: prev.season, isRead: false })), ...prev.notifications].slice(0, 20);
            return { ...prev, gyms: newGyms, seasonalMissions: newMissions, notifications: newNotifications };
        });
    }, []);
    
    const unassignTrainerFromGym = useCallback((gymId: string) => {
        setGameState(prev => {
            const newGyms = prev.gyms.map(g => g.id === gymId ? { ...g, trainerId: null } : g);

            const assignedGymsCount = newGyms.filter(g => g.trainerId !== null).length;
            const newMissions = prev.seasonalMissions.map(m => {
                if (m.type === 'assign_all_gyms' && !m.isCompleted) {
                    const newProgress = assignedGymsCount;
                    return { ...m, currentProgress: Math.min(newProgress, m.targetValue), isCompleted: newProgress >= m.targetValue };
                }
                return m;
            });

            return { ...prev, gyms: newGyms, seasonalMissions: newMissions };
        });
    }, []);

    const hireTrainer = useCallback((trainerId: string) => {
        setGameState(prev => {
            const trainerToHire = prev.availableForHire.find(t => t.id === trainerId);
            if (!trainerToHire) return prev;
            
            const notificationsToAdd: Omit<Notification, 'id' | 'week' | 'season' | 'isRead'>[] = [];
            const newMissions = prev.seasonalMissions.map(mission => {
                if (mission.type === 'hire_trainers' && !mission.isCompleted) {
                    const newProgress = mission.currentProgress + 1;
                    const isCompleted = newProgress >= mission.targetValue;
                    if (isCompleted && !mission.isCompleted) {
                        notificationsToAdd.push({ type: 'success', message: `Missão Concluída: ${mission.description.substring(0, 40)}...`, targetTab: 'Missions' });
                    }
                    return { ...mission, currentProgress: newProgress, isCompleted };
                }
                return mission;
            });
            const newNotifications = [...notificationsToAdd.map(n => ({ ...n, id: generateId(), week: prev.week, season: prev.season, isRead: false })), ...prev.notifications].slice(0, 20);

            return {
                ...prev,
                trainers: [...prev.trainers, { ...trainerToHire }],
                availableForHire: prev.availableForHire.filter(t => t.id !== trainerId),
                seasonalMissions: newMissions,
                notifications: newNotifications
            };
        });
    }, []);

    const fireTrainer = useCallback((trainerId: string) => {
        setGameState(prev => {
            const trainerToFire = prev.trainers.find(t => t.id === trainerId);
            if (!trainerToFire || trainerToFire.isInitial) return prev;

            const newGyms = prev.gyms.map(g => g.trainerId === trainerId ? { ...g, trainerId: null } : g);

            const assignedGymsCount = newGyms.filter(g => g.trainerId !== null).length;
            const newMissions = prev.seasonalMissions.map(m => {
                if (m.type === 'assign_all_gyms' && !m.isCompleted) {
                    const newProgress = assignedGymsCount;
                    return { ...m, currentProgress: Math.min(newProgress, m.targetValue), isCompleted: newProgress >= m.targetValue };
                }
                return m;
            });

            return {
                ...prev,
                trainers: prev.trainers.filter(t => t.id !== trainerId),
                gyms: newGyms,
                seasonalMissions: newMissions
            };
        });
    }, []);

    const rerollAvailableTrainers = useCallback(() => {
        setGameState(prev => {
            if (prev.money < TRAINER_REROLL_COST) return prev;
            return {
                ...prev,
                money: prev.money - TRAINER_REROLL_COST,
                availableForHire: generateAvailableTrainers(prev.trainers, prev.upgrades)
            }
        });
    }, [generateAvailableTrainers]);
    
    const attemptCapture = useCallback((zenkai: Zenkai, quality: 'perfect' | 'good' | 'ok' | 'miss'): boolean => {
        const qualityMultipliers = {
            perfect: 1.0,
            good: 0.7,
            ok: 0.4,
            miss: 0,
        };
        const baseCaptureRate = 0.9; // Base 90% chance for a 'perfect' hit.
        const isLegendary = ZENKAI_DATA.find(z => z.name === zenkai.name)?.forma === 'Lenda';
        const legendaryModifier = isLegendary ? 0.3 : 1.0; // Much harder to catch legendaries

        const captureChance = baseCaptureRate * qualityMultipliers[quality] * legendaryModifier;
        const success = Math.random() < captureChance;

        if (success) {
            setGameState(prev => {
                const notificationsToAdd: Omit<Notification, 'id' | 'week' | 'season' | 'isRead'>[] = [];
                const newMissions = prev.seasonalMissions.map(m => {
                    if (m.type === 'catch_zenkais' && !m.isCompleted) {
                        const newProgress = m.currentProgress + 1;
                        const isCompleted = newProgress >= m.targetValue;
                        if (isCompleted && !m.isCompleted) {
                            notificationsToAdd.push({ type: 'success', message: `Missão Concluída: ${m.description.substring(0, 40)}...`, targetTab: 'Missions' });
                        }
                        return { ...m, currentProgress: newProgress, isCompleted };
                    }
                    return m;
                });
                const newNotifications = [...notificationsToAdd.map(n => ({ ...n, id: generateId(), week: prev.week, season: prev.season, isRead: false })), ...prev.notifications].slice(0, 20);
                return {
                    ...prev,
                    zenkais: [...prev.zenkais, zenkai],
                    seasonalMissions: newMissions,
                    notifications: newNotifications
                };
            });
        }
        return success;
    }, []);

    const startExpedition = useCallback(async (habitat: string): Promise<{ foundZenkais: Zenkai[], isLegendary: boolean }> => {
        return new Promise(resolve => {
            setGameState(prev => {
                const expeditionCost = Math.floor(EXPEDITION_COST * (1 - ((prev.upgrades['transportNetwork'] || 0) * 0.1)));
                if (prev.money < expeditionCost) {
                    resolve({ foundZenkais: [], isLegendary: false });
                    return prev;
                }
                const notificationsToAdd: Omit<Notification, 'id' | 'week' | 'season' | 'isRead'>[] = [];

                const newMissions = prev.seasonalMissions.map(mission => {
                    if (mission.type === 'complete_expeditions' && !mission.isCompleted) {
                        const newProgress = mission.currentProgress + 1;
                        const isCompleted = newProgress >= mission.targetValue;
                        if (isCompleted && !mission.isCompleted) {
                           notificationsToAdd.push({ type: 'success', message: `Missão Concluída: ${mission.description.substring(0, 40)}...`, targetTab: 'Missions' });
                        }
                        return { ...mission, currentProgress: Math.min(newProgress, mission.targetValue), isCompleted };
                    }
                    return mission;
                });

                let isLegendary = Math.random() < 0.02; // 2% chance
                let foundZenkais: Zenkai[] = [];
                
                if (isLegendary) {
                    const legendaryZenkais = ZENKAI_DATA.filter(p => p.forma === 'Lenda' && p.habitat === habitat);
                    if (legendaryZenkais.length > 0) {
                        const template = shuffleArray(legendaryZenkais)[0];
                        const legendaryZenkai = createAndLevelUpZenkai(template, 50);
                        foundZenkais.push(legendaryZenkai);
                    } else {
                        isLegendary = false; // No legendary in this habitat, fallback to normal
                    }
                }
                
                if (foundZenkais.length === 0) {
                    isLegendary = false;
                    const possibleZenkais = ZENKAI_DATA.filter(p => p.habitat === habitat && p.forma === 'Base');
                    if (possibleZenkais.length > 0) {
                        const scoutLevel = prev.upgrades['scoutingGear'] || 0;
                        const hasRecruiter = prev.trainers.some(t => t.trait?.id === 'recruiter');
                        const recruiterBonus = hasRecruiter ? 0.15 : 0;
                        const threeZenkaiChance = 0.05 + (scoutLevel * 0.10) + recruiterBonus;
                        const twoZenkaiChance = 0.25 + (scoutLevel * 0.10);
                        const rand = Math.random();
                        let numToFind = 1;
                        if (rand < threeZenkaiChance) numToFind = 3;
                        else if (rand < threeZenkaiChance + twoZenkaiChance) numToFind = 2;

                        for (let i = 0; i < numToFind; i++) {
                            const template = shuffleArray(possibleZenkais)[0];
                            const minLevel = 1 + ((prev.upgrades['expeditionCenter'] || 0) * 10);
                            const level = minLevel + Math.floor(Math.random() * 5);
                            foundZenkais.push(createAndLevelUpZenkai(template, level));
                        }
                    }
                }
                
                if (foundZenkais.length === 0) {
                    const anyZenkai = shuffleArray(BASE_FORM_ZENKAIS)[0];
                    foundZenkais.push(createAndLevelUpZenkai(anyZenkai, 5));
                }

                resolve({ foundZenkais, isLegendary });
                
                const newNotifications = [...notificationsToAdd.map(n => ({ ...n, id: generateId(), week: prev.week, season: prev.season, isRead: false })), ...prev.notifications].slice(0, 20);
                return { ...prev, money: prev.money - expeditionCost, seasonalMissions: newMissions, notifications: newNotifications };
            });
        });
    }, []);


    const trainZenkai = useCallback((zenkaiId: string) => {
        setGameState(prev => {
            const zenkai = prev.zenkais.find(p => p.id === zenkaiId);
            if (!zenkai) return prev;
            const discount = 1 - ((prev.upgrades['zenkaiDojo'] || 0) * 0.15);
            const cost = Math.floor(ZENKAI_TRAIN_COST_BASE * Math.pow(zenkai.level, 1.5) * discount);
            if (prev.money < cost) return prev;
            let updatedZenkai = { ...zenkai, xp: zenkai.xp + Math.floor(zenkai.xpToNextLevel * 0.25) };
            
            const notificationsToAdd: Omit<Notification, 'id' | 'week' | 'season' | 'isRead'>[] = [];
            let evolved = false;
            let levelUps = 0;
            if (updatedZenkai.xp >= updatedZenkai.xpToNextLevel && updatedZenkai.level < 100) {
                levelUps++;
                const originalName = updatedZenkai.name;
                const leftoverXp = updatedZenkai.xp - updatedZenkai.xpToNextLevel;
                updatedZenkai = levelUpZenkai(updatedZenkai);
                if (originalName !== updatedZenkai.name) {
                    evolved = true;
                    notificationsToAdd.push({ type: 'success', message: `${originalName} evoluiu para ${updatedZenkai.name}!`, targetTab: 'Zenkais' });
                }
                updatedZenkai.xp = leftoverXp;
            }
            
            const newMissions = prev.seasonalMissions.map(mission => {
                if (mission.isCompleted) return mission;
                let newProgress;
                let missionCompleted = false;
                switch (mission.type) {
                    case 'train_zenkai':
                        newProgress = mission.currentProgress + 1;
                        if (newProgress >= mission.targetValue && !mission.isCompleted) missionCompleted = true;
                        return { ...mission, currentProgress: newProgress, isCompleted: missionCompleted || mission.isCompleted };
                    case 'evolve_zenkais':
                         if (evolved) {
                            newProgress = mission.currentProgress + 1;
                            if (newProgress >= mission.targetValue && !mission.isCompleted) missionCompleted = true;
                            return { ...mission, currentProgress: newProgress, isCompleted: missionCompleted || mission.isCompleted };
                        }
                        break;
                    case 'level_up_zenkai':
                        if (levelUps > 0) {
                            newProgress = mission.currentProgress + levelUps;
                            if (newProgress >= mission.targetValue && !mission.isCompleted) missionCompleted = true;
                            return { ...mission, currentProgress: newProgress, isCompleted: missionCompleted || mission.isCompleted };
                        }
                        break;
                }
                if (missionCompleted) {
                    notificationsToAdd.push({ type: 'success', message: `Missão Concluída: ${mission.description.substring(0, 40)}...`, targetTab: 'Missions' });
                }
                return mission;
            });

            const newNotifications = [...notificationsToAdd.map(n => ({ ...n, id: generateId(), week: prev.week, season: prev.season, isRead: false })), ...prev.notifications].slice(0, 20);
            return { ...prev, money: prev.money - cost, zenkais: prev.zenkais.map(p => p.id === zenkaiId ? updatedZenkai : p), seasonalMissions: newMissions, notifications: newNotifications };
        });
    }, []);

    const trainTrainer = useCallback((trainerId: string) => {
        setGameState(prev => {
            const trainer = prev.trainers.find(t => t.id === trainerId);
            if (!trainer) return prev;
            const discount = 1 - ((prev.upgrades['trainerProgram'] || 0) * 0.10);
            const cost = Math.floor(TRAINER_TRAIN_COST_BASE * Math.pow(trainer.level, 1.8) * discount);
            if (prev.money < cost) return prev;
            let updatedTrainer = { ...trainer, xp: trainer.xp + Math.floor(trainer.xpToNextLevel * 0.20) };
            let levelUps = 0;
            if (updatedTrainer.xp >= updatedTrainer.xpToNextLevel && updatedTrainer.level < 20) {
                levelUps++;
                const leftoverXp = updatedTrainer.xp - updatedTrainer.xpToNextLevel;
                updatedTrainer = levelUpTrainer(updatedTrainer);
                updatedTrainer.xp = leftoverXp;
            }
            
            const notificationsToAdd: Omit<Notification, 'id' | 'week' | 'season' | 'isRead'>[] = [];
            const newMissions = prev.seasonalMissions.map(mission => {
                if (mission.isCompleted) return mission;
                let newProgress;
                let missionCompleted = false;
                switch(mission.type) {
                    case 'train_trainer':
                        newProgress = mission.currentProgress + 1;
                        if (newProgress >= mission.targetValue && !mission.isCompleted) missionCompleted = true;
                        return { ...mission, currentProgress: newProgress, isCompleted: missionCompleted || mission.isCompleted };
                    case 'level_up_trainer':
                        if (levelUps > 0) {
                            newProgress = mission.currentProgress + levelUps;
                            if (newProgress >= mission.targetValue && !mission.isCompleted) missionCompleted = true;
                            return { ...mission, currentProgress: newProgress, isCompleted: missionCompleted || mission.isCompleted };
                        }
                        break;
                }
                if (missionCompleted) {
                    notificationsToAdd.push({ type: 'success', message: `Missão Concluída: ${mission.description.substring(0, 40)}...`, targetTab: 'Missions' });
                }
                return mission;
            });
            const newNotifications = [...notificationsToAdd.map(n => ({ ...n, id: generateId(), week: prev.week, season: prev.season, isRead: false })), ...prev.notifications].slice(0, 20);

            return { ...prev, money: prev.money - cost, trainers: prev.trainers.map(t => t.id === trainerId ? updatedTrainer : t), seasonalMissions: newMissions, notifications: newNotifications };
        });
    }, []);

    const purchaseUpgrade = useCallback((upgrade: Upgrade) => {
        setGameState(prev => {
            const currentLevel = prev.upgrades[upgrade.id] || 0;
            if (currentLevel >= upgrade.maxLevel) return prev;
            const hasEngineer = prev.trainers.some(t => t.trait?.id === 'engineer');
            let cost = upgrade.cost * Math.pow(2, currentLevel);
            if(hasEngineer) cost = Math.floor(cost * 0.95);
            if (prev.money < cost) return prev;

            const notificationsToAdd: Omit<Notification, 'id' | 'week' | 'season' | 'isRead'>[] = [];
            const newLevel = currentLevel + 1;

            let newMissions = prev.seasonalMissions.map(mission => {
                 if (mission.isCompleted) return mission;
                let newProgress;
                let isCompleted = false;
                
                if (mission.type === 'purchase_upgrades') {
                    newProgress = mission.currentProgress + 1;
                    isCompleted = newProgress >= mission.targetValue;
                } else if (mission.type === 'max_out_upgrade' && newLevel === upgrade.maxLevel) {
                    newProgress = mission.currentProgress + 1;
                    isCompleted = newProgress >= mission.targetValue;
                } else {
                    return mission;
                }

                if (isCompleted && !mission.isCompleted) {
                    notificationsToAdd.push({ type: 'success', message: `Missão Concluída: ${mission.description.substring(0, 40)}...`, targetTab: 'Missions' });
                }
                return { ...mission, currentProgress: newProgress, isCompleted };
            });

            const newNotifications = [...notificationsToAdd.map(n => ({ ...n, id: generateId(), week: prev.week, season: prev.season, isRead: false })), ...prev.notifications].slice(0, 20);

            return { 
                ...prev, 
                money: prev.money - cost, 
                upgrades: { ...prev.upgrades, [upgrade.id]: newLevel },
                seasonalMissions: newMissions,
                notifications: newNotifications,
            };
        });
    }, []);

    const sellZenkai = useCallback((zenkaiId: string) => {
        setGameState(prev => {
            const zenkaiToSell = prev.zenkais.find(p => p.id === zenkaiId);
            if (zenkaiToSell?.isLocked) {
                return prev;
            }
            return {
                ...prev,
                money: prev.money + ZENKAI_SELL_PRICE,
                trainers: prev.trainers.map(t => ({...t, zenkais: t.zenkais.filter(id => id !== zenkaiId)})),
                zenkais: prev.zenkais.filter(p => p.id !== zenkaiId)
            };
        });
    }, []);

    const toggleZenkaiLock = useCallback((zenkaiId: string) => {
        setGameState(prev => ({
            ...prev,
            zenkais: prev.zenkais.map(zenkai => 
                zenkai.id === zenkaiId ? { ...zenkai, isLocked: !zenkai.isLocked } : zenkai
            )
        }));
    }, []);

    const acceptSponsorship = useCallback((dealId: string) => {
        setGameState(prev => {
            const deal = prev.sponsorships.find(d => d.id === dealId);
            if (!deal || deal.status !== 'available' || prev.popularity < deal.requiredPopularity) return prev;
            
            const notificationsToAdd: Omit<Notification, 'id' | 'week' | 'season' | 'isRead'>[] = [];
            const newMissions = prev.seasonalMissions.map(mission => {
                if (mission.type === 'accept_sponsorships' && !mission.isCompleted) {
                    const newProgress = mission.currentProgress + 1;
                    const isCompleted = newProgress >= mission.targetValue;
                     if (isCompleted && !mission.isCompleted) {
                        notificationsToAdd.push({ type: 'success', message: `Missão Concluída: ${mission.description.substring(0, 40)}...`, targetTab: 'Missions' });
                    }
                    return { ...mission, currentProgress: newProgress, isCompleted };
                }
                return mission;
            });
            
            const newNotifications = [...notificationsToAdd.map(n => ({ ...n, id: generateId(), week: prev.week, season: prev.season, isRead: false })), ...prev.notifications].slice(0, 20);

            return { 
                ...prev, 
                sponsorships: prev.sponsorships.map(s => s.id === dealId ? { ...s, status: 'active' } : s),
                seasonalMissions: newMissions,
                notifications: newNotifications
            };
        });
    }, []);

    const claimMissionReward = useCallback((missionId: string) => {
        setGameState(prev => {
            const mission = prev.seasonalMissions.find(m => m.id === missionId);
            if (!mission || !mission.isCompleted || mission.isClaimed) {
                return prev;
            }
            const newMissions = prev.seasonalMissions.map(m => 
                m.id === missionId ? { ...m, isClaimed: true } : m
            );
            return {
                ...prev,
                money: prev.money + mission.reward,
                seasonalMissions: newMissions,
            };
        });
    }, []);

    const rerollSeasonalMission = useCallback((missionId: string) => {
        setGameState(prev => {
            const rerollsUsed = prev.seasonalMissionRerollsUsed || 0;
            const cost = rerollsUsed === 0 ? 0 : 2000;
    
            if (prev.money < cost) {
                return prev;
            }
    
            const missionToReplace = prev.seasonalMissions.find(m => m.id === missionId);
            if (!missionToReplace || missionToReplace.isCompleted) {
                return prev;
            }
    
            const activeMissionTypes = new Set(prev.seasonalMissions.map(m => m.type));
            const availableTemplates = MISSION_TEMPLATES.filter(t => !activeMissionTypes.has(t.type));
            
            if (availableTemplates.length === 0) {
                return prev; // No available missions to reroll into
            }
    
            const newTemplate = shuffleArray(availableTemplates)[0];
    
            const playerRank = prev.leagues.findIndex(l => l.isPlayer) + 1;
            const tier = playerRank > 10 ? 1 : (playerRank > 5 ? 2 : 3);
            const multipliers: { [key: number]: { target: number, reward: number } } = {
                1: { target: 1.0, reward: 1.0 },
                2: { target: 1.8, reward: 2.0 },
                3: { target: 3.0, reward: 3.5 },
            };
            const selectedMultiplier = multipliers[tier];
            
            const targetValue = Math.ceil(newTemplate.baseTarget * selectedMultiplier.target);
            const reward = Math.floor(newTemplate.baseReward * selectedMultiplier.reward / 100) * 100;
            const description = newTemplate.text.replace('{target}', targetValue.toLocaleString());
    
            const newMission: SeasonalMission = {
                id: `${newTemplate.type}_${prev.season}`,
                type: newTemplate.type,
                description,
                targetValue,
                currentProgress: 0,
                reward,
                isCompleted: false,
                isClaimed: false,
            };
            
            const newMissions = prev.seasonalMissions.map(m => m.id === missionId ? newMission : m);
    
            return {
                ...prev,
                money: prev.money - cost,
                seasonalMissions: newMissions,
                seasonalMissionRerollsUsed: rerollsUsed + 1,
            };
        });
    }, []);

    const advanceWeek = useCallback(() => {
        setGameState(prev => {
            let newState = { ...prev, isProcessingWeek: true };
            const notificationsToAdd: Omit<Notification, 'id' | 'week' | 'season' | 'isRead'>[] = [];
            const oldPopularity = prev.popularity;

            const gymBattleReports: GymBattleReport[] = [];
            let battleIncome = 0;
            let popularityGained = 0;
            const battleXpBonus = 1 + ((newState.upgrades['battleAnalysis'] || 0) * 0.1);
            const stadiumBonus = 1 + ((newState.upgrades['stadiumExpansion'] || 0) * 0.1);
            const marketingBonus = 1 + ((newState.upgrades['marketingOffice'] || 0) * 0.1);
            const tycoonBonus = newState.trainers.some(t => t.trait?.id === 'tycoon') ? 1.15 : 1;
            
            const playerRank = newState.leagues.findIndex(l => l.isPlayer) + 1;

            const opponentPowerRanges: { [rank: number]: [number, number] } = {
                15: [1000, 1400], 14: [1400, 1700], 13: [1700, 2000],
                12: [2000, 2200], 11: [2200, 2300], 10: [2300, 2600],
                9: [2600, 2900], 8: [2900, 3100], 7: [3100, 3300],
                6: [3300, 3500], 5: [3500, 3800], 4: [3800, 4000],
                3: [4000, 4200], 2: [4200, 4500], 1: [5000, 5500],
            };

            const [minOpponentPower, maxOpponentPower] = opponentPowerRanges[playerRank] || [600, 1000];
            
            let totalWinsThisWeek = 0;
            let totalEvolutionsThisWeek = 0;
            let totalZenkaiLevelUps = 0;
            let totalTrainerLevelUps = 0;
            let strongerOpponentWins = 0;
            newState.gyms.forEach(gym => {
                if(!gym.trainerId) return;
                const trainer = newState.trainers.find(t => t.id === gym.trainerId);
                if(!trainer) return;
                const team = newState.zenkais.filter(z => trainer.zenkais.includes(z.id));
                const playerPower = getTeamPower(trainer, team, gym.type);
                let wins = 0;
                const totalBattles = 6;

                const midOpponentPower = Math.floor((minOpponentPower + maxOpponentPower) / 2);
                const opponentPowers = [minOpponentPower, midOpponentPower];
                for (let i = 0; i < 4; i++) {
                    const hardPower = midOpponentPower + Math.random() * (maxOpponentPower - midOpponentPower);
                    opponentPowers.push(Math.floor(hardPower));
                }
                const shuffledOpponentPowers = shuffleArray(opponentPowers);

                for(let i = 0; i < totalBattles; i++) {
                    const opponentPower = shuffledOpponentPowers[i];
                    const winChance = Math.max(0.05, Math.min(0.95, 0.5 + (playerPower - opponentPower) / (opponentPower * 2.5)));
                    if (Math.random() < winChance) {
                        wins++;
                        if (playerPower < opponentPower) {
                            strongerOpponentWins++;
                        }
                    }
                }
                totalWinsThisWeek += wins;
                gymBattleReports.push({ gymId: gym.id, gymType: gym.type, wins, totalBattles });
                battleIncome += wins * BATTLE_WIN_MONEY * stadiumBonus * tycoonBonus;
                
                const basePopGain = wins * marketingBonus;
                let famousBonus = 0;
                if (trainer.trait?.id === 'famous') {
                    famousBonus = basePopGain; // 100% bonus
                }
                popularityGained += basePopGain + famousBonus;
                
                const mentorBonus = (trainer.trait?.id === 'mentor' ? 1.25 : 1);
                const winXp = XP_FOR_WIN * battleXpBonus * mentorBonus;
                const lossXp = XP_FOR_LOSS * battleXpBonus * mentorBonus;
                const trainerWinXp = TRAINER_XP_FOR_WIN * battleXpBonus * (trainer.trait?.id === 'prodigy' ? 1.25 : 1);
                const trainerLossXp = TRAINER_XP_FOR_LOSS * battleXpBonus * (trainer.trait?.id === 'prodigy' ? 1.25 : 1);
                const losses = totalBattles - wins;

                let updatedTrainer = newState.trainers.find(t => t.id === trainer.id)!;
                let newTrainerXp = updatedTrainer.xp + (wins * trainerWinXp) + (losses * trainerLossXp);
                while (newTrainerXp >= updatedTrainer.xpToNextLevel && updatedTrainer.level < 20) {
                    totalTrainerLevelUps++;
                    const leftoverXp = newTrainerXp - updatedTrainer.xpToNextLevel;
                    updatedTrainer = levelUpTrainer(updatedTrainer);
                    newTrainerXp = leftoverXp;
                }
                updatedTrainer.xp = newTrainerXp;
                newState.trainers = newState.trainers.map(t => t.id === updatedTrainer.id ? updatedTrainer : t);

                team.forEach(zenkai => {
                    let updatedZenkai = newState.zenkais.find(p => p.id === zenkai.id)!;
                    let newZenkaiXp = updatedZenkai.xp + (wins * winXp) + (losses * lossXp);
                    while(newZenkaiXp >= updatedZenkai.xpToNextLevel && updatedZenkai.level < 100) {
                        totalZenkaiLevelUps++;
                        const originalName = updatedZenkai.name;
                        const leftoverXp = newZenkaiXp - updatedZenkai.xpToNextLevel;
                        updatedZenkai = levelUpZenkai(updatedZenkai);
                        if (originalName !== updatedZenkai.name) {
                            totalEvolutionsThisWeek++;
                            notificationsToAdd.push({ type: 'success', message: `${originalName} evoluiu para ${updatedZenkai.name}!`, targetTab: 'Zenkais' });
                        }
                        newZenkaiXp = leftoverXp;
                    }
                    updatedZenkai.xp = newZenkaiXp;
                    newState.zenkais = newState.zenkais.map(p => p.id === updatedZenkai.id ? updatedZenkai : p);
                });
            });

            const incomeReport: { source: string, amount: number }[] = [];
            const expenseReport: { source: string, amount: number }[] = [];
            const popularityIncome = Math.floor(newState.popularity / 10) * INCOME_PER_10_POPULARITY;
            const merchIncome = (newState.upgrades['merchShop'] || 0) * 500;
            const activeSponsorships = newState.sponsorships.filter(s => s.status === 'active');
            const sponsorshipIncome = activeSponsorships.reduce((sum, deal) => sum + deal.weeklyIncome, 0);

            if (battleIncome > 0) incomeReport.push({ source: 'Ganhos de Batalha', amount: Math.floor(battleIncome) });
            if (popularityIncome > 0) incomeReport.push({ source: 'Bônus de Popularidade', amount: popularityIncome });
            if (merchIncome > 0) incomeReport.push({ source: 'Vendas de Mercadorias', amount: merchIncome });
            if (sponsorshipIncome > 0) incomeReport.push({ source: 'Patrocínios', amount: sponsorshipIncome });
            const totalIncome = incomeReport.reduce((sum, i) => sum + i.amount, 0);
            
            const salaryReduction = 1 - ((newState.upgrades['financialDept'] || 0) * 0.1);
            const totalSalaries = Math.floor(newState.trainers.reduce((sum, t) => sum + t.salary, 0) * salaryReduction);
            const gymCosts = newState.gyms.reduce((total, gym) => {
                const leader = newState.trainers.find(t => t.id === gym.trainerId);
                return leader?.trait?.id === 'handyman' ? total : total + GYM_WEEKLY_COST;
            }, 0);

            if (totalSalaries > 0) expenseReport.push({ source: 'Salários dos Treinadores', amount: totalSalaries });
            if (gymCosts > 0) expenseReport.push({ source: 'Manutenção dos Ginásios', amount: gymCosts });
            const totalExpenses = expenseReport.reduce((sum, e) => sum + e.amount, 0);

            const netChange = totalIncome - totalExpenses;
            newState.money += netChange;
            newState.popularity += Math.floor(popularityGained);

            // Notification for low finances
            if (newState.money < 0 && prev.money >= 0) {
                notificationsToAdd.push({ type: 'danger', message: 'Atenção: Suas finanças estão no vermelho!', targetTab: 'Finances' });
            }

            const updatedLeagues = newState.leagues.map(league => {
                if(league.isPlayer || !league.roster) return league;
                const xpGainMultiplier = league.xpRate || 0.1;
                league.roster.trainers.forEach(trainer => {
                    const diminishingReturns = 1 / (1 + trainer.level * 0.1);
                    const xpToGain = (TRAINER_XP_FOR_WIN * 10) * xpGainMultiplier * diminishingReturns;
                    trainer.xp += Math.floor(xpToGain);
                    while(trainer.xp >= trainer.xpToNextLevel && trainer.level < 20) {
                        const leftoverXp = trainer.xp - trainer.xpToNextLevel;
                        const leveledUp = levelUpTrainer(trainer);
                        Object.assign(trainer, leveledUp, { xp: leftoverXp });
                    }
                });
                league.roster.zenkais.forEach(zenkai => {
                    const diminishingReturns = 1 / (1 + zenkai.level * 0.05);
                    const xpToGain = (XP_FOR_WIN * 10) * xpGainMultiplier * diminishingReturns;
                    zenkai.xp += Math.floor(xpToGain);
                     while(zenkai.xp >= zenkai.xpToNextLevel && zenkai.level < 100) {
                        const leftoverXp = zenkai.xp - zenkai.xpToNextLevel;
                        const leveledUp = levelUpZenkai(zenkai);
                        Object.assign(zenkai, leveledUp, { xp: leftoverXp });
                    }
                });
                
                const rank = newState.leagues.findIndex(l => l.name === league.name) + 1;
                const weeklyIncome = 500 + (16-rank) * 100;
                const weeklySalary = league.roster.trainers.reduce((sum, t) => sum + t.salary, 0);
                if (weeklyIncome < weeklySalary && league.roster.zenkais.length > 6) {
                    const weakestZenkai = league.roster.zenkais.sort((a,b) => a.power - b.power)[0];
                    league.roster.zenkais = league.roster.zenkais.filter(z => z.id !== weakestZenkai.id);
                }

                const { power } = getStrongestTeamFromRoster(league.roster, {});
                return { ...league, power };
            });
            newState.leagues = updatedLeagues;

            newState.sponsorships = newState.sponsorships.map(s => {
                if (s.status === 'active') {
                    const weeksRemaining = s.weeksRemaining - 1;
                    if (weeksRemaining === 1) {
                        notificationsToAdd.push({ type: 'warning', message: `O patrocínio ${s.name} expira na próxima semana.`, targetTab: 'Sponsorships' });
                    }
                    return { ...s, weeksRemaining, status: weeksRemaining <= 0 ? 'expired' : 'active' };
                }
                if (s.status === 'available' && newState.popularity >= s.requiredPopularity && oldPopularity < s.requiredPopularity) {
                    notificationsToAdd.push({ type: 'info', message: `Novo patrocínio disponível: ${s.name}!`, targetTab: 'Sponsorships' });
                }
                return s;
            });

            const playerRoster: Roster = { trainers: newState.trainers, zenkais: newState.zenkais };
            const { power: playerPower } = getStrongestTeamFromRoster(playerRoster, newState.upgrades);
            newState.leagues = newState.leagues.map(l => l.isPlayer ? { ...l, power: playerPower } : l);
            
             // Mission Progress Update
            newState.seasonalMissions = newState.seasonalMissions.map(m => {
                if (m.isCompleted) return m;
                let newProgress = m.currentProgress;
                let progressToAdd = 0;
                if (m.type === 'win_battles') progressToAdd = totalWinsThisWeek;
                else if (m.type === 'earn_money_battles') progressToAdd = Math.floor(battleIncome);
                else if (m.type === 'gain_popularity') progressToAdd = Math.floor(popularityGained);
                else if (m.type === 'evolve_zenkais') progressToAdd = totalEvolutionsThisWeek;
                else if (m.type === 'level_up_zenkai') progressToAdd = totalZenkaiLevelUps;
                else if (m.type === 'level_up_trainer') progressToAdd = totalTrainerLevelUps;
                else if (m.type === 'defeat_stronger_opponent') progressToAdd = strongerOpponentWins;
                
                if (progressToAdd > 0) newProgress += progressToAdd;

                if (m.type === 'reach_total_power') newProgress = playerPower;
                if (m.type === 'assign_all_gyms') newProgress = newState.gyms.filter(g => g.trainerId !== null).length;
                if (m.type === 'achieve_money') newProgress = Math.max(m.currentProgress, newState.money);
                
                const isCompleted = newProgress >= m.targetValue;
                if(isCompleted && !m.isCompleted) {
                    notificationsToAdd.push({ type: 'success', message: `Missão Concluída: ${m.description.substring(0, 40)}...`, targetTab: 'Missions' });
                }
                return { ...m, currentProgress: Math.min(newProgress, m.targetValue), isCompleted };
            });
            
            // Check for unassigned trainers
            const unassignedTrainersCount = newState.trainers.filter(t => !newState.gyms.some(g => g.trainerId === t.id)).length;
            const emptyGymsCount = newState.gyms.filter(g => g.trainerId === null).length;
            if (unassignedTrainersCount > 0 && emptyGymsCount > 0) {
                notificationsToAdd.push({ type: 'warning', message: 'Você tem treinadores disponíveis para ginásios vazios.', targetTab: 'Gyms' });
            }

            if (newState.week >= WEEKS_PER_SEASON) {
                newState.isEndOfSeason = true;
                const currentLeagues = [...newState.leagues];
                const playerIndex = currentLeagues.findIndex(l => l.isPlayer);
                
                const promotionTarget = playerIndex > 0 ? currentLeagues[playerIndex - 1] : null;
                const relegationTarget = playerIndex < NUM_LEAGUES - 1 ? currentLeagues[playerIndex + 1] : null;

                const createChallenge = (opponent: League | null, type: 'promotion' | 'relegation'): EndOfSeasonChallenge | null => {
                    if (!opponent || !opponent.roster) return null;
                    const { champion, team, power } = getStrongestTeamFromRoster(opponent.roster, {});
                    return { type, opponent, opponentChampion: champion, opponentTeam: team, opponentPower: power };
                };
                
                newState.endOfSeasonChallenge = {
                    promotion: createChallenge(promotionTarget, 'promotion'),
                    relegation: createChallenge(relegationTarget, 'relegation'),
                };
            } else {
                newState.week += 1;
                newState.availableForHire = generateAvailableTrainers(newState.trainers, newState.upgrades);
            }

            if(newState.money < 0 && newState.trainers.length === 0) {
                newState.isGameOver = true;
                newState.gameOverReason = "Você ficou sem dinheiro e não tem mais treinadores. A liga faliu.";
            }

            const summary = [`Semana ${prev.week} concluída.`, `Renda Total: $${totalIncome.toLocaleString()}`, `Despesas Totais: $${totalExpenses.toLocaleString()}`];
            if (netChange >= 0) summary.push(`Lucro Líquido: $${netChange.toLocaleString()}`);
            else summary.push(`Prejuízo Líquido: $${Math.abs(netChange).toLocaleString()}`);
            
            const newReport: WeeklyReport = { week: prev.week, season: newState.season, summary, income: incomeReport, expenses: expenseReport, gymBattleReport: gymBattleReports };
            newState.reports = [newReport, ...newState.reports.slice(0, 9)];

            const newNotifications = [...notificationsToAdd.map(n => ({ ...n, id: generateId(), week: prev.week, season: prev.season, isRead: false })), ...prev.notifications].slice(0, 20);

            return { ...newState, isProcessingWeek: false, notifications: newNotifications };
        });
    }, [getTeamPower, calculateTeamAdvantageScore, generateAvailableTrainers]);
    
    const setTournamentTeam = useCallback((challengeType: 'promotion' | 'relegation', playerChampionId: string, playerTeamIds: string[]) => {
        setGameState(prev => {
            const challenge = prev.endOfSeasonChallenge[challengeType];
            if(!challenge) return prev;
            
            const updatedChallenge = { ...challenge, playerChampionId, playerTeamIds };
            return { ...prev, endOfSeasonChallenge: { ...prev.endOfSeasonChallenge, [challengeType]: updatedChallenge } };
        });
    }, []);

    const runSingleChallenge = useCallback((challengeType: 'promotion' | 'relegation') => {
        setGameState(prev => {
            const challenge = prev.endOfSeasonChallenge[challengeType];
            if (!challenge || !challenge.playerChampionId || !challenge.playerTeamIds) return prev;
            const log: string[] = [];
            const playerChampion = prev.trainers.find(t => t.id === challenge.playerChampionId)!;
            const playerTeam = prev.zenkais.filter(p => challenge.playerTeamIds?.includes(p.id));
            const playerPower = getTeamPower(playerChampion, playerTeam, undefined, challenge.opponentPower);
            
            const advantageMultiplier = (1 + (calculateTeamAdvantageScore(playerTeam, challenge.opponentTeam) / 20));
            const finalPlayerPower = playerPower * advantageMultiplier;
            
            log.push(`O poder base da sua equipe é ${playerPower}.`);
            log.push(`O poder do oponente é ${challenge.opponentPower}.`);
            if (advantageMultiplier > 1) log.push(`Sua equipe tem vantagem de tipo! Poder multiplicado para ${Math.floor(finalPlayerPower)}.`);
            if (advantageMultiplier < 1) log.push(`Sua equipe tem desvantagem de tipo. Poder reduzido para ${Math.floor(finalPlayerPower)}.`);
            
            const result = finalPlayerPower > challenge.opponentPower ? 'win' : 'loss';
            log.push(`A batalha termina. É uma ${result === 'win' ? 'VITÓRIA' : 'DERROTA'}!`);
            
            const updatedChallenge: EndOfSeasonChallenge = { ...challenge, result, log };
            return { ...prev, endOfSeasonChallenge: { ...prev.endOfSeasonChallenge, [challengeType]: updatedChallenge } };
        });
    }, [getTeamPower, calculateTeamAdvantageScore]);
    
    const forfeitChallenge = useCallback((challengeType: 'promotion' | 'relegation') => {
        setGameState(prev => {
            const challenge = prev.endOfSeasonChallenge[challengeType];
            if (!challenge) return prev;
            const updatedChallenge: EndOfSeasonChallenge = { ...challenge, result: 'forfeit', log: ['Você desistiu da partida.'] };
            return { ...prev, endOfSeasonChallenge: { ...prev.endOfSeasonChallenge, [challengeType]: updatedChallenge } };
        });
    }, []);

    const finalizeSeason = useCallback(() => {
        setGameState(prev => {
            let newState = { ...prev };
            const { promotion, relegation } = newState.endOfSeasonChallenge;

            const oldLeagues = [...newState.leagues];
            const oldRankings = oldLeagues.map((l, i) => ({ name: l.name, rank: i + 1, isPlayer: l.isPlayer }));
            
            let finalLeagues = [...newState.leagues];
            
            if (promotion?.result === 'win' && promotion.opponent) {
                const playerIndex = finalLeagues.findIndex(l => l.isPlayer);
                const opponentIndex = finalLeagues.findIndex(l => l.name === promotion.opponent.name);
                if (playerIndex !== -1 && opponentIndex !== -1) {
                    [finalLeagues[playerIndex], finalLeagues[opponentIndex]] = [finalLeagues[opponentIndex], finalLeagues[playerIndex]];
                }
            }
            if ((relegation?.result === 'loss' || relegation?.result === 'forfeit') && relegation.opponent) {
                const playerIndex = finalLeagues.findIndex(l => l.isPlayer);
                const opponentIndex = finalLeagues.findIndex(l => l.name === relegation.opponent.name);
                if (playerIndex !== -1 && opponentIndex !== -1) {
                    [finalLeagues[playerIndex], finalLeagues[opponentIndex]] = [finalLeagues[opponentIndex], finalLeagues[playerIndex]];
                }
            }
            
            for (let i = finalLeagues.length - 1; i > 0; i--) {
                const challenger = finalLeagues[i];
                const defender = finalLeagues[i-1];
                
                if (challenger.isPlayer || defender.isPlayer || 
                    challenger.name === promotion?.opponent?.name || defender.name === promotion?.opponent?.name ||
                    challenger.name === relegation?.opponent?.name || defender.name === relegation?.opponent?.name) {
                    continue;
                }

                if (!challenger.roster || !defender.roster) continue;

                const { power: challengerPower } = getStrongestTeamFromRoster(challenger.roster, {});
                const { power: defenderPower } = getStrongestTeamFromRoster(defender.roster, {});
                
                if (challengerPower > defenderPower * (1 + (Math.random() * 0.2 - 0.1))) {
                     [finalLeagues[i], finalLeagues[i-1]] = [finalLeagues[i-1], finalLeagues[i]];
                }
            }
            
            newState.leagues = finalLeagues;

            const newRankings = finalLeagues.map((l, i) => ({ name: l.name, rank: i + 1 }));

            const summary = oldRankings.map(old => {
                const newRankInfo = newRankings.find(n => n.name === old.name)!;
                return { name: old.name, isPlayer: old.isPlayer, oldRank: old.rank, newRank: newRankInfo.rank };
            });
            newState.endOfSeasonSummary = summary.sort((a, b) => a.newRank - b.newRank);
            
            const playerOldRankInfo = oldRankings.find(s => s.isPlayer)!;
            const playerNewRankInfo = summary.find(s => s.isPlayer)!;
            const playerNewRank = playerNewRankInfo.newRank;
            
            const prizeMap: { [key: number]: number } = {
                1: 300000, 2: 250000, 3: 200000, 4: 150000, 5: 140000, 6: 120000,
                7: 100000, 8: 70000, 9: 50000, 10: 40000, 11: 30000, 12: 25000, 13: 15000, 14: 10000,
            };
            let prize = 0;
            if (playerNewRank < playerOldRankInfo.rank) { 
                prize = prizeMap[playerNewRank] || 0;
            } else if (playerNewRank === 1 && playerOldRankInfo.rank === 1) { 
                prize = 50000;
            }

            newState.money += prize;
            newState.endOfSeasonPrize = prize;
            
            return newState;
        });
    }, []);

    const startNewSeason = useCallback(() => {
        setGameState(prev => {
            const nextSeason = prev.season + 1;
            const playerRank = prev.leagues.findIndex(l => l.isPlayer) + 1;
            
            const regeneratedLeagues = prev.leagues.map((league, index) => {
                if(league.isPlayer) return league;
                const newRank = index + 1;
                const { roster, power } = generateAiRoster(newRank);
                return {
                    ...league,
                    roster,
                    power,
                    xpRate: 0.02 + Math.random() * 0.13,
                };
            });

            return {
                ...prev,
                season: nextSeason,
                week: 1,
                isEndOfSeason: false,
                endOfSeasonChallenge: { promotion: null, relegation: null },
                endOfSeasonSummary: null,
                endOfSeasonPrize: undefined,
                availableForHire: generateAvailableTrainers(prev.trainers, prev.upgrades),
                leagues: regeneratedLeagues,
                seasonalMissions: generateSeasonalMissions(playerRank, nextSeason),
                seasonalMissionRerollsUsed: 0,
            };
        });
    }, [generateAvailableTrainers]);
    
    const calculateSynergyBonus = useCallback((trainer: Trainer, team: Zenkai[], upgrades: Record<string, number>): number => {
        const synergyBonusMultiplier = 1 + ((upgrades['synergyBonus'] || 0) * 0.1);
        const zenkaiSynergyBonus = team.reduce((sum, p) => {
            if (p.type === trainer.synergyType) {
                let synergyBonus = p.power * 0.4 * synergyBonusMultiplier;
                if (trainer.trait?.id === 'type_specialist') synergyBonus *= 2;
                return sum + synergyBonus;
            }
            return sum;
        }, 0);
        return Math.floor(zenkaiSynergyBonus);
    }, []);

    const chooseStarter = useCallback((zenkaiName: string) => {
        setGameState(prev => {
            if (prev.hasChosenStarter) return prev;

            const starterTemplate = ZENKAI_DATA.find(p => p.name === zenkaiName);
            if (!starterTemplate) return prev;
            
            const newZenkai = createAndLevelUpZenkai(starterTemplate, INITIAL_ZENKAI_LEVEL);

            return {
                ...prev,
                zenkais: [...prev.zenkais, newZenkai],
                hasChosenStarter: true,
            };
        });
    }, []);

    const addDebugMoney = useCallback(() => {
        setGameState(prev => ({...prev, money: prev.money + 50000 }));
    }, []);

    const restartGame = useCallback(() => {
        setGameState(createInitialState());
    }, []);
    
    const markNotificationAsRead = useCallback((notificationId: string) => {
        setGameState(prev => ({
            ...prev,
            notifications: prev.notifications.map(n =>
                n.id === notificationId ? { ...n, isRead: true } : n
            )
        }));
    }, []);

    const markAllNotificationsAsRead = useCallback(() => {
        setGameState(prev => ({
            ...prev,
            notifications: prev.notifications.map(n => ({ ...n, isRead: true }))
        }));
    }, []);

    const clearReadNotifications = useCallback(() => {
        setGameState(prev => ({
            ...prev,
            notifications: prev.notifications.filter(n => !n.isRead)
        }));
    }, []);

    const assignBestZenkaisToTrainer = useCallback((trainerId: string) => {
        setGameState(prev => {
            const trainer = prev.trainers.find(t => t.id === trainerId);
            if (!trainer) return prev;
    
            const teamSize = trainer.zenkais.length;
            const slotsToFill = 6 - teamSize;
    
            if (slotsToFill <= 0) return prev; // Team is already full
    
            // Find all assigned zenkai IDs
            const allAssignedZenkaiIds = new Set<string>();
            prev.trainers.forEach(t => {
                t.zenkais.forEach(zid => allAssignedZenkaiIds.add(zid));
            });
    
            // Find available zenkais
            const availableZenkais = prev.zenkais.filter(z => !allAssignedZenkaiIds.has(z.id));
    
            // Sort available zenkais: synergy first, then by power
            availableZenkais.sort((a, b) => {
                const aHasSynergy = a.type === trainer.synergyType;
                const bHasSynergy = b.type === trainer.synergyType;
    
                if (aHasSynergy && !bHasSynergy) return -1;
                if (!aHasSynergy && bHasSynergy) return 1;
    
                return b.power - a.power;
            });
    
            const zenkaisToAssign = availableZenkais.slice(0, slotsToFill);
            const zenkaiIdsToAssign = zenkaisToAssign.map(z => z.id);
    
            if (zenkaiIdsToAssign.length === 0) return prev; // No available zenkais to assign
    
            const newTrainers = prev.trainers.map(t => {
                if (t.id === trainerId) {
                    return {
                        ...t,
                        zenkais: [...t.zenkais, ...zenkaiIdsToAssign]
                    };
                }
                return t;
            });
    
            return { ...prev, trainers: newTrainers };
        });
    }, []);

    return {
        gameState,
        assignZenkaiToTrainer,
        unassignZenkai,
        reassignZenkaiToTrainer,
        assignTrainerToGym,
        unassignTrainerFromGym,
        advanceWeek,
        hireTrainer,
        fireTrainer,
        rerollAvailableTrainers,
        startExpedition,
        attemptCapture,
        trainZenkai,
        trainTrainer,
        purchaseUpgrade,
        sellZenkai,
        toggleZenkaiLock,
        getTeamPower,
        calculateTeamAdvantageScore,
        setTournamentTeam,
        runSingleChallenge,
        forfeitChallenge,
        finalizeSeason,
        startNewSeason,
        acceptSponsorship,
        calculateSynergyBonus,
        claimMissionReward,
        rerollSeasonalMission,
        chooseStarter,
        addDebugMoney,
        restartGame,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearReadNotifications,
        assignBestZenkaisToTrainer,
    };
};
