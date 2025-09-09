import React, { useState, useMemo, useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { Trainer, Zenkai, EndOfSeasonChallenge, ZenkaiType, LeagueRankChange } from '../types';
import { TypeBadge } from './TypeBadge';
import { ZenkaiPortrait } from './ZenkaiPortrait';
import { TrainerPortrait } from './TrainerPortrait';

interface EndOfSeasonModalProps {
    gameStateHook: ReturnType<typeof useGameState>;
}

enum TournamentPhase {
    Intro,
    PromotionSetup,
    PromotionConfrontation,
    RelegationSetup,
    RelegationConfrontation,
    Results,
    LeagueSummary,
}

const TeamDisplay: React.FC<{ title: string, champion: Trainer, team: Zenkai[], power: number }> = ({ title, champion, team, power }) => (
    <div className="bg-dark-1 p-3 rounded-lg">
        <h4 className="font-bold text-center text-lg mb-2">{title}</h4>
        <div className="bg-dark-3 p-2 rounded mb-2 text-center">
            <p className="font-semibold">{champion.name} <span className="text-xs text-gray-400">(Nvl {champion.level})</span></p>
        </div>
        <div className="space-y-1 text-sm max-h-40 overflow-y-auto pr-1">
            {team.map(p => (
                <div key={p.id} className="flex justify-between items-center bg-dark-2 p-1.5 rounded">
                    <div className="flex items-center gap-2">
                        <ZenkaiPortrait zenkaiName={p.name} sizeClass="w-8 h-8" />
                        <span>{p.name} <span className="text-xs text-gray-400">(Nvl {p.level})</span></span>
                    </div>
                    <TypeBadge type={p.type} />
                </div>
            ))}
        </div>
        <p className="text-center mt-3 font-bold text-poke-yellow text-xl">Poder Total: {power.toLocaleString()}</p>
    </div>
);

const AdvantageDisplay: React.FC<{ score: number }> = ({ score }) => {
    let text, color, icon;

    if (score > 3) {
        text = 'Forte Vantagem';
        color = 'text-green-400';
        icon = '▲▲';
    } else if (score > 0) {
        text = 'Vantagem';
        color = 'text-green-400';
        icon = '▲';
    } else if (score < -3) {
        text = 'Forte Desvantagem';
        color = 'text-red-400';
        icon = '▼▼';
    } else if (score < 0) {
        text = 'Desvantagem';
        color = 'text-red-400';
        icon = '▼';
    } else {
        text = 'Confronto Neutro';
        color = 'text-gray-400';
        icon = '●';
    }

    return (
        <div className="text-center bg-dark-2 p-3 rounded-lg mt-4">
            <h4 className="font-semibold text-lg mb-1">Vantagem de Tipo</h4>
            <p className={`text-xl font-bold ${color}`}>
                <span className="mr-2">{icon}</span>
                {text}
            </p>
            <p className="text-xs text-gray-500">Pontuação: {score.toFixed(2)}</p>
        </div>
    );
};


const ChallengeSetup: React.FC<{
    challenge: EndOfSeasonChallenge;
    allTrainers: Trainer[];
    allZenkais: Zenkai[];
    onConfirm: (trainerId: string, zenkaiIds: string[]) => void;
    onForfeit: () => void;
    getTeamPower: (trainer: Trainer, team: Zenkai[], gymType?: ZenkaiType) => number;
    calculateTeamAdvantageScore: (team1: Zenkai[], team2: Zenkai[]) => number;
}> = ({ challenge, allTrainers, allZenkais, onConfirm, onForfeit, getTeamPower, calculateTeamAdvantageScore }) => {
    const [selectedTrainerId, setSelectedTrainerId] = useState<string | null>(null);
    const [selectedZenkaiIds, setSelectedZenkaiIds] = useState<string[]>([]);
    
    const getTrainerIndividualPower = (trainer: Trainer) => trainer.basePower + (trainer.level * 3);

    const selectedTrainer = useMemo(() => allTrainers.find(t => t.id === selectedTrainerId), [allTrainers, selectedTrainerId]);
    const selectedZenkais = useMemo(() => {
        return selectedZenkaiIds.map(id => allZenkais.find(p => p.id === id)).filter(Boolean) as Zenkai[];
    }, [allZenkais, selectedZenkaiIds]);

    const advantageScore = useMemo(() => {
        if (selectedZenkais.length === 0) return 0;
        return calculateTeamAdvantageScore(selectedZenkais, challenge.opponentTeam);
    }, [selectedZenkais, challenge.opponentTeam, calculateTeamAdvantageScore]);

    const handleZenkaiSelect = (zenkaiId: string) => {
        setSelectedZenkaiIds(prev => {
            if (prev.includes(zenkaiId)) {
                return prev.filter(id => id !== zenkaiId);
            }
            if (prev.length < 6) {
                return [...prev, zenkaiId];
            }
            return prev;
        });
    };
    
    useEffect(() => {
    }, [selectedTrainer]);

    const isReady = selectedTrainerId && selectedZenkaiIds.length > 0;
    const currentPower = selectedTrainer ? getTeamPower(selectedTrainer, selectedZenkais) : 0;
    
    const title = challenge.type === 'promotion' ? 'Desafio de Promoção' : 'Defesa de Rebaixamento';
    const description = challenge.type === 'promotion'
        ? `Você está desafiando ${challenge.opponent.name}! Monte sua melhor equipe.`
        : `Defenda seu rank! ${challenge.opponent.name} está te desafiando.`;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-poke-yellow">{title}</h2>
            <p className="text-center text-gray-300">{description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold mb-2">1. Selecione seu Treinador Campeão</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto bg-dark-1 p-2 rounded">
                        {allTrainers
                            .sort((a, b) => getTrainerIndividualPower(b) - getTrainerIndividualPower(a))
                            .map(trainer => (
                             <button key={trainer.id} onClick={() => setSelectedTrainerId(trainer.id)} className={`w-full text-left p-2 rounded transition-colors ${selectedTrainerId === trainer.id ? 'bg-poke-blue text-white' : 'bg-dark-2 hover:bg-dark-3'}`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold">{trainer.name} <span className="text-xs font-normal">(Nvl {trainer.level})</span></p>
                                        <div className="flex items-center gap-2 text-xs mt-1">
                                            <TypeBadge type={trainer.synergyType} />
                                            {trainer.trait && <span className="font-semibold text-poke-blue">{trainer.trait.name}</span>}
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold text-poke-yellow">Poder: {getTrainerIndividualPower(trainer)}</p>
                                </div>
                             </button>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">2. Selecione sua Equipe ({selectedZenkaiIds.length} / 6)</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto bg-dark-1 p-2 rounded">
                        {allZenkais
                            .sort((a, b) => {
                                const aIsSelected = selectedZenkaiIds.includes(a.id);
                                const bIsSelected = selectedZenkaiIds.includes(b.id);
                                if (aIsSelected && !bIsSelected) return -1;
                                if (!aIsSelected && bIsSelected) return 1;
                                return b.power - a.power;
                            })
                            .map(zenkai => (
                             <button key={zenkai.id} onClick={() => handleZenkaiSelect(zenkai.id)} className={`w-full text-left p-2 rounded transition-colors flex justify-between items-center ${selectedZenkaiIds.includes(zenkai.id) ? 'bg-poke-green text-white' : 'bg-dark-2 hover:bg-dark-3'}`}>
                                <div className="flex items-center gap-2">
                                    <ZenkaiPortrait zenkaiName={zenkai.name} sizeClass="w-8 h-8" />
                                    <div>
                                        <p>{zenkai.name} <span className="text-xs font-normal">(Nvl {zenkai.level})</span></p>
                                        <p className="text-xs text-poke-yellow">Poder: {zenkai.power}</p>
                                    </div>
                                </div>
                                <TypeBadge type={zenkai.type} />
                             </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                 <div className="bg-dark-1 p-3 rounded">
                    <h4 className="font-bold text-center text-lg mb-2">Sua Equipe Selecionada</h4>
                    {selectedTrainer ? (
                        <>
                            <div className="bg-dark-3 p-2 rounded mb-2 text-center">
                                <p className="font-semibold">{selectedTrainer.name}</p>
                                <p className="text-xs text-gray-400">Poder: {getTrainerIndividualPower(selectedTrainer)} | Habilidade: {selectedTrainer.trait?.name || 'Nenhuma'}</p>
                            </div>
                            <div className="space-y-1 text-sm max-h-40 overflow-y-auto pr-1">
                                {selectedZenkais.map(p => (
                                    <div key={p.id} className="flex justify-between items-center bg-dark-2 p-1.5 rounded">
                                        <div className="flex items-center gap-2">
                                           <ZenkaiPortrait zenkaiName={p.name} sizeClass="w-8 h-8" />
                                            <div>
                                                <p>{p.name} <span className="text-xs text-gray-400">(Nvl {p.level})</span></p>
                                                <p className="text-xs text-poke-yellow">Poder: {p.power}</p>
                                            </div>
                                        </div>
                                       <TypeBadge type={p.type} />
                                    </div>
                                ))}
                            </div>
                            <p className="text-center mt-3 font-bold text-poke-yellow text-xl">Poder Total da Equipe: {currentPower.toLocaleString()}</p>
                        </>
                    ) : <p className="text-center text-gray-500 italic">Selecione um treinador primeiro</p>}
                </div>
                <TeamDisplay title="Oponente" champion={challenge.opponentChampion} team={challenge.opponentTeam} power={challenge.opponentPower} />
            </div>
            
            <AdvantageDisplay score={advantageScore} />

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
                <button onClick={onForfeit} className="px-6 py-3 bg-poke-red text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition duration-300">
                    Desistir da Partida
                </button>
                <button onClick={() => onConfirm(selectedTrainerId!, selectedZenkaiIds)} disabled={!isReady} className="px-6 py-3 bg-poke-green text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition duration-300 disabled:bg-gray-500">
                    Confirmar e Batalhar!
                </button>
            </div>
        </div>
    );
};

const BattleTeamDisplay: React.FC<{
    champion: Trainer;
    team: Zenkai[];
    activeAttacker: number | null;
    side: 'left' | 'right';
    defeatedIndices: Set<number>;
}> = ({ champion, team, activeAttacker, side, defeatedIndices }) => (
    <div className={`w-full md:w-2/5 p-3 bg-dark-1/50 rounded-lg shadow-lg ${side === 'left' ? 'animate-slide-in-left' : 'animate-slide-in-right'}`}>
        <div className="flex items-center gap-3 p-2 bg-dark-3/50 rounded-md mb-3">
            <TrainerPortrait trainerName={champion.name} synergyType={champion.synergyType} sizeClass="w-12 h-12" />
            <div>
                <h4 className="font-bold text-lg">{champion.name}</h4>
                <p className="text-xs text-gray-400">Nível {champion.level}</p>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
            {team.map((zenkai, index) => (
                <div key={zenkai.id} className={`relative transition-all duration-300 ${activeAttacker === index ? (side === 'left' ? 'battle-attacker-left' : 'battle-attacker-right') : ''} ${defeatedIndices.has(index) ? 'defeated-zenkai' : ''}`}>
                    <ZenkaiPortrait zenkaiName={zenkai.name} sizeClass="w-full h-auto aspect-square" />
                </div>
            ))}
        </div>
    </div>
);

const BattleConfrontation: React.FC<{
    challenge: EndOfSeasonChallenge;
    playerChampion: Trainer;
    playerTeam: Zenkai[];
    onAnimationEnd: () => void;
}> = ({ challenge, playerChampion, playerTeam, onAnimationEnd }) => {
    const [battlePhase, setBattlePhase] = useState<'start' | 'fighting' | 'end'>('start');
    const [activeAttackers, setActiveAttackers] = useState<{ player: number | null; opponent: number | null } | null>(null);
    const [damageEvents, setDamageEvents] = useState<{ target: 'player' | 'opponent'; amount: number; key: number }[]>([]);
    const [defeatedPlayer, setDefeatedPlayer] = useState<Set<number>>(new Set());
    const [defeatedOpponent, setDefeatedOpponent] = useState<Set<number>>(new Set());

    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };


    useEffect(() => {
        const timeouts: ReturnType<typeof setTimeout>[] = [];
        const runBattle = () => {
            setBattlePhase('fighting');
            const isPlayerWinner = challenge.result === 'win';

            const loserIndices = [0, 1, 2, 3, 4, 5];
            const winnerIndices = shuffleArray([0, 1, 2, 3, 4, 5]).slice(0, Math.floor(Math.random() * 2) + 4); 

            const playerDefeatOrder = isPlayerWinner ? winnerIndices : loserIndices;
            const opponentDefeatOrder = isPlayerWinner ? loserIndices : winnerIndices;

            const totalRounds = 6;
            for (let i = 0; i < totalRounds; i++) {
                const round = i + 1;
                const delay = round * 1500;

                // Attack animation
                timeouts.push(setTimeout(() => {
                    const currentDefeatedPlayer = new Set(playerDefeatOrder.slice(0, i));
                    const currentDefeatedOpponent = new Set(opponentDefeatOrder.slice(0, i));

                    const getAttackerIndex = (defeatedSet: Set<number>, teamSize: number): number | null => {
                        const available = Array.from({ length: teamSize }, (_, k) => k).filter(idx => !defeatedSet.has(idx));
                        if (available.length > 0) {
                            return available[Math.floor(Math.random() * available.length)];
                        }
                        return null;
                    };
                    
                    const playerAttacker = getAttackerIndex(currentDefeatedPlayer, playerTeam.length);
                    const opponentAttacker = getAttackerIndex(currentDefeatedOpponent, challenge.opponentTeam.length);

                    setActiveAttackers({ player: playerAttacker, opponent: opponentAttacker });

                    const damageEventsToAdd: { target: 'player' | 'opponent'; amount: number; key: number }[] = [];
                    if (playerAttacker !== null) {
                        const playerDamage = Math.floor(Math.random() * 250 + (isPlayerWinner ? 250 : 100));
                        damageEventsToAdd.push({ target: 'opponent', amount: playerDamage, key: Math.random() });
                    }
                    if (opponentAttacker !== null) {
                        const opponentDamage = Math.floor(Math.random() * 250 + (!isPlayerWinner ? 250 : 100));
                        damageEventsToAdd.push({ target: 'player', amount: opponentDamage, key: Math.random() });
                    }
                    setDamageEvents(damageEventsToAdd);

                }, delay - 500));

                // Clear attackers
                timeouts.push(setTimeout(() => setActiveAttackers(null), delay + 500));
                
                // Defeat animation
                timeouts.push(setTimeout(() => {
                    if (i < playerDefeatOrder.length) {
                        setDefeatedPlayer(prev => new Set(prev).add(playerDefeatOrder[i]));
                    }
                    if (i < opponentDefeatOrder.length) {
                        setDefeatedOpponent(prev => new Set(prev).add(opponentDefeatOrder[i]));
                    }
                }, delay));
            }
            
            // End screen
            timeouts.push(setTimeout(() => {
                setBattlePhase('end');
            }, (totalRounds + 1) * 1500));
        };
        
        timeouts.push(setTimeout(runBattle, 1000));

        return () => timeouts.forEach(clearTimeout);
    }, [challenge, playerTeam]);
    
    if (challenge.result === 'forfeit') {
        return (
             <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-red-400 animate-result-zoom-in">DESISTÊNCIA!</h2>
                <p>Você desistiu da partida.</p>
                <button onClick={onAnimationEnd} className="px-6 py-3 bg-poke-blue text-white font-bold rounded-lg shadow-md hover:bg-blue-600">
                    Continuar
                </button>
            </div>
        );
    }

    return (
        <div className="relative min-h-[450px] flex flex-col items-center justify-center overflow-hidden">
            <div className="flex flex-col md:flex-row w-full justify-between items-center relative">
                <BattleTeamDisplay champion={playerChampion} team={playerTeam} activeAttacker={activeAttackers?.player ?? null} side="left" defeatedIndices={defeatedPlayer} />
                <div className="text-6xl font-orbitron text-poke-yellow p-4">VS</div>
                <BattleTeamDisplay champion={challenge.opponentChampion} team={challenge.opponentTeam} activeAttacker={activeAttackers?.opponent ?? null} side="right" defeatedIndices={defeatedOpponent} />
            
                {damageEvents.map(event => (
                    <div 
                        key={event.key} 
                        className={`absolute top-1/2 font-bold text-2xl text-red-500 animate-damage-popup ${event.target === 'player' ? 'left-1/4' : 'right-1/4'}`}
                    >
                        -{event.amount}
                    </div>
                ))}
            </div>

            {battlePhase === 'end' && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-4 z-20">
                    <h2 className={`text-6xl font-bold font-orbitron animate-result-zoom-in ${challenge.result === 'win' ? 'text-green-400' : 'text-red-400'}`}>
                        {challenge.result === 'win' ? 'VITÓRIA!' : 'DERROTA!'}
                    </h2>
                     <button onClick={onAnimationEnd} className="px-6 py-3 bg-poke-blue text-white font-bold rounded-lg shadow-md hover:bg-blue-600 animate-result-zoom-in animation-delay-300">
                        Continuar
                    </button>
                </div>
            )}
        </div>
    );
};

export const EndOfSeasonModal: React.FC<EndOfSeasonModalProps> = ({ gameStateHook }) => {
    const { gameState, setTournamentTeam, runSingleChallenge, forfeitChallenge, finalizeSeason, startNewSeason, getTeamPower, calculateTeamAdvantageScore } = gameStateHook;
    const { endOfSeasonChallenge, season, endOfSeasonSummary, endOfSeasonPrize, trainers, zenkais } = gameState;
    
    const { promotion, relegation } = endOfSeasonChallenge;

    const getInitialPhase = () => {
        if (promotion) return TournamentPhase.PromotionSetup;
        if (relegation) return TournamentPhase.RelegationSetup;
        return TournamentPhase.Results;
    };
    
    const [phase, setPhase] = useState<TournamentPhase>(TournamentPhase.Intro);

    useEffect(() => {
        if(phase === TournamentPhase.Intro) {
            const timer = setTimeout(() => {
                const nextPhase = getInitialPhase();
                if(nextPhase === TournamentPhase.Results) {
                    finalizeSeason();
                }
                setPhase(nextPhase);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [phase, promotion, relegation, finalizeSeason]);


    const handleConfirmTeam = (challengeType: 'promotion' | 'relegation', trainerId: string, zenkaiIds: string[]) => {
        setTournamentTeam(challengeType, trainerId, zenkaiIds);
        runSingleChallenge(challengeType);
        if (challengeType === 'promotion') {
            setPhase(TournamentPhase.PromotionConfrontation);
        } else {
            setPhase(TournamentPhase.RelegationConfrontation);
        }
    };
    
    const handleForfeit = (challengeType: 'promotion' | 'relegation') => {
        forfeitChallenge(challengeType);
        if (challengeType === 'promotion') {
            setPhase(TournamentPhase.PromotionConfrontation);
        } else {
            setPhase(TournamentPhase.RelegationConfrontation);
        }
    };
    
    const handleNextPhase = () => {
        switch (phase) {
            case TournamentPhase.PromotionConfrontation:
                if (relegation) setPhase(TournamentPhase.RelegationSetup);
                else {
                    finalizeSeason();
                    setPhase(TournamentPhase.Results);
                }
                break;
            case TournamentPhase.RelegationConfrontation:
                finalizeSeason();
                setPhase(TournamentPhase.Results);
                break;
            case TournamentPhase.Results:
                setPhase(TournamentPhase.LeagueSummary);
                break;
            case TournamentPhase.LeagueSummary:
                startNewSeason();
                break;
            default:
                break;
        }
    };
    
    const renderPhaseContent = () => {
        switch (phase) {
            case TournamentPhase.Intro:
                return (
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-poke-yellow">Fim da Temporada {season}!</h2>
                        <p className="text-lg text-light-1">Prepare-se para os desafios de fim de temporada.</p>
                        <svg className="animate-spin h-8 w-8 text-poke-yellow mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                );
            case TournamentPhase.PromotionSetup:
                if (!promotion) return null;
                return <ChallengeSetup challenge={promotion} allTrainers={trainers} allZenkais={zenkais} onConfirm={(t, z) => handleConfirmTeam('promotion', t, z)} onForfeit={() => handleForfeit('promotion')} getTeamPower={getTeamPower} calculateTeamAdvantageScore={calculateTeamAdvantageScore} />;
            case TournamentPhase.PromotionConfrontation:
                if (!promotion) return null;
                const playerChampionP = trainers.find(t => t.id === promotion.playerChampionId);
                const playerTeamP = zenkais.filter(p => promotion.playerTeamIds?.includes(p.id));
                if(!playerChampionP) return null; // Or show an error/fallback
                return <BattleConfrontation challenge={promotion} playerChampion={playerChampionP} playerTeam={playerTeamP} onAnimationEnd={handleNextPhase} />;

            case TournamentPhase.RelegationSetup:
                 if (!relegation) return null;
                 return <ChallengeSetup challenge={relegation} allTrainers={trainers} allZenkais={zenkais} onConfirm={(t, z) => handleConfirmTeam('relegation', t, z)} onForfeit={() => handleForfeit('relegation')} getTeamPower={getTeamPower} calculateTeamAdvantageScore={calculateTeamAdvantageScore} />;
            case TournamentPhase.RelegationConfrontation:
                if (!relegation) return null;
                const playerChampionR = trainers.find(t => t.id === relegation.playerChampionId);
                const playerTeamR = zenkais.filter(p => relegation.playerTeamIds?.includes(p.id));
                if(!playerChampionR) return null; // Or show an error/fallback
                return <BattleConfrontation challenge={relegation} playerChampion={playerChampionR} playerTeam={playerTeamR} onAnimationEnd={handleNextPhase} />;

            case TournamentPhase.Results:
                 return (
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-poke-yellow">Resultados Finais</h2>
                        <p className="text-lg text-light-1">A poeira baixou e a temporada terminou.</p>
                        {endOfSeasonPrize !== undefined && endOfSeasonPrize > 0 && (
                            <div className="bg-green-900/50 p-4 rounded-lg">
                                <p className="text-xl text-green-400">Você ganhou um prêmio de fim de temporada de:</p>
                                <p className="text-3xl font-bold text-white font-mono">${endOfSeasonPrize.toLocaleString()}</p>
                            </div>
                        )}
                         <button onClick={handleNextPhase} className="px-6 py-3 bg-poke-blue text-white font-bold rounded-lg shadow-md hover:bg-blue-600">
                            Ver Resumo da Liga
                        </button>
                    </div>
                 );
            case TournamentPhase.LeagueSummary:
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-center text-poke-yellow mb-4">Resumo da Liga - Fim da Temporada {season}</h2>
                        <div className="bg-dark-3 rounded-lg shadow-lg overflow-hidden max-h-96 overflow-y-auto">
                            <table className="min-w-full">
                                <thead className="bg-dark-1 sticky top-0">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Liga</th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Rank Antigo</th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Novo Rank</th>
                                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Mudança</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dark-2">
                                    {endOfSeasonSummary?.map(change => {
                                        const changeVal = change.oldRank - change.newRank;
                                        let changeText, changeColor;
                                        if (changeVal > 0) {
                                            changeText = `▲ ${changeVal}`;
                                            changeColor = 'text-green-400';
                                        } else if (changeVal < 0) {
                                            changeText = `▼ ${Math.abs(changeVal)}`;
                                            changeColor = 'text-red-400';
                                        } else {
                                            changeText = '▬';
                                            changeColor = 'text-gray-400';
                                        }

                                        return (
                                            <tr key={change.name} className={change.isPlayer ? 'bg-poke-blue/20' : ''}>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-white">{change.name}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300 text-center">{change.oldRank}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-white font-bold text-center">{change.newRank}</td>
                                                <td className={`px-4 py-2 whitespace-nowrap text-sm font-bold text-center ${changeColor}`}>{changeText}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <button onClick={handleNextPhase} className="mt-6 w-full px-6 py-3 bg-poke-green text-white font-bold rounded-lg shadow-md hover:bg-green-600">
                            Começar Nova Temporada
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[100] p-4">
            <div className="bg-dark-2 p-6 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {renderPhaseContent()}
            </div>
        </div>
    );
};