
import { ZenkaiType } from './types';

export const ZENKAI_TYPES: ZenkaiType[] = Object.values(ZenkaiType);

export const ZENKAI_TYPE_COLORS: { [key in ZenkaiType]: string } = {
  [ZenkaiType.Herbal]: 'bg-green-500',
  [ZenkaiType.Fogo]: 'bg-red-500',
  [ZenkaiType.Agua]: 'bg-blue-500',
  [ZenkaiType.Voador]: 'bg-indigo-400',
  [ZenkaiType.Noturno]: 'bg-gray-800',
  [ZenkaiType.Toxico]: 'bg-purple-600',
  [ZenkaiType.Terra]: 'bg-yellow-900',
  [ZenkaiType.Eletrico]: 'bg-yellow-400 text-gray-800',
  [ZenkaiType.Mineral]: 'bg-stone-500',
};

export const ZENKAI_TYPE_GYM_COLORS: { [key in ZenkaiType]: string } = {
  [ZenkaiType.Herbal]: 'bg-green-800',
  [ZenkaiType.Fogo]: 'bg-red-800',
  [ZenkaiType.Agua]: 'bg-blue-800',
  [ZenkaiType.Voador]: 'bg-indigo-800',
  [ZenkaiType.Noturno]: 'bg-gray-800',
  [ZenkaiType.Toxico]: 'bg-purple-800',
  [ZenkaiType.Terra]: 'bg-yellow-900',
  [ZenkaiType.Eletrico]: 'bg-yellow-500',
  [ZenkaiType.Mineral]: 'bg-stone-700',
};

export const ZENKAI_TYPE_GYM_GRADIENTS: { [key in ZenkaiType]: string } = {
  [ZenkaiType.Herbal]: 'from-green-900/70 to-dark-3',
  [ZenkaiType.Fogo]: 'from-red-900/70 to-dark-3',
  [ZenkaiType.Agua]: 'from-blue-900/70 to-dark-3',
  [ZenkaiType.Voador]: 'from-indigo-900/70 to-dark-3',
  [ZenkaiType.Noturno]: 'from-gray-800/70 to-dark-3',
  [ZenkaiType.Toxico]: 'from-purple-900/70 to-dark-3',
  [ZenkaiType.Terra]: 'from-yellow-900/80 to-dark-3',
  [ZenkaiType.Eletrico]: 'from-yellow-600/60 to-dark-3',
  [ZenkaiType.Mineral]: 'from-stone-800/70 to-dark-3',
};


export const ZENKAI_TYPE_TEXT_COLORS: { [key in ZenkaiType]: string } = {
  [ZenkaiType.Herbal]: 'text-green-400',
  [ZenkaiType.Fogo]: 'text-red-400',
  [ZenkaiType.Agua]: 'text-blue-400',
  [ZenkaiType.Voador]: 'text-indigo-400',
  [ZenkaiType.Noturno]: 'text-gray-300',
  [ZenkaiType.Toxico]: 'text-purple-400',
  [ZenkaiType.Terra]: 'text-amber-400',
  [ZenkaiType.Eletrico]: 'text-yellow-300',
  [ZenkaiType.Mineral]: 'text-stone-400',
};

export const ZENKAI_TYPE_BORDER_COLORS: { [key in ZenkaiType]: string } = {
    [ZenkaiType.Herbal]: 'border-green-400',
    [ZenkaiType.Fogo]: 'border-red-400',
    [ZenkaiType.Agua]: 'border-blue-400',
    [ZenkaiType.Voador]: 'border-indigo-400',
    [ZenkaiType.Noturno]: 'border-gray-300',
    [ZenkaiType.Toxico]: 'border-purple-400',
    [ZenkaiType.Terra]: 'border-amber-400',
    [ZenkaiType.Eletrico]: 'border-yellow-300',
    [ZenkaiType.Mineral]: 'border-stone-400',
};

export const TRAINER_PORTRAIT_COLORS: { [key in ZenkaiType]: string } = {
  [ZenkaiType.Herbal]: 'bg-green-500',
  [ZenkaiType.Fogo]: 'bg-red-500',
  [ZenkaiType.Agua]: 'bg-blue-500',
  [ZenkaiType.Voador]: 'bg-indigo-400',
  [ZenkaiType.Noturno]: 'bg-gray-700',
  [ZenkaiType.Toxico]: 'bg-purple-600',
  [ZenkaiType.Terra]: 'bg-yellow-700',
  [ZenkaiType.Eletrico]: 'bg-yellow-400',
  [ZenkaiType.Mineral]: 'bg-stone-500',
};


export const INITIAL_MONEY = 25000;
export const INITIAL_POPULARITY = 10;
export const GYM_WEEKLY_COST = 50;
export const EXPEDITION_COST = 5000;
export const BATTLE_WIN_MONEY = 150;
export const WEEKS_PER_SEASON = 20;
export const NUM_LEAGUES = 15;
export const ZENKAI_TRAIN_COST_BASE = 20;
export const TRAINER_TRAIN_COST_BASE = 80;
export const NUM_AVAILABLE_TRAINERS = 3;
export const TRAINER_REROLL_COST = 3000;
export const INCOME_PER_10_POPULARITY = 35;
export const ZENKAI_SELL_PRICE = 2000;