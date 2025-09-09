import React, { useState } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { League } from '../../types';
import { LeagueDetailModal } from '../LeagueDetailModal';

interface RankingProps {
    gameState: ReturnType<typeof useGameState>;
}

export const Ranking: React.FC<RankingProps> = ({ gameState }) => {
    const { gameState: gs } = gameState;
    const [selectedLeague, setSelectedLeague] = useState<League | null>(null);

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-6">Ranking da Liga</h2>
            <div className="bg-dark-3 rounded-lg shadow-lg overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-dark-1">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rank</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nome da Liga</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pontos</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Poder Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-2">
                        {gs.leagues.map((league, index) => {
                            const isClickable = !league.isPlayer;
                            return (
                                <tr 
                                    key={league.name} 
                                    className={`${league.isPlayer ? 'bg-poke-blue bg-opacity-20' : 'hover:bg-dark-2'} ${isClickable ? 'cursor-pointer' : ''}`}
                                    onClick={() => isClickable && setSelectedLeague(league)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{league.name}{league.isPlayer && ' (Você)'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{league.points.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{league.power.toLocaleString()}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {selectedLeague && (
                <LeagueDetailModal 
                    league={selectedLeague}
                    onClose={() => setSelectedLeague(null)}
                />
            )}
        </div>
    );
};
