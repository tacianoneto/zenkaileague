import React, { useState, useMemo } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { TypeBadge } from '../TypeBadge';
import { ZenkaiPortrait } from '../ZenkaiPortrait';
import { ZENKAI_TRAIN_COST_BASE, TRAINER_TRAIN_COST_BASE, ZENKAI_TYPES } from '../../constants';
import { Zenkai, Trainer, ZenkaiType } from '../../types';
import { TrainerPortrait } from '../TrainerPortrait';

interface TrainingProps {
    gameState: ReturnType<typeof useGameState>;
}

// Re-using the Gyms.tsx TypeIcon for assignment indicators
const TypeIcon: React.FC<{ type: ZenkaiType; className?: string }> = ({ type, className }) => {
    const icons: { [key in ZenkaiType]: React.ReactNode } = {
        [ZenkaiType.Herbal]: <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.89 14.11c-1.07-.38-1.9-1.38-2-2.58-.1-1.2.6-2.38 1.66-2.88.24-.12.48-.22.73-.3.44-.14.9-.22 1.36-.22.99 0 1.93.31 2.68.85.75.54 1.25 1.33 1.4 2.22.15.89-.09 1.79-.64 2.52-.55.73-1.39 1.23-2.31 1.38-.28.05-.57.07-.86.07-.5 0-.99-.09-1.46-.26z" />,
        [ZenkaiType.Fogo]: <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0117.657 18.657z" />,
        [ZenkaiType.Agua]: <path d="M12 21.147c-4.418 0-8-3.582-8-8 0-4.935 8-11.147 8-11.147s8 6.212 8 11.147c0 4.418-3.582 8-8 8z" />,
        [ZenkaiType.Voador]: <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10zM12 14.5l-3.5-3.5 1.5-1.5 2 2 4.5-4.5 1.5 1.5L12 14.5z" />,
        [ZenkaiType.Noturno]: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z m-2-9a2 2 0 104 0 2 2 0 00-4 0z" />,
        [ZenkaiType.Toxico]: <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM9 13a1 1 0 11-2 0 1 1 0 012 0zm6 0a1 1 0 11-2 0 1 1 0 012 0zm-5-5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5z" />,
        [ZenkaiType.Terra]: <path d="M12 2L2 7l10 5 10-5-10-5z m0 11.5L2 15l10 5 10-5-10-5z" />,
        [ZenkaiType.Eletrico]: <path d="M7 2v11h3v9l7-12h-4l4-8z" />,
        [ZenkaiType.Mineral]: <path d="M12 2L2 8.5l10 11.5 10-11.5L12 2z m0 2.31L19.5 8.5 12 17.69 4.5 8.5 12 4.31z" />,
    };
    return <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>{icons[type]}</svg>;
};

// Helper component for filter controls
const FilterControls: React.FC<{
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    typeFilter: ZenkaiType | 'All';
    setTypeFilter: (t: ZenkaiType | 'All') => void;
    assignmentFilter: 'All' | 'Assigned' | 'Unassigned';
    setAssignmentFilter: (f: 'All' | 'Assigned' | 'Unassigned') => void;
    sortKey: string;
    setSortKey: (k: string) => void;
    sortDirection: 'asc' | 'desc';
    setSortDirection: (d: 'asc' | 'desc') => void;
    sortOptions: { value: string; label: string }[];
    itemType: 'Zenkai' | 'Treinador';
}> = ({
    searchQuery, setSearchQuery, typeFilter, setTypeFilter,
    assignmentFilter, setAssignmentFilter, sortKey, setSortKey,
    sortDirection, setSortDirection, sortOptions, itemType
}) => (
    <div className="bg-dark-2 p-3 rounded-lg mb-4 flex flex-wrap gap-4 items-center">
        <div className="flex-grow min-w-[200px]">
            <input
                type="text"
                placeholder={`Buscar por nome de ${itemType}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-1 border border-dark-3 text-white text-sm rounded-lg p-2 focus:ring-poke-blue focus:border-poke-blue"
            />
        </div>
        <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Tipo:</label>
            <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as ZenkaiType | 'All')}
                className="bg-dark-1 border border-dark-3 text-white text-sm rounded-lg p-2 focus:ring-poke-blue focus:border-poke-blue"
            >
                <option value="All">Todos</option>
                {ZENKAI_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
        </div>
        <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Status:</label>
            <select
                value={assignmentFilter}
                onChange={(e) => setAssignmentFilter(e.target.value as 'All' | 'Assigned' | 'Unassigned')}
                className="bg-dark-1 border border-dark-3 text-white text-sm rounded-lg p-2 focus:ring-poke-blue focus:border-poke-blue"
            >
                <option value="All">Todos</option>
                <option value="Assigned">Designado</option>
                <option value="Unassigned">Não Designado</option>
            </select>
        </div>
        <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Ordenar por:</label>
            <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                className="bg-dark-1 border border-dark-3 text-white text-sm rounded-lg p-2 focus:ring-poke-blue focus:border-poke-blue"
            >
                {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            <button
                onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                className="p-2 bg-dark-1 border border-dark-3 rounded-lg hover:bg-dark-3"
            >
                {sortDirection === 'asc' ? '▲' : '▼'}
            </button>
        </div>
    </div>
);

export const Training: React.FC<TrainingProps> = ({ gameState }) => {
    const { gameState: gs, trainZenkai, trainTrainer } = gameState;
    const [activeTab, setActiveTab] = useState<'zenkais' | 'trainers'>('zenkais');
    
    // Zenkai state
    const [zenkaiSearch, setZenkaiSearch] = useState('');
    const [zenkaiTypeFilter, setZenkaiTypeFilter] = useState<ZenkaiType | 'All'>('All');
    const [zenkaiAssignmentFilter, setZenkaiAssignmentFilter] = useState<'All' | 'Assigned' | 'Unassigned'>('All');
    const [zenkaiSortKey, setZenkaiSortKey] = useState<'level' | 'power' | 'name'>('level');
    const [zenkaiSortDirection, setZenkaiSortDirection] = useState<'asc' | 'desc'>('desc');

    // Trainer state
    const [trainerSearch, setTrainerSearch] = useState('');
    const [trainerTypeFilter, setTrainerTypeFilter] = useState<ZenkaiType | 'All'>('All');
    const [trainerAssignmentFilter, setTrainerAssignmentFilter] = useState<'All' | 'Assigned' | 'Unassigned'>('All');
    const [trainerSortKey, setTrainerSortKey] = useState<'level' | 'name'>('level');
    const [trainerSortDirection, setTrainerSortDirection] = useState<'asc' | 'desc'>('desc');
    
    const getZenkaiTrainCost = (level: number, upgrades: Record<string, number>) => {
        const discount = 1 - ((upgrades['zenkaiDojo'] || 0) * 0.15);
        return Math.floor(ZENKAI_TRAIN_COST_BASE * Math.pow(level, 1.5) * discount);
    };
    
    const getTrainerTrainCost = (level: number, upgrades: Record<string, number>) => {
        const discount = 1 - ((upgrades['trainerProgram'] || 0) * 0.10);
        return Math.floor(TRAINER_TRAIN_COST_BASE * Math.pow(level, 1.8) * discount);
    };

    const filteredAndSortedZenkais = useMemo(() => {
        return gs.zenkais
            .filter(p => {
                const searchMatch = p.name.toLowerCase().includes(zenkaiSearch.toLowerCase());
                const typeMatch = zenkaiTypeFilter === 'All' || p.type === zenkaiTypeFilter;
                const isAssigned = gs.trainers.some(t => t.zenkais.includes(p.id));
                const assignmentMatch = zenkaiAssignmentFilter === 'All' ||
                    (zenkaiAssignmentFilter === 'Assigned' && isAssigned) ||
                    (zenkaiAssignmentFilter === 'Unassigned' && !isAssigned);
                return searchMatch && typeMatch && assignmentMatch;
            })
            .sort((a, b) => {
                const valA = a[zenkaiSortKey];
                const valB = b[zenkaiSortKey];
                if (valA < valB) return zenkaiSortDirection === 'asc' ? -1 : 1;
                if (valA > valB) return zenkaiSortDirection === 'asc' ? 1 : -1;
                return 0;
            });
    }, [gs.zenkais, gs.trainers, zenkaiSearch, zenkaiTypeFilter, zenkaiAssignmentFilter, zenkaiSortKey, zenkaiSortDirection]);

    const filteredAndSortedTrainers = useMemo(() => {
        return gs.trainers
            .filter(t => {
                const searchMatch = t.name.toLowerCase().includes(trainerSearch.toLowerCase());
                const typeMatch = trainerTypeFilter === 'All' || t.synergyType === trainerTypeFilter;
                const isAssigned = gs.gyms.some(g => g.trainerId === t.id);
                const assignmentMatch = trainerAssignmentFilter === 'All' ||
                    (trainerAssignmentFilter === 'Assigned' && isAssigned) ||
                    (trainerAssignmentFilter === 'Unassigned' && !isAssigned);
                return searchMatch && typeMatch && assignmentMatch;
            })
            .sort((a, b) => {
                const valA = a[trainerSortKey];
                const valB = b[trainerSortKey];
                if (valA < valB) return trainerSortDirection === 'asc' ? -1 : 1;
                if (valA > valB) return trainerSortDirection === 'asc' ? 1 : -1;
                return 0;
            });
    }, [gs.trainers, gs.gyms, trainerSearch, trainerTypeFilter, trainerAssignmentFilter, trainerSortKey, trainerSortDirection]);

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-4">Campos de Treinamento</h2>
            <p className="text-gray-400 mb-6">Invista dinheiro para treinar seus Zenkais e Treinadores, aumentando o XP deles. Eles subirão de nível quando a barra de XP estiver cheia.</p>

            {/* TABS */}
            <div className="mb-6 flex border-b-2 border-dark-3">
                <button
                    onClick={() => setActiveTab('zenkais')}
                    className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 ${
                        activeTab === 'zenkais'
                            ? 'border-b-4 border-poke-yellow text-poke-yellow'
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    Treinar Zenkais
                </button>
                <button
                    onClick={() => setActiveTab('trainers')}
                    className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 ${
                        activeTab === 'trainers'
                            ? 'border-b-4 border-poke-yellow text-poke-yellow'
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    Treinar Treinadores
                </button>
            </div>

            {/* ZENKAI CONTENT */}
            {activeTab === 'zenkais' && (
                <div>
                    <FilterControls
                        searchQuery={zenkaiSearch}
                        setSearchQuery={setZenkaiSearch}
                        typeFilter={zenkaiTypeFilter}
                        setTypeFilter={setZenkaiTypeFilter}
                        assignmentFilter={zenkaiAssignmentFilter}
                        setAssignmentFilter={setZenkaiAssignmentFilter}
                        sortKey={zenkaiSortKey}
                        setSortKey={(k) => setZenkaiSortKey(k as 'level' | 'power' | 'name')}
                        sortDirection={zenkaiSortDirection}
                        setSortDirection={setZenkaiSortDirection}
                        sortOptions={[{ value: 'level', label: 'Nível' }, { value: 'power', label: 'Poder' }, { value: 'name', label: 'Nome' }]}
                        itemType="Zenkai"
                    />
                    <div className="text-sm text-gray-400 mb-2">Mostrando {filteredAndSortedZenkais.length} de {gs.zenkais.length} Zenkais</div>
                    <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
                        {filteredAndSortedZenkais.map(zenkai => {
                            const cost = getZenkaiTrainCost(zenkai.level, gs.upgrades);
                            const canAfford = gs.money >= cost;
                            const isMaxLevel = zenkai.level >= 100;
                            const xpProgress = zenkai.xpToNextLevel > 0 ? (zenkai.xp / zenkai.xpToNextLevel) * 100 : 0;
                            const assignedTrainer = gs.trainers.find(t => t.zenkais.includes(zenkai.id));

                            let buttonText = 'Treinar';
                            let buttonColor = 'bg-poke-green hover:bg-green-600';
                            if (isMaxLevel) {
                                buttonText = 'Nível Máx.';
                                buttonColor = 'bg-poke-yellow text-dark-1';
                            } else if (!canAfford) {
                                buttonText = 'Sem Fundos';
                                buttonColor = 'bg-poke-red';
                            }

                            return (
                                <div key={zenkai.id} className="bg-dark-3 p-4 rounded-lg shadow-md flex items-center gap-4">
                                    <div className="flex-grow">
                                        <div className="flex items-start gap-4">
                                            <ZenkaiPortrait zenkaiName={zenkai.name} sizeClass="w-16 h-16" />
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-bold text-lg text-white">{zenkai.name} <span className="text-gray-400 font-normal">(Nvl {zenkai.level})</span></h4>
                                                    <p className="font-bold text-poke-yellow">Poder: {zenkai.power.toLocaleString()}</p>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <TypeBadge type={zenkai.type} />
                                                    <div className="text-xs text-gray-400 flex items-center gap-1.5">
                                                        {assignedTrainer ? (
                                                            <>
                                                                <TrainerPortrait trainerName={assignedTrainer.name} synergyType={assignedTrainer.synergyType} sizeClass="w-5 h-5" />
                                                                <span>{assignedTrainer.name}</span>
                                                            </>
                                                        ) : (
                                                            <span className="italic">Não Designado</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="w-full bg-dark-1 rounded-full h-4 relative border-2 border-dark-2">
                                                <div className="bg-poke-green h-full rounded-full transition-all" style={{ width: `${xpProgress}%` }}></div>
                                                <span className="absolute inset-0 w-full h-full flex items-center justify-center text-xs text-white font-bold tracking-tighter">
                                                    {zenkai.xp.toLocaleString()} / {zenkai.xpToNextLevel.toLocaleString()} XP
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center w-32 flex-shrink-0">
                                        <p className="text-sm text-gray-300">Custo:</p>
                                        <p className="font-bold text-lg mb-2">${cost.toLocaleString()}</p>
                                        <button 
                                            onClick={() => trainZenkai(zenkai.id)} 
                                            disabled={!canAfford || isMaxLevel}
                                            className={`w-full px-4 py-2 text-sm font-bold rounded-md shadow transition-colors disabled:cursor-not-allowed ${buttonColor}`}
                                        >
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            
            {/* TRAINER CONTENT */}
            {activeTab === 'trainers' && (
                <div>
                    <FilterControls
                        searchQuery={trainerSearch}
                        setSearchQuery={setTrainerSearch}
                        typeFilter={trainerTypeFilter}
                        setTypeFilter={setTrainerTypeFilter}
                        assignmentFilter={trainerAssignmentFilter}
                        setAssignmentFilter={setTrainerAssignmentFilter}
                        sortKey={trainerSortKey}
                        setSortKey={(k) => setTrainerSortKey(k as 'level' | 'name')}
                        sortDirection={trainerSortDirection}
                        setSortDirection={setTrainerSortDirection}
                        sortOptions={[{ value: 'level', label: 'Nível' }, { value: 'name', label: 'Nome' }]}
                        itemType="Treinador"
                    />
                    <div className="text-sm text-gray-400 mb-2">Mostrando {filteredAndSortedTrainers.length} de {gs.trainers.length} Treinadores</div>
                     <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
                        {filteredAndSortedTrainers.map(trainer => {
                            const cost = getTrainerTrainCost(trainer.level, gs.upgrades);
                            const canAfford = gs.money >= cost;
                            const isMaxLevel = trainer.level >= 20;
                            const xpProgress = trainer.xpToNextLevel > 0 ? (trainer.xp / trainer.xpToNextLevel) * 100 : 0;
                            const assignedGym = gs.gyms.find(g => g.trainerId === trainer.id);

                            let buttonText = 'Treinar';
                            let buttonColor = 'bg-poke-green hover:bg-green-600';
                            if (isMaxLevel) {
                                buttonText = 'Nível Máx.';
                                buttonColor = 'bg-poke-yellow text-dark-1';
                            } else if (!canAfford) {
                                buttonText = 'Sem Fundos';
                                buttonColor = 'bg-poke-red';
                            }

                            return (
                                <div key={trainer.id} className="bg-dark-3 p-4 rounded-lg shadow-md flex items-center gap-4">
                                    <div className="flex-grow">
                                        <div className="flex items-start gap-4">
                                            <TrainerPortrait trainerName={trainer.name} synergyType={trainer.synergyType} sizeClass="w-16 h-16" />
                                            <div className="flex-grow">
                                                <h4 className="font-bold text-lg text-white">{trainer.name} <span className="text-gray-400 font-normal">(Nvl {trainer.level})</span></h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <TypeBadge type={trainer.synergyType} />
                                                    <div className="text-xs text-gray-400 flex items-center gap-1.5">
                                                        {assignedGym ? (
                                                            <>
                                                                <TypeIcon type={assignedGym.type} className="w-4 h-4" />
                                                                <span>Ginásio de {assignedGym.type}</span>
                                                            </>
                                                        ) : (
                                                            <span className="italic">Não Designado</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="w-full bg-dark-1 rounded-full h-4 relative border-2 border-dark-2">
                                                <div className="bg-poke-blue h-full rounded-full transition-all" style={{ width: `${xpProgress}%` }}></div>
                                                <span className="absolute inset-0 w-full h-full flex items-center justify-center text-xs text-white font-bold tracking-tighter">
                                                    {trainer.xp.toLocaleString()} / {trainer.xpToNextLevel.toLocaleString()} XP
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center w-32 flex-shrink-0">
                                        <p className="text-sm text-gray-300">Custo:</p>
                                        <p className="font-bold text-lg mb-2">${cost.toLocaleString()}</p>
                                        <button 
                                            onClick={() => trainTrainer(trainer.id)} 
                                            disabled={!canAfford || isMaxLevel}
                                            className={`w-full px-4 py-2 text-sm font-bold rounded-md shadow transition-colors disabled:cursor-not-allowed ${buttonColor}`}
                                        >
                                            {buttonText}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
