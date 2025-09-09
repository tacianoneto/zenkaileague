
import React, { useState, useMemo } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { Zenkai, Trainer, ZenkaiType } from '../../types';
import { TypeBadge } from '../TypeBadge';
import { ZENKAI_TYPES, TRAINER_REROLL_COST, ZENKAI_TYPE_BORDER_COLORS } from '../../constants';
import { ZenkaiPortrait } from '../ZenkaiPortrait';
import { TrainerPortrait } from '../TrainerPortrait';
import { TrainerDetailModal } from '../TrainerDetailModal';

interface TrainersProps {
    gameState: ReturnType<typeof useGameState>;
}

export const Trainers: React.FC<TrainersProps> = ({ gameState }) => {
    const { gameState: gs, assignZenkaiToTrainer, unassignZenkai, getTeamPower, hireTrainer, fireTrainer, rerollAvailableTrainers, reassignZenkaiToTrainer, calculateSynergyBonus, assignBestZenkaisToTrainer } = gameState;
    const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
    const [inspectingTrainer, setInspectingTrainer] = useState<Trainer | null>(null);
    const [dragInfo, setDragInfo] = useState<{ zenkaiId: string; sourceTrainerId: string } | null>(null);
    const [dropTargetId, setDropTargetId] = useState<string | null>(null);
    const [flashingTrainerId, setFlashingTrainerId] = useState<string | null>(null);
    
    // State for modal Drag & Drop
    const [modalDraggedZenkaiId, setModalDraggedZenkaiId] = useState<string | null>(null);
    const [modalDropTargetIndex, setModalDropTargetIndex] = useState<number | null>(null);

    const unassignedZenkais = gs.zenkais.filter(p => !gs.trainers.some(t => t.zenkais.includes(p.id)));


    const handleAssignZenkai = (zenkaiId: string) => {
        if(selectedTrainer) {
            const upToDateTrainer = gs.trainers.find(t => t.id === selectedTrainer.id);
            if(upToDateTrainer && upToDateTrainer.zenkais.length < 6) {
                assignZenkaiToTrainer(zenkaiId, selectedTrainer.id);
            } else {
                console.error("Um treinador só pode ter 6 Zenkais!");
            }
        }
    };
    
    const handleUnassignZenkai = (zenkaiId: string) => {
        unassignZenkai(zenkaiId);
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-4">Plantel de Treinadores</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gs.trainers.map(trainer => {
                        const trainerZenkais = gs.zenkais.filter(p => trainer.zenkais.includes(p.id));
                        const assignedGym = gs.gyms.find(g => g.trainerId === trainer.id);
                        const currentPower = getTeamPower(trainer, trainerZenkais, assignedGym?.type);
                        const xpProgress = trainer.xpToNextLevel > 0 ? (trainer.xp / trainer.xpToNextLevel) * 100 : 0;
                        
                        const isSourceTrainer = dragInfo?.sourceTrainerId === trainer.id;
                        const isHoveringOverTarget = dropTargetId === trainer.id;

                        let dropClasses = '';
                        let overlayContent = null;
                        let isValidDrop = false;

                        if (dragInfo && isHoveringOverTarget && !isSourceTrainer) {
                            const teamIsFull = trainer.zenkais.length >= 6;
                            if (teamIsFull) {
                                dropClasses = 'ring-2 ring-poke-red animate-shake';
                                overlayContent = (
                                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg pointer-events-none bg-red-900/50">
                                        <span className="text-white font-bold text-lg drop-shadow-lg">Equipe Cheia</span>
                                    </div>
                                );
                            } else {
                                isValidDrop = true;
                                dropClasses = 'ring-2 ring-poke-blue shadow-lg shadow-poke-blue/50';
                                overlayContent = (
                                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg pointer-events-none bg-blue-900/50">
                                        <span className="text-white font-bold text-lg drop-shadow-lg">Solte para Adicionar</span>
                                    </div>
                                );
                            }
                        }
                        
                        const flashClass = flashingTrainerId === trainer.id ? 'animate-flash' : '';

                        return (
                            <div
                                key={trainer.id}
                                className={`bg-dark-3 p-4 rounded-lg shadow-lg flex flex-col justify-between transition-all duration-200 relative ${dropClasses} ${flashClass}`}
                                onDragOver={(e) => { e.preventDefault(); if (dragInfo && dropTargetId !== trainer.id) { setDropTargetId(trainer.id); } }}
                                onDragEnter={(e) => { e.preventDefault(); if (dragInfo) setDropTargetId(trainer.id); }}
                                onDragLeave={() => setDropTargetId(null)}
                                onDrop={() => {
                                    if (isValidDrop && dragInfo) {
                                        reassignZenkaiToTrainer(dragInfo.zenkaiId, dragInfo.sourceTrainerId, trainer.id);
                                        setFlashingTrainerId(trainer.id);
                                        setTimeout(() => setFlashingTrainerId(null), 400);
                                    }
                                    setDragInfo(null);
                                    setDropTargetId(null);
                                }}
                            >
                                {overlayContent}
                                <div>
                                    <div className="flex items-center gap-4 mb-3">
                                        <button onClick={() => setInspectingTrainer(trainer)}>
                                            <TrainerPortrait trainerName={trainer.name} synergyType={trainer.synergyType} sizeClass="w-16 h-16" />
                                        </button>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                                                    {trainer.name}
                                                </h4>
                                                <p className="text-sm font-semibold text-poke-yellow whitespace-nowrap">Poder: {currentPower.toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <TypeBadge type={trainer.synergyType} />
                                                <div className={`flex items-center text-xs ${assignedGym ? 'text-gray-300' : 'text-gray-500 italic'}`}>
                                                    {assignedGym ? (
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm3 2a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1H7zm5 0a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1h-1zM7 9a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1v-1a1 1 0 00-1-1H7zm5 0a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1v-1a1 1 0 00-1-1h-1z" clipRule="evenodd" /></svg>
                                                            <span>Ginásio de {assignedGym.type}</span>
                                                        </>
                                                    ) : <span>Não Designado</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-2">
                                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                                            <span>Nível {trainer.level}</span>
                                            <span>{trainer.xp} / {trainer.xpToNextLevel} XP</span>
                                        </div>
                                        <div className="w-full bg-dark-1 rounded-full h-2">
                                            <div className="bg-poke-blue h-2 rounded-full" style={{ width: `${xpProgress}%` }}></div>
                                        </div>
                                    </div>

                                    {trainer.trait && (
                                        <div className="text-sm mt-2 group relative flex items-center">
                                            <span className="text-gray-400 mr-2">Habilidade:</span>
                                            <span className="font-semibold text-poke-blue">{trainer.trait.name}</span>
                                            <div className="absolute left-0 bottom-full mb-2 w-48 p-2 bg-dark-1 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                                                {trainer.trait.description}
                                            </div>
                                        </div>
                                    )}

                                    <div className="text-sm my-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400">Salário:</span>
                                            <span className="font-semibold">${trainer.salary > 0 ? trainer.salary.toLocaleString() : 'Nenhum'}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h5 className="text-sm font-semibold mb-2 text-gray-300">Equipe ({trainerZenkais.length}/6)</h5>
                                        <div className="space-y-1.5 mt-2">
                                            {trainerZenkais.map(zenkai => (
                                                <div
                                                    key={zenkai.id}
                                                    draggable
                                                    onDragStart={() => setDragInfo({ zenkaiId: zenkai.id, sourceTrainerId: trainer.id })}
                                                    onDragEnd={() => { setDragInfo(null); setDropTargetId(null); }}
                                                    className={`bg-dark-1 p-2 rounded-md flex justify-between items-center shadow transition-opacity cursor-grab active:cursor-grabbing ${dragInfo?.zenkaiId === zenkai.id ? 'opacity-40' : ''}`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <ZenkaiPortrait zenkaiName={zenkai.name} sizeClass="w-8 h-8" />
                                                        <span className="text-sm font-medium text-light-1">{zenkai.name} <span className="text-gray-400 font-normal text-xs">(Nvl {zenkai.level})</span></span>
                                                    </div>
                                                    <TypeBadge type={zenkai.type} />
                                                </div>
                                            ))}
                                            {Array.from({ length: 6 - trainerZenkais.length }).map((_, i) => (
                                                <div key={`empty-${i}`} className="bg-dark-2 p-2 rounded-md text-center h-[44px] flex items-center justify-center">
                                                    <span className="text-xs text-gray-500 italic">-- Vazio --</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-2 mt-6">
                                    <button onClick={() => setSelectedTrainer(trainer)} className="w-full px-4 py-2 bg-poke-blue text-white text-sm font-bold rounded-md hover:bg-blue-600 transition duration-200">
                                        Gerenciar Equipe
                                    </button>
                                    <button onClick={() => fireTrainer(trainer.id)} disabled={trainer.isInitial} className="px-4 py-2 bg-poke-red text-white text-sm font-bold rounded-md hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed">
                                        Demitir
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            <div>
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-white">Painel de Contratação</h2>
                    <button
                        onClick={rerollAvailableTrainers}
                        disabled={gs.money < TRAINER_REROLL_COST}
                        className="px-4 py-2 bg-poke-blue text-white text-sm font-bold rounded-md hover:bg-blue-600 transition duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        Atualizar (${TRAINER_REROLL_COST.toLocaleString()})
                    </button>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gs.availableForHire.map(trainer => (
                         <div key={trainer.id} className="bg-dark-3 p-4 rounded-lg shadow-lg flex flex-col justify-between">
                            <div>
                               <div className="flex items-center gap-4 mb-3">
                                    <button onClick={() => setInspectingTrainer(trainer)}>
                                        <TrainerPortrait trainerName={trainer.name} synergyType={trainer.synergyType} sizeClass="w-16 h-16" />
                                    </button>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-lg font-bold">{trainer.name}</h4>
                                            <p className="text-sm font-semibold">Poder: {getTeamPower(trainer, [])}</p>
                                        </div>
                                        <p className="text-sm text-gray-400 mt-1">Nível {trainer.level}</p>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className="text-sm text-gray-400">Sinergia:</span>
                                            <TypeBadge type={trainer.synergyType} />
                                        </div>
                                    </div>
                                </div>
                                {trainer.trait && (
                                    <div className="text-sm mt-2 group relative flex items-center">
                                        <span className="text-gray-400 mr-2">Habilidade:</span>
                                        <span className="font-semibold text-poke-blue">{trainer.trait.name}</span>
                                        <div className="absolute left-0 bottom-full mb-2 w-48 p-2 bg-dark-1 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                                            {trainer.trait.description}
                                        </div>
                                    </div>
                                )}
                                <p className="text-sm text-gray-400 mt-2">Salário: <span className="font-bold text-light-1">${trainer.salary.toLocaleString()}</span>/semana</p>
                            </div>
                            <button 
                                onClick={() => hireTrainer(trainer.id)}
                                className="w-full mt-4 px-4 py-2 bg-poke-green text-white text-sm font-bold rounded-md hover:bg-green-600"
                            >
                                Contratar
                            </button>
                        </div>
                    ))}
                 </div>
            </div>

             {selectedTrainer && (() => {
                const upToDateTrainer = gs.trainers.find(t => t.id === selectedTrainer.id);
                if (!upToDateTrainer) {
                    setTimeout(() => setSelectedTrainer(null), 0);
                    return null;
                }
                const currentTeamZenkais = gs.zenkais.filter(p => upToDateTrainer.zenkais.includes(p.id));
                const synergyBonus = calculateSynergyBonus(upToDateTrainer, currentTeamZenkais, gs.upgrades);
                const borderColorClass = ZENKAI_TYPE_BORDER_COLORS[upToDateTrainer.synergyType] || 'border-dark-1';

                return (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                        <div className={`bg-dark-2 p-4 md:p-6 rounded-lg shadow-2xl w-full max-w-6xl relative border-2 ${borderColorClass} max-h-[90vh] overflow-y-auto`}>
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-dark-3">
                                <div className="flex items-center gap-4">
                                    <TrainerPortrait trainerName={upToDateTrainer.name} synergyType={upToDateTrainer.synergyType} sizeClass="w-12 h-12 md:w-20 md:h-20" />
                                    <div>
                                        <p className="text-gray-400">Gerenciando Equipe de</p>
                                        <h3 className="text-xl md:text-3xl font-bold text-white">{upToDateTrainer.name}</h3>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedTrainer(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-semibold text-xl">Equipe Atual ({currentTeamZenkais.length}/6)</h4>
                                        <button
                                            onClick={() => assignBestZenkaisToTrainer(upToDateTrainer.id)}
                                            disabled={currentTeamZenkais.length >= 6}
                                            className="px-3 py-1.5 bg-poke-green text-white text-xs font-bold rounded-md hover:bg-green-600 transition duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
                                        >
                                            Atribuir Melhores
                                        </button>
                                    </div>
                                     <div className="text-sm text-center bg-green-900/50 border border-green-700 p-2 rounded mb-3 flex items-center justify-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        <span className="font-bold text-green-400">Bônus de Sinergia: +{synergyBonus.toLocaleString()} de Poder</span>
                                    </div>
                                    <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-2">
                                        {currentTeamZenkais.map(p => (
                                            <div key={p.id} className="flex justify-between items-center bg-dark-3 p-3 rounded-lg shadow-sm">
                                                <div className="flex items-center gap-3 flex-grow">
                                                    <ZenkaiPortrait zenkaiName={p.name} sizeClass="w-12 h-12" />
                                                    <div className="flex-grow">
                                                        <p className="font-bold text-white">{p.name} <span className="text-sm font-normal text-gray-400">(Nvl {p.level})</span></p>
                                                        <div className="flex items-center gap-3 text-xs mt-1">
                                                            <span className="text-poke-yellow font-semibold flex items-center gap-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
                                                                {p.power}
                                                            </span>
                                                            <TypeBadge type={p.type} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button onClick={() => handleUnassignZenkai(p.id)} className="flex-shrink-0 text-xs bg-poke-red px-3 py-2 rounded-md font-bold hover:bg-red-600 transition-colors">Remover</button>
                                            </div>
                                        ))}
                                        {Array.from({ length: 6 - currentTeamZenkais.length }).map((_, i) => {
                                            const isDropTarget = modalDropTargetIndex === i;
                                            return (
                                                <div
                                                    key={`empty-${i}`}
                                                    className={`flex items-center justify-center p-3 rounded-lg border-2 border-dashed h-[84px] font-semibold transition-all ${
                                                        isDropTarget ? 'border-poke-blue bg-poke-blue/20 text-poke-blue' : 'border-dark-3 text-gray-600'
                                                    }`}
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onDragEnter={(e) => {
                                                        e.preventDefault();
                                                        if (modalDraggedZenkaiId) setModalDropTargetIndex(i);
                                                    }}
                                                    onDragLeave={() => setModalDropTargetIndex(null)}
                                                    onDrop={() => {
                                                        if (modalDraggedZenkaiId) {
                                                            handleAssignZenkai(modalDraggedZenkaiId);
                                                        }
                                                        setModalDraggedZenkaiId(null);
                                                        setModalDropTargetIndex(null);
                                                    }}
                                                >
                                                    {isDropTarget ? "Solte para Adicionar" : "Espaço Vazio"}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-xl mb-3">Zenkais Disponíveis ({unassignedZenkais.length})</h4>
                                    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                                        {unassignedZenkais.length > 0 ?
                                            unassignedZenkais
                                                .sort((a, b) => {
                                                    const aHasSynergy = a.type === upToDateTrainer.synergyType;
                                                    const bHasSynergy = b.type === upToDateTrainer.synergyType;
                                                    if (aHasSynergy && !bHasSynergy) return -1;
                                                    if (!aHasSynergy && bHasSynergy) return 1;
                                                    return b.power - a.power;
                                                })
                                                .map(p => {
                                                    const hasSynergy = p.type === upToDateTrainer.synergyType;
                                                    return (
                                                        <div
                                                            key={p.id}
                                                            draggable
                                                            onDragStart={() => setModalDraggedZenkaiId(p.id)}
                                                            onDragEnd={() => {
                                                                setModalDraggedZenkaiId(null);
                                                                setModalDropTargetIndex(null);
                                                            }}
                                                            className={`group relative flex justify-between items-center bg-dark-3 p-3 rounded-lg shadow-sm transition-all duration-200 hover:bg-dark-1 cursor-grab ${modalDraggedZenkaiId === p.id ? 'opacity-40' : ''} ${hasSynergy ? 'border border-green-500 shadow-[0_0_10px_rgba(74,222,128,0.4)]' : 'border border-transparent'}`}>
                                                            <div className="flex items-center gap-3">
                                                                <ZenkaiPortrait zenkaiName={p.name} sizeClass="w-12 h-12" />
                                                                <div>
                                                                    <p className="font-bold text-white">{p.name} <span className="text-sm font-normal text-gray-400">(Nvl {p.level})</span></p>
                                                                    <div className="flex items-center gap-3 text-xs mt-1">
                                                                        <span className="text-poke-yellow font-semibold flex items-center gap-1">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
                                                                            {p.power}
                                                                        </span>
                                                                        <TypeBadge type={p.type} />
                                                                        {hasSynergy && (
                                                                            <span className="text-green-400 font-bold flex items-center gap-1">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                                                                Sinergia!
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <button onClick={() => handleAssignZenkai(p.id)} className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-xs bg-poke-green px-3 py-2 rounded-md font-bold hover:bg-green-600 transition-all transform opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-90">Adicionar</button>
                                                        </div>
                                                    );
                                                }) : <p className="text-sm text-center text-gray-500 italic p-4">Nenhum Zenkai disponível.</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}
            {inspectingTrainer && (() => {
                const source = gs.availableForHire.some(t => t.id === inspectingTrainer.id) ? 'hiringPool' : 'roster';
                const teamZenkais = source === 'roster' ? gs.zenkais.filter(z => inspectingTrainer.zenkais.includes(z.id)) : [];
                const assignedGym = gs.gyms.find(g => g.trainerId === inspectingTrainer.id);
                
                const handleHireAndClose = (trainerId: string) => {
                    hireTrainer(trainerId);
                    setInspectingTrainer(null);
                }

                return (
                    <TrainerDetailModal
                        trainer={inspectingTrainer}
                        teamZenkais={teamZenkais}
                        assignedGymType={assignedGym?.type || null}
                        source={source}
                        onClose={() => setInspectingTrainer(null)}
                        onHire={source === 'hiringPool' ? handleHireAndClose : undefined}
                    />
                )
            })()}
        </div>
    );
};
