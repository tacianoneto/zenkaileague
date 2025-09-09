import React, { useState } from 'react';
import { League, Zenkai, Trainer } from '../types';
import { ZenkaiPortrait } from './ZenkaiPortrait';
import { TypeBadge } from './TypeBadge';
import { ZenkaiDetailModal } from './ZenkaiDetailModal';
import { TrainerDetailModal } from './TrainerDetailModal';

interface LeagueDetailModalProps {
    league: League;
    onClose: () => void;
}

const getStrongestFromRoster = (roster: { trainers: Trainer[]; zenkais: Zenkai[] } | undefined): { trainers: Trainer[], zenkais: Zenkai[] } => {
    if (!roster) return { trainers: [], zenkais: [] };

    const sortedTrainers = [...roster.trainers].sort((a, b) => (b.basePower + b.level * 3) - (a.basePower + a.level * 3)).slice(0, 3);
    const sortedZenkais = [...roster.zenkais].sort((a, b) => b.power - a.power).slice(0, 6);

    return { trainers: sortedTrainers, zenkais: sortedZenkais };
};

export const LeagueDetailModal: React.FC<LeagueDetailModalProps> = ({ league, onClose }) => {
    const [inspectingZenkai, setInspectingZenkai] = useState<Zenkai | null>(null);
    const [inspectingTrainer, setInspectingTrainer] = useState<Trainer | null>(null);

    if (!league.roster) {
        return (
             <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-dark-2 p-6 rounded-lg shadow-2xl w-full max-w-lg relative">
                    <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
                    <h3 className="text-2xl font-bold mb-4 text-poke-yellow">{league.name}</h3>
                    <p className="text-gray-400">Nenhuma informação detalhada do plantel disponível para esta liga.</p>
                </div>
            </div>
        );
    }

    const { trainers, zenkais } = getStrongestFromRoster(league.roster);

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-dark-2 p-6 rounded-lg shadow-2xl w-full max-w-2xl relative">
                    <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold mb-1 text-poke-yellow">{league.name}</h3>
                        <p className="text-lg text-gray-300">Poder Total: <span className="font-bold">{league.power.toLocaleString()}</span></p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-lg mb-2 text-center text-light-1">Melhores Treinadores</h4>
                            <div className="space-y-2 bg-dark-3 p-3 rounded-lg max-h-64 overflow-y-auto">
                                {trainers.length > 0 ? trainers.map(trainer => (
                                    <button
                                        key={trainer.id}
                                        onClick={() => setInspectingTrainer(trainer)}
                                        className="w-full text-left bg-dark-1 p-2 rounded-md hover:bg-dark-1/50 transition-colors"
                                    >
                                        <div className="flex justify-between items-center">
                                            <p className="font-bold">{trainer.name} <span className="text-gray-400 text-sm font-normal">(Nvl {trainer.level})</span></p>
                                            <TypeBadge type={trainer.synergyType} />
                                        </div>
                                        <p className="text-xs text-gray-400">Poder Base: {trainer.basePower}</p>
                                    </button>
                                )) : <p className="text-sm text-center text-gray-500 italic">Nenhum treinador encontrado.</p>}
                            </div>
                        </div>
                         <div>
                            <h4 className="font-semibold text-lg mb-2 text-center text-light-1">Equipe Zenkai de Elite</h4>
                            <div className="space-y-2 bg-dark-3 p-3 rounded-lg max-h-64 overflow-y-auto">
                                {zenkais.length > 0 ? zenkais.map(zenkai => (
                                    <button
                                        key={zenkai.id}
                                        onClick={() => setInspectingZenkai(zenkai)}
                                        className="w-full text-left bg-dark-1 p-2 rounded-md flex justify-between items-center hover:bg-dark-1/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            <ZenkaiPortrait zenkaiName={zenkai.name} sizeClass="w-8 h-8" />
                                            <p className="font-medium text-light-1">{zenkai.name} <span className="text-gray-400 font-normal text-xs">(Nvl {zenkai.level})</span></p>
                                        </div>
                                        <TypeBadge type={zenkai.type} />
                                    </button>
                                )) : <p className="text-sm text-center text-gray-500 italic">Nenhum zenkai encontrado.</p>}
                            </div>
                        </div>
                    </div>

                    <button onClick={onClose} className="mt-6 w-full px-4 py-2 bg-poke-red text-white font-bold rounded-md hover:bg-red-600">
                        Fechar
                    </button>
                </div>
            </div>

            {inspectingZenkai && (
                <ZenkaiDetailModal 
                    zenkai={inspectingZenkai}
                    trainer={null}
                    onClose={() => setInspectingZenkai(null)}
                />
            )}
            {inspectingTrainer && (() => {
                const teamZenkais = league.roster!.zenkais.filter(z => inspectingTrainer.zenkais.includes(z.id));
                return (
                    <TrainerDetailModal
                        trainer={inspectingTrainer}
                        teamZenkais={teamZenkais}
                        assignedGymType={null}
                        source="ranking"
                        onClose={() => setInspectingTrainer(null)}
                    />
                );
            })()}
        </>
    );
};