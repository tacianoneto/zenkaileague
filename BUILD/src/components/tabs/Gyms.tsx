import React, { useState } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { Gym, Trainer, Zenkai, GymBattleReport, ZenkaiType, ZenkaiData } from '../../types';
import { TypeBadge } from '../TypeBadge';
import { ZenkaiPortrait } from '../ZenkaiPortrait';
import { TrainerPortrait } from '../TrainerPortrait';
import { ZENKAI_TYPE_GYM_GRADIENTS, ZENKAI_TYPE_TEXT_COLORS, ZENKAI_TYPE_BORDER_COLORS } from '../../constants';
import { TrainerDetailModal } from '../TrainerDetailModal';
import { ZENKAI_DATA } from '../../data';

interface GymsProps {
    gameState: ReturnType<typeof useGameState>;
}

interface GymCardProps {
    gym: Gym;
    trainer: Trainer | undefined;
    onSelect: () => void;
    onTrainerSelect: () => void;
    gymPower: number;
    team: Zenkai[];
    gymReport: GymBattleReport | undefined;
}

// --- Starter Selection Modal Component ---
interface StarterSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    starters: ZenkaiData[];
    onSelectStarter: (zenkaiName: string) => void;
}

const StarterCard: React.FC<{ starter: ZenkaiData; onSelect: () => void; }> = ({ starter, onSelect }) => (
    <button
        onClick={onSelect}
        className="bg-dark-3 p-4 rounded-lg shadow-lg text-center transition-all duration-300 hover:bg-dark-1 hover:ring-2 hover:ring-poke-yellow hover:scale-105"
    >
        <ZenkaiPortrait zenkaiName={starter.name} sizeClass="w-24 h-24 mx-auto" />
        <h4 className="mt-3 font-bold text-lg text-white">{starter.name}</h4>
        <div className="mt-1">
            <TypeBadge type={starter.type} />
        </div>
    </button>
);

const StarterSelectionModal: React.FC<StarterSelectionModalProps> = ({ isOpen, onClose, starters, onSelectStarter }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-2 p-6 rounded-lg shadow-2xl w-full max-w-4xl relative border-4 border-poke-yellow">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-poke-yellow mb-2">Escolha seu Zenkai Inicial!</h2>
                    <p className="text-gray-300 mb-6">Esta é uma escolha única. Selecione o Zenkai que se juntará a você em sua jornada.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                    {starters.map(starter => (
                        <StarterCard
                            key={starter.name}
                            starter={starter}
                            onSelect={() => onSelectStarter(starter.name)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
// --- End of Starter Selection Modal ---


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


const GymCard: React.FC<GymCardProps> = ({ gym, trainer, onSelect, onTrainerSelect, gymPower, team, gymReport }) => {
    const hasSynergy = trainer && trainer.synergyType === gym.type;
    const synergyClasses = hasSynergy ? 'ring-2 ring-poke-yellow/80 shadow-lg shadow-poke-yellow/40' : '';
    const gradientClass = ZENKAI_TYPE_GYM_GRADIENTS[gym.type] || 'from-dark-3 to-dark-2';
    const powerTextColor = gym.type === ZenkaiType.Eletrico ? 'text-white' : 'text-poke-yellow';

    let performanceIcon: React.ReactNode = null;
    if (gymReport && gymReport.totalBattles > 0) {
        const winRate = gymReport.wins / gymReport.totalBattles;
        if (winRate > 0.66) {
            performanceIcon = <span title={`Em alta! (${Math.round(winRate * 100)}% de vitórias)`} className="text-xl">🔥</span>;
        } else if (winRate < 0.33) {
            performanceIcon = <span title={`Com dificuldades (${Math.round(winRate * 100)}% de vitórias)`} className="text-xl">🛡️</span>;
        }
    }

    return (
        <div className={`bg-gradient-to-br ${gradientClass} p-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 flex flex-col ${synergyClasses} relative overflow-hidden border border-white/10`}>
            <TypeIcon type={gym.type} className="absolute -bottom-8 -right-8 w-40 h-40 text-white/5 pointer-events-none" />
            <div className="flex flex-col justify-between flex-grow relative z-10">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h4 className="text-lg font-bold">Ginásio de {gym.type}</h4>
                            <TypeBadge type={gym.type} />
                        </div>
                        {performanceIcon}
                    </div>
                    {trainer ? (
                        <div>
                            <div className="flex items-center gap-3 my-4">
                                <button onClick={onTrainerSelect} className="flex-shrink-0">
                                    <TrainerPortrait trainerName={trainer.name} synergyType={trainer.synergyType} sizeClass="w-16 h-16" />
                                </button>
                                <div>
                                    <p className="text-sm text-gray-400">Líder</p>
                                    <p className="font-semibold text-light-1 text-lg">{trainer.name}</p>
                                    <p className={`text-sm font-semibold ${powerTextColor} mt-1`}>Poder: {gymPower.toLocaleString()}</p>
                                </div>
                            </div>
                            {hasSynergy && (
                                <div className="flex items-center text-xs text-green-400 mb-2 font-semibold bg-green-900/50 p-1 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span>Bônus de Sinergia Ativo!</span>
                                </div>
                            )}
                            <div className="mt-2 border-t border-gray-700/50 pt-2">
                               <h5 className="text-xs text-gray-400 mb-2 font-semibold">Equipe ({team.length}/6)</h5>
                                <div className="grid grid-cols-6 gap-1">
                                    {team.map(zenkai => (
                                        <div key={zenkai.id} title={`${zenkai.name} (Lvl ${zenkai.level})`} className="relative">
                                            <ZenkaiPortrait zenkaiName={zenkai.name} sizeClass="w-full h-auto aspect-square" />
                                        </div>
                                    ))}
                                    {Array.from({ length: 6 - team.length }).map((_, i) => (
                                        <div key={`empty-${i}`} className="bg-dark-2 rounded-md aspect-square flex items-center justify-center">
                                            <span className="text-xs text-gray-600">-</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="min-h-[180px] flex flex-col justify-center items-center">
                            <p className="text-lg text-gray-500 italic">Nenhum Líder Designado</p>
                            <p className="text-sm font-semibold text-gray-600 mt-1">Poder: 0</p>
                        </div>
                    )}
                </div>
                 <button onClick={onSelect} className="w-full mt-4 px-4 py-2 bg-poke-blue text-white text-sm font-bold rounded-md hover:bg-blue-600 transition duration-200">
                    Gerenciar
                </button>
            </div>
        </div>
    );
}

export const Gyms: React.FC<GymsProps> = ({ gameState }) => {
    const { gameState: gs, assignTrainerToGym, getTeamPower, unassignTrainerFromGym, chooseStarter } = gameState;
    const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
    const [inspectingTrainer, setInspectingTrainer] = useState<Trainer | null>(null);
    const latestReport = gs.reports[0];
    const [isStarterModalOpen, setIsStarterModalOpen] = useState(false);

    // State for Drag & Drop
    const [draggedTrainerId, setDraggedTrainerId] = useState<string | null>(null);
    const [isOverDropZone, setIsOverDropZone] = useState(false);

    const handleAssignTrainer = (trainerId: string) => {
        if (selectedGym) {
            assignTrainerToGym(trainerId, selectedGym.id);
            setSelectedGym(prev => prev ? {...prev, trainerId: trainerId} : null);
        }
    };

    const handleUnassign = () => {
        if (selectedGym) {
            unassignTrainerFromGym(selectedGym.id);
            setSelectedGym(prev => prev ? {...prev, trainerId: null} : null);
        }
    }

     // Drag & Drop handlers
    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, trainerId: string) => {
        e.dataTransfer.effectAllowed = 'move';
        setDraggedTrainerId(trainerId);
    };

    const handleDragEnd = () => {
        setDraggedTrainerId(null);
        setIsOverDropZone(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (draggedTrainerId && selectedGym && selectedGym.trainerId !== draggedTrainerId) {
            handleAssignTrainer(draggedTrainerId);
        }
        setDraggedTrainerId(null);
        setIsOverDropZone(false);
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (draggedTrainerId && selectedGym?.trainerId !== draggedTrainerId) {
            e.dataTransfer.dropEffect = 'move';
        } else {
            e.dataTransfer.dropEffect = 'none';
        }
    };
    
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (draggedTrainerId && selectedGym?.trainerId !== draggedTrainerId) {
            setIsOverDropZone(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        setIsOverDropZone(false);
    };

    const currentLeader = selectedGym ? gs.trainers.find(t => t.id === selectedGym.trainerId) : null;
    const borderColorClass = selectedGym ? ZENKAI_TYPE_BORDER_COLORS[selectedGym.type] : 'border-gray-500';
    const textColorClass = selectedGym ? ZENKAI_TYPE_TEXT_COLORS[selectedGym.type] : 'text-gray-500';

    const availableTrainers = gs.trainers;

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-6">Gerenciamento de Ginásio</h2>

            {!gs.hasChosenStarter && (
                <div className="mb-6 text-center animate-pulse">
                    <button
                        onClick={() => setIsStarterModalOpen(true)}
                        className="px-8 py-4 bg-poke-yellow text-dark-1 text-xl font-bold rounded-lg shadow-lg shadow-poke-yellow/30 hover:bg-yellow-300 transition-transform transform hover:scale-105"
                    >
                        Escolha seu inicial
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {gs.gyms.map(gym => {
                    const trainer = gs.trainers.find(t => t.id === gym.trainerId);
                    const team = trainer ? gs.zenkais.filter(p => trainer.zenkais.includes(p.id)) : [];
                    const gymPower = trainer ? getTeamPower(trainer, team, gym.type) : 0;
                    const gymReport = latestReport?.gymBattleReport.find(r => r.gymId === gym.id);
                    return <GymCard 
                        key={gym.id} 
                        gym={gym} 
                        trainer={trainer} 
                        onSelect={() => setSelectedGym(gym)} 
                        onTrainerSelect={() => trainer && setInspectingTrainer(trainer)}
                        gymPower={gymPower} 
                        team={team} 
                        gymReport={gymReport} />
                })}
            </div>

            {selectedGym && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className={`bg-dark-2 p-4 md:p-6 rounded-lg shadow-2xl w-full max-w-5xl relative border-4 ${borderColorClass} max-h-[90vh] overflow-y-auto`}>
                        <button onClick={() => setSelectedGym(null)} className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                            {/* Left Column: Gym Info */}
                            <div className="lg:col-span-2 bg-dark-3 rounded-lg p-4 flex flex-col items-center text-center relative overflow-hidden">
                                <TypeIcon type={selectedGym.type} className={`absolute -bottom-8 -right-8 w-48 h-48 ${textColorClass} opacity-10`} />
                                <h3 className="text-2xl font-bold mb-1">Gerenciar</h3>
                                <h4 className={`text-4xl font-bold ${textColorClass}`}>Ginásio de {selectedGym.type}</h4>
                                
                                <div className="mt-6 w-full">
                                    <h5 className="font-semibold text-lg mb-2">Líder Atual</h5>
                                    <div
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragEnter={handleDragEnter}
                                        onDragLeave={handleDragLeave}
                                        className={`w-full transition-all duration-300 rounded-lg min-h-[290px] flex flex-col items-center justify-center ${isOverDropZone ? 'bg-poke-blue/20 ring-2 ring-poke-blue ring-dashed' : ''}`}
                                    >
                                        {isOverDropZone ? (
                                            <div className="text-poke-blue pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 mx-auto mb-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <p className="font-bold text-xl">Solte para Designar Líder</p>
                                            </div>
                                        ) : currentLeader ? (
                                            <div className="bg-dark-1 p-4 rounded-lg w-full flex flex-col items-center">
                                                <TrainerPortrait trainerName={currentLeader.name} synergyType={currentLeader.synergyType} sizeClass="w-28 h-28" />
                                                <p className="font-bold mt-3 text-2xl">{currentLeader.name}</p>
                                                <p className="text-gray-400 text-sm">(Nvl {currentLeader.level})</p>
                                                <p className="text-poke-yellow mt-3 font-semibold text-lg">Poder: {getTeamPower(currentLeader, gs.zenkais.filter(p => currentLeader.zenkais.includes(p.id)), selectedGym.type).toLocaleString()}</p>
                                                <button onClick={handleUnassign} className="mt-4 w-full px-3 py-2 bg-poke-red text-sm font-bold rounded hover:bg-red-600">
                                                    Remover Líder
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="bg-dark-1/50 p-3 rounded-lg w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-dark-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-dark-3/80 mb-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M11 3a1 1 0 10-2 0v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V3z" />
                                                </svg>
                                                <p className="text-gray-400 font-bold text-xl">Espaço Vazio</p>
                                                <p className="text-gray-500 text-sm mt-1">Arraste um treinador aqui.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Right Column: Trainer List */}
                            <div className="lg:col-span-3">
                                <h4 className="font-semibold text-2xl mb-4 text-center">Designar um Treinador</h4>
                                <ul className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                                    {availableTrainers.map(trainer => {
                                        const assignedGym = gs.gyms.find(g => g.trainerId === trainer.id);
                                        const isCurrentlyAssignedHere = assignedGym?.id === selectedGym.id;
                                        const team = gs.zenkais.filter(p => trainer.zenkais.includes(p.id));
                                        const projectedPower = getTeamPower(trainer, team, selectedGym.type);
                                        const hasSynergy = trainer.synergyType === selectedGym.type;
                                        
                                        const getButtonText = () => {
                                            if (isCurrentlyAssignedHere) return 'Designado';
                                            if (assignedGym) return 'Re-designar';
                                            return 'Designar';
                                        }
                                        
                                        const synergyAnimationClass = hasSynergy ? 'animate-[pulseGlow_2.5s_ease-in-out_infinite]' : '';
                                        const starAnimationClass = hasSynergy ? 'animate-[pulseStar_1.5s_ease-in-out_infinite]' : '';

                                        return (
                                            <li 
                                                key={trainer.id}
                                                draggable={!isCurrentlyAssignedHere}
                                                onDragStart={(e) => handleDragStart(e, trainer.id)}
                                                onDragEnd={handleDragEnd}
                                                className={`flex justify-between items-center p-3 rounded-lg transition-all duration-300 border
                                                    ${hasSynergy ? `bg-gradient-to-br from-dark-3 to-green-900/40 ${synergyAnimationClass}` : 'bg-dark-3 border-transparent'}
                                                    ${draggedTrainerId === trainer.id ? 'opacity-50 scale-95' : 'opacity-100'}
                                                    ${isCurrentlyAssignedHere ? 'cursor-not-allowed opacity-70' : 'cursor-grab active:cursor-grabbing'}
                                                `}>
                                                <div className="flex items-center gap-4">
                                                    <TrainerPortrait trainerName={trainer.name} synergyType={trainer.synergyType} sizeClass="w-14 h-14 flex-shrink-0" />
                                                    <div className="flex-grow">
                                                        <p className="font-bold text-lg text-white">{trainer.name} <span className="text-gray-400 text-base font-normal">(Nvl {trainer.level})</span></p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <TypeBadge type={trainer.synergyType} />
                                                             {hasSynergy && (
                                                                <div className="bg-green-500/20 border border-green-400 text-green-300 text-xs font-bold px-2 py-0.5 rounded-full flex items-center shadow-md">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${starAnimationClass}`} viewBox="0 0 20 20" fill="currentColor">
                                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                    </svg>
                                                                    <span>Sinergia Perfeita!</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right flex-shrink-0">
                                                    <p className="text-poke-yellow font-bold text-xl">{projectedPower.toLocaleString()}</p>
                                                    <p className="text-xs text-gray-400 -mt-1">Poder</p>
                                                    <button 
                                                        onClick={() => handleAssignTrainer(trainer.id)} 
                                                        disabled={isCurrentlyAssignedHere}
                                                        className="mt-2 px-5 py-1.5 bg-poke-green text-sm font-bold rounded-md hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
                                                    >
                                                        {getButtonText()}
                                                    </button>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {inspectingTrainer && (() => {
                const teamZenkais = gs.zenkais.filter(z => inspectingTrainer.zenkais.includes(z.id));
                const assignedGym = gs.gyms.find(g => g.trainerId === inspectingTrainer.id);

                return (
                    <TrainerDetailModal
                        trainer={inspectingTrainer}
                        teamZenkais={teamZenkais}
                        assignedGymType={assignedGym?.type || null}
                        source="gym"
                        onClose={() => setInspectingTrainer(null)}
                    />
                )
            })()}
            {isStarterModalOpen && (
                <StarterSelectionModal
                    isOpen={isStarterModalOpen}
                    onClose={() => setIsStarterModalOpen(false)}
                    starters={ZENKAI_DATA.filter(p => p.forma === 'Inicial')}
                    onSelectStarter={(name) => {
                        chooseStarter(name);
                        setIsStarterModalOpen(false);
                    }}
                />
            )}
        </div>
    );
};