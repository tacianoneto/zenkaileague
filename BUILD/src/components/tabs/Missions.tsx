import React from 'react';
import { useGameState } from '../../hooks/useGameState';
import { SeasonalMission } from '../../types';

interface MissionsProps {
    gameState: ReturnType<typeof useGameState>;
}

const MissionCard: React.FC<{
    mission: SeasonalMission;
    onClaim: (missionId: string) => void;
    onReroll: (missionId: string) => void;
    rerollsUsed: number;
    money: number;
}> = ({ mission, onClaim, onReroll, rerollsUsed, money }) => {
    const progressPercent = mission.targetValue > 0 ? (mission.currentProgress / mission.targetValue) * 100 : 0;
    
    const rerollCost = rerollsUsed === 0 ? 0 : 2000;
    const canAffordReroll = money >= rerollCost;

    const renderButtons = () => {
        if (mission.isClaimed) {
            return <button disabled className="w-full mt-4 px-4 py-2 bg-gray-600 text-white font-bold rounded-lg cursor-not-allowed">Resgatado</button>;
        }
        if (mission.isCompleted) {
            return <button onClick={() => onClaim(mission.id)} className="w-full mt-4 px-4 py-2 bg-poke-green text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition duration-300">Resgatar Recompensa</button>;
        }
        return (
            <div className="mt-4 flex items-center gap-2">
                <button disabled className="flex-grow px-4 py-2 bg-dark-1 text-gray-400 font-bold rounded-lg cursor-not-allowed">Em Progresso</button>
                <button 
                    onClick={() => onReroll(mission.id)} 
                    disabled={!canAffordReroll}
                    className="flex-shrink-0 px-4 py-2 bg-poke-blue text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    title={!canAffordReroll ? "Dinheiro insuficiente" : ""}
                >
                    {rerollsUsed === 0 ? 'Trocar (Grátis)' : `Trocar ($${rerollCost.toLocaleString()})`}
                </button>
            </div>
        );
    };


    return (
        <div className="bg-dark-3 p-4 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
                <p className="text-lg text-light-1 mb-3 h-12">{mission.description}</p>
                <div className="w-full bg-dark-1 rounded-full h-6 relative my-2 overflow-hidden border-2 border-dark-2">
                    <div className="bg-poke-blue h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                    <span className="absolute inset-0 w-full h-full flex items-center justify-center text-xs text-white font-bold tracking-tighter">
                        {mission.currentProgress.toLocaleString()} / {mission.targetValue.toLocaleString()}
                    </span>
                </div>
                 <p className="text-center font-semibold text-poke-yellow mt-3">Recompensa: ${mission.reward.toLocaleString()}</p>
            </div>
            {renderButtons()}
        </div>
    );
};


export const Missions: React.FC<MissionsProps> = ({ gameState }) => {
    const { gameState: gs, claimMissionReward, rerollSeasonalMission } = gameState;

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-2">Missões da Temporada {gs.season}</h2>
            <p className="text-gray-400 mb-6">Complete estes objetivos antes do final da temporada para ganhar recompensas em dinheiro. Suas missões serão reiniciadas no início de uma nova temporada.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gs.seasonalMissions.map(mission => (
                    <MissionCard 
                        key={mission.id} 
                        mission={mission} 
                        onClaim={claimMissionReward} 
                        onReroll={rerollSeasonalMission}
                        rerollsUsed={gs.seasonalMissionRerollsUsed || 0}
                        money={gs.money}
                    />
                ))}
            </div>
        </div>
    );
};
