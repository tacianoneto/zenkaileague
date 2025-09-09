import React from 'react';
import { Trainer, Zenkai, ZenkaiType } from '../types';
import { TrainerPortrait } from './TrainerPortrait';
import { ZenkaiPortrait } from './ZenkaiPortrait';
import { TypeBadge } from './TypeBadge';

interface TrainerDetailModalProps {
    trainer: Trainer;
    teamZenkais: Zenkai[];
    assignedGymType: ZenkaiType | null;
    source: 'roster' | 'hiringPool' | 'gym' | 'ranking';
    onClose: () => void;
    onHire?: (trainerId: string) => void;
}

export const TrainerDetailModal: React.FC<TrainerDetailModalProps> = ({ trainer, teamZenkais, assignedGymType, source, onClose, onHire }) => {
    const xpProgress = trainer.xpToNextLevel > 0 ? (trainer.xp / trainer.xpToNextLevel) * 100 : 0;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60]">
            <div className="bg-dark-2 p-6 rounded-lg shadow-2xl w-full max-w-2xl relative border-2 border-dark-3">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
                
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Column: Portrait and Core Info */}
                    <div className="w-full md:w-1/3 flex-shrink-0 flex flex-col items-center text-center">
                        <TrainerPortrait trainerName={trainer.name} synergyType={trainer.synergyType} sizeClass="w-32 h-32" />
                        <h3 className="text-2xl font-bold mt-2 text-white">{trainer.name}</h3>
                        <p className="text-gray-400">Nível {trainer.level}</p>
                        <div className="my-2">
                            <TypeBadge type={trainer.synergyType} />
                        </div>
                    </div>

                    {/* Right Column: Detailed Stats and Team */}
                    <div className="flex-grow space-y-4">
                        <div>
                            <div className="flex justify-between text-sm text-gray-400 mb-1">
                                <span>Experiência</span>
                                <span>{trainer.xp.toLocaleString()} / {trainer.xpToNextLevel.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-dark-1 rounded-full h-4 relative border-2 border-dark-3">
                                <div className="bg-poke-blue h-full rounded-full" style={{ width: `${xpProgress}%` }}></div>
                            </div>
                        </div>

                        <div className="bg-dark-3 p-3 rounded-lg space-y-2 text-sm">
                            {trainer.trait && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Habilidade</span>
                                    <div className="text-right">
                                        <p className="font-semibold text-poke-blue">{trainer.trait.name}</p>
                                        <p className="text-xs text-gray-500">{trainer.trait.description}</p>
                                    </div>
                                </div>
                            )}
                             <div className="flex justify-between items-center">
                                <span className="text-gray-400">Salário</span>
                                <span className="font-semibold">${trainer.salary > 0 ? trainer.salary.toLocaleString() : 'Nenhum'}</span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-gray-400">Ginásio Designado</span>
                                <span className="font-semibold">{assignedGymType ? `Ginásio de ${assignedGymType}` : 'Não Designado'}</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold text-light-1 mb-2">Equipe ({teamZenkais.length > 0 ? teamZenkais.length : trainer.zenkais.length}/6)</h4>
                            <div className="space-y-2 max-h-40 overflow-y-auto pr-2 bg-dark-3 p-2 rounded-lg">
                                {teamZenkais.length > 0 ? teamZenkais.map(zenkai => (
                                    <div key={zenkai.id} className="bg-dark-1 p-2 rounded-md flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <ZenkaiPortrait zenkaiName={zenkai.name} sizeClass="w-8 h-8"/>
                                            <p className="font-medium text-light-1">{zenkai.name} <span className="text-gray-400 font-normal text-xs">(Nvl {zenkai.level})</span></p>
                                        </div>
                                        <TypeBadge type={zenkai.type} />
                                    </div>
                                )) : <p className="text-center text-sm text-gray-500 italic">Nenhum Zenkai designado.</p>}
                            </div>
                        </div>

                    </div>
                </div>
                
                 <div className="mt-6 flex gap-4">
                    <button onClick={onClose} className="w-full px-4 py-2 bg-poke-red text-white font-bold rounded-md hover:bg-red-600">
                        Fechar
                    </button>
                    {source === 'hiringPool' && onHire && (
                        <button onClick={() => onHire(trainer.id)} className="w-full px-4 py-2 bg-poke-green text-white font-bold rounded-md hover:bg-green-600">
                            Contratar Treinador (${trainer.salary.toLocaleString()})
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};