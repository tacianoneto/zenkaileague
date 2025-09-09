import React from 'react';
import { useGameState } from '../../hooks/useGameState';
import { SponsorshipDeal } from '../../types';

interface SponsorshipsProps {
    gameState: ReturnType<typeof useGameState>;
}

const SponsorIcon: React.FC<{ dealId: string }> = ({ dealId }) => {
    const icons: { [key: string]: React.ReactNode } = {
        pokemart: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.328 1.095-.828l2.91-6.5a1.125 1.125 0 00-1.095-1.428H5.698a1.125 1.125 0 00-1.096 1.428l2.91 6.5c.133.5.585.828 1.095.828z" /></svg>,
        pokenav: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>,
        silphco: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18" /></svg>,
        devoncorp: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9l-9-5.25m0 0l9 5.25" /></svg>,
        battlefrontier: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 100-13.5h9a9.75 9.75 0 100 13.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 110-13.5h9a9.75 9.75 0 110 13.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    };
    return icons[dealId] || icons.pokemart;
};


const SponsorshipCard: React.FC<{
    deal: SponsorshipDeal;
    currentPopularity: number;
    onAccept: (dealId: string) => void;
}> = ({ deal, currentPopularity, onAccept }) => {
    const isAvailable = deal.status === 'available';
    const isLocked = isAvailable && currentPopularity < deal.requiredPopularity;
    const canAccept = isAvailable && !isLocked;

    const popularityProgress = Math.min(100, (currentPopularity / deal.requiredPopularity) * 100);

    const getButton = () => {
        if (deal.status === 'active') {
            const weeksProgress = ((deal.totalWeeks - deal.weeksRemaining) / deal.totalWeeks) * 100;
            return (
                <div className="w-full mt-4 text-center">
                    <p className="text-sm font-bold text-poke-yellow">ATIVO</p>
                    <div className="w-full bg-dark-1 rounded-full h-2.5 mt-1">
                      <div className="bg-poke-yellow h-2.5 rounded-full" style={{width: `${weeksProgress}%`}}></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{deal.weeksRemaining} semanas restantes</p>
                </div>
            );
        }
        if (deal.status === 'expired') {
            return (
                 <button disabled className="w-full mt-4 px-4 py-3 bg-dark-1 text-gray-500 font-bold rounded-lg cursor-not-allowed">
                    EXPIRADO
                </button>
            )
        }
        return (
            <button
                onClick={() => onAccept(deal.id)}
                disabled={!canAccept}
                className={`w-full mt-4 px-4 py-3 text-white font-bold rounded-lg shadow-md transition duration-300 disabled:cursor-not-allowed
                    ${canAccept ? 'bg-poke-green hover:bg-green-600' : 'bg-gray-600'}
                    ${isLocked ? 'bg-poke-red opacity-50' : ''}`}
            >
                {isLocked ? 'Bloqueado' : 'Aceitar Acordo'}
            </button>
        );
    };

    return (
        <div className={`bg-dark-3 p-5 rounded-xl shadow-lg flex flex-col justify-between transition-all hover:shadow-poke-yellow/20 hover:scale-105 border border-dark-1/50`}>
            <div>
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-dark-1 rounded-lg text-poke-yellow"><SponsorIcon dealId={deal.id} /></div>
                    <h3 className="text-xl font-bold text-white leading-tight">{deal.name}</h3>
                </div>
                <p className="text-sm text-gray-300 my-2 min-h-[60px]">{deal.description}</p>
                
                <div className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between items-center bg-dark-2/50 p-2 rounded-md">
                        <span className="font-semibold text-green-400">Renda Semanal</span>
                        <span className="font-bold text-white font-mono">${deal.weeklyIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center bg-dark-2/50 p-2 rounded-md">
                        <span className="font-semibold text-gray-400">Duração</span>
                        <span className="font-bold text-white">{deal.totalWeeks} Semanas</span>
                    </div>
                </div>

                {isAvailable && (
                    <div className="mt-4">
                        <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                            <span>Requisito de Popularidade</span>
                            <span className={`font-bold ${currentPopularity >= deal.requiredPopularity ? 'text-green-400' : 'text-red-400'}`}>
                                {currentPopularity.toLocaleString()} / {deal.requiredPopularity.toLocaleString()}
                            </span>
                        </div>
                        <div className="w-full bg-dark-1 rounded-full h-2.5">
                            <div className="bg-pink-500 h-2.5 rounded-full" style={{width: `${popularityProgress}%`}}></div>
                        </div>
                    </div>
                )}
            </div>
            {getButton()}
        </div>
    );
};

export const Sponsorships: React.FC<SponsorshipsProps> = ({ gameState }) => {
    const { gameState: gs, acceptSponsorship } = gameState;
    
    const sortedSponsorships = [...gs.sponsorships].sort((a, b) => {
        if (a.status === 'active' && b.status !== 'active') return -1;
        if (a.status !== 'active' && b.status === 'active') return 1;
        if (a.status === 'available' && b.status !== 'available') return -1;
        if (a.status !== 'available' && b.status === 'available') return 1;
        return a.requiredPopularity - b.requiredPopularity;
    });

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Patrocínios & Marketing</h2>
                <p className="text-gray-400">Aumente a popularidade da sua liga para desbloquear e aceitar acordos de patrocínio lucrativos para uma fonte de renda estável.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedSponsorships.map(deal => (
                    <SponsorshipCard 
                        key={deal.id}
                        deal={deal}
                        currentPopularity={gs.popularity}
                        onAccept={acceptSponsorship}
                    />
                ))}
            </div>
        </div>
    );
};
