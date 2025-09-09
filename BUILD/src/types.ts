


export enum ZenkaiType {
  Herbal = 'Herbal',
  Fogo = 'Fogo',
  Agua = 'Água',
  Voador = 'Voador',
  Noturno = 'Noturno',
  Toxico = 'Tóxico',
  Terra = 'Terra',
  Eletrico = 'Elétrico',
  Mineral = 'Mineral',
}

export type Tab = 'Hub' | 'Gyms' | 'Trainers' | 'Zenkais' | 'Expeditions' | 'Training' | 'Missions' | 'Sponsorships' | 'Infrastructure' | 'Finances' | 'Ranking';

export interface Notification {
  id: string;
  type: 'warning' | 'info' | 'success' | 'danger';
  message: string;
  week: number;
  season: number;
  isRead: boolean;
  targetTab?: Tab;
}

export interface ZenkaiData {
  name: string;
  type: ZenkaiType;
  basePower: number;
  habitat: string;
  forma: string;
  evolution?: { level?: number; to: string };
}

export interface TrainerData {
    name: string;
    basePower: number;
    type: ZenkaiType;
    salary?: number;
    traitId?: TrainerTraitId;
}

export interface Zenkai {
  id: string;
  name: string;
  type: ZenkaiType;
  level: number;
  power: number;
  basePower: number;
  xp: number;
  xpToNextLevel: number;
  habitat: string;
  forma: string;
  isLocked?: boolean;
}

export type TrainerTraitId = 'mentor' | 'strategist' | 'recruiter' | 'militant' | 'famous' | 'humble' | 'handyman' | 'prodigy' | 'type_specialist' | 'generalist' | 'relentless' | 'warrior' | 'tycoon' | 'engineer';

export interface TrainerTrait {
  id: TrainerTraitId;
  name: string;
  description: string;
}

export interface Trainer {
  id: string;
  name: string;
  level: number;
  synergyType: ZenkaiType;
  salary: number;
  zenkais: string[]; // array of zenkai ids
  basePower: number;
  isInitial?: boolean;
  xp: number;
  xpToNextLevel: number;
  trait?: TrainerTrait;
}

export interface Gym {
  id: string;
  type: ZenkaiType;
  trainerId: string | null;
}

export interface Roster {
    trainers: Trainer[];
    zenkais: Zenkai[];
}

export interface League {
  name: string;
  isPlayer: boolean;
  points: number;
  power: number;
  roster?: Roster;
  xpRate?: number;
}

export interface GymBattleReport {
    gymId: string;
    gymType: ZenkaiType;
    wins: number;
    totalBattles: number;
}

export interface WeeklyReport {
  week: number;
  season: number;
  summary: string[];
  income: { source: string, amount: number }[];
  expenses: { source: string, amount: number }[];
  gymBattleReport: GymBattleReport[];
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  maxLevel: number;
}

export interface EndOfSeasonChallenge {
    type: 'promotion' | 'relegation' | 'title_defense';
    opponent: League;
    playerChampionId?: string;
    playerTeamIds?: string[];
    opponentChampion: Trainer;
    opponentTeam: Zenkai[];
    opponentPower: number;
    result?: 'win' | 'loss' | 'forfeit';
    log?: string[];
}

export interface SponsorshipDeal {
  id: string;
  name: string;
  description: string;
  requiredPopularity: number;
  weeklyIncome: number;
  totalWeeks: number;
  weeksRemaining: number;
  status: 'available' | 'active' | 'expired';
}

export interface LeagueRankChange {
  name: string;
  isPlayer: boolean;
  oldRank: number;
  newRank: number;
}

export interface SeasonalMission {
  id: string; 
  type: string; 
  description: string;
  targetValue: number;
  currentProgress: number;
  reward: number;
  isCompleted: boolean;
  isClaimed: boolean;
}

export interface GameState {
  money: number;
  popularity: number;
  week: number;
  season: number;
  gyms: Gym[];
  trainers: Trainer[];
  zenkais: Zenkai[];
  leagues: League[];
  reports: WeeklyReport[];
  upgrades: Record<string, number>; // key: upgradeId, value: level
  isProcessingWeek: boolean;
  availableForHire: Trainer[];
  isGameOver: boolean;
  gameOverReason: string;
  isEndOfSeason: boolean;
  endOfSeasonChallenge: {
      promotion: EndOfSeasonChallenge | null;
      relegation: EndOfSeasonChallenge | null;
  };
  sponsorships: SponsorshipDeal[];
  endOfSeasonPrize?: number;
  endOfSeasonSummary: LeagueRankChange[] | null;
  seasonalMissions: SeasonalMission[];
  seasonalMissionRerollsUsed: number;
  hasChosenStarter: boolean;
  notifications: Notification[];
}