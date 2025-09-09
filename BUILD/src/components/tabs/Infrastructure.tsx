import React from 'react';
import { useGameState } from '../../hooks/useGameState';
import { Upgrade } from '../../types';

interface InfrastructureProps {
    gameState: ReturnType<typeof useGameState>;
}

const UPGRADE_CATEGORIES: { category: string; upgrades: Upgrade[] }[] = [
    {
        category: 'Desenvolvimento de Zenkai e Treinador',
        upgrades: [
            {
                id: 'synergyBonus',
                name: 'Laboratório de Pesquisa de Sinergia',
                description: 'Aumenta o bônus de poder da sinergia de tipo em 10% por nível.',
                cost: 12000,
                maxLevel: 5,
            },
            {
                id: 'zenkaiDojo',
                name: 'Dojô de Treinamento Zenkai',
                description: 'Reduz o custo para treinar Zenkais em 15% por nível.',
                cost: 8000,
                maxLevel: 4,
            },
            {
                id: 'trainerProgram',
                name: 'Programa de Liderança para Treinadores',
                description: 'Reduz o custo para treinar Treinadores em 10% por nível.',
                cost: 10000,
                maxLevel: 4,
            },
            {
                id: 'battleAnalysis',
                name: 'Unidade de Análise de Batalha',
                description: 'Aumenta o XP ganho em todas as batalhas semanais em 10% por nível.',
                cost: 10000,
                maxLevel: 10,
            },
        ],
    },
    {
        category: 'Operações de Expedição',
        upgrades: [
            {
                id: 'advancedCaptureDevice',
                name: 'Dispositivo de Captura Avançado',
                description: "Aumenta o tamanho da zona de captura 'Perfeita', recompensando o timing preciso.",
                cost: 7500,
                maxLevel: 5,
            },
             {
                id: 'captureSynchronizer',
                name: 'Sincronizador de Captura',
                description: 'Aumenta o tempo que você tem para capturar um Zenkai no minigame.',
                cost: 9000,
                maxLevel: 5,
            },
            {
                id: 'scoutingGear',
                name: 'Equipamento de Exploração Avançado',
                description: 'Aumenta a chance de encontrar mais Zenkais (2 ou 3) em uma única expedição.',
                cost: 11000,
                maxLevel: 3,
            },
            {
                id: 'transportNetwork',
                name: 'Rede de Transporte Avançada',
                description: 'Reduz o custo das expedições em 10% por nível.',
                cost: 6000,
                maxLevel: 5,
            },
            {
                id: 'expeditionCenter',
                name: 'Centro de Expedição Tecnológico',
                description: 'Aumenta o nível mínimo dos Zenkais encontrados em expedições em +10 por nível.',
                cost: 15000,
                maxLevel: 5,
            },
        ],
    },
    {
        category: 'Financeiro e Marketing',
        upgrades: [
            {
                id: 'marketingOffice',
                name: 'Escritório de Marketing & Relações Públicas',
                description: 'Aumenta os ganhos de popularidade de vitórias em batalha em 10% por nível.',
                cost: 12000,
                maxLevel: 5,
            },
            {
                id: 'stadiumExpansion',
                name: 'Expansão do Estádio',
                description: 'Aumenta a renda de vitórias em batalha em 10% por nível.',
                cost: 10000,
                maxLevel: 10,
            },
            {
                id: 'merchShop',
                name: 'Loja de Mercadorias',
                description: 'Gera uma renda fixa de $500 por semana, por nível.',
                cost: 7000,
                maxLevel: 10,
            },
            {
                id: 'financialDept',
                name: 'Departamento de Planejamento Financeiro',
                description: 'Reduz todas as despesas com salários de treinadores em 10% por nível.',
                cost: 22000,
                maxLevel: 4,
            },
        ],
    },
    {
        category: 'Recrutamento',
        upgrades: [
            {
                id: 'scoutNetwork',
                name: 'Rede de Olheiros Profissionais',
                description: 'Aumenta o nível mínimo dos treinadores no "Painel de Contratação" em +2 por nível e a chance de terem uma habilidade.',
                cost: 15000,
                maxLevel: 2,
            },
        ],
    },
];

const UpgradeIcon: React.FC<{ id: string }> = ({ id }) => {
    const iconMap: { [key: string]: JSX.Element } = {
        synergyBonus: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>,
        zenkaiDojo: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" /></svg>,
        trainerProgram: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12l5.373 2.846M23 12l-5.373 2.846" /></svg>,
        battleAnalysis: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214C14.252 4.006 12.748 3.25 11.01 3.25c-1.737 0-3.242.756-4.35 1.964M15.362 5.214a8.252 8.252 0 00-4.286-1.077 8.252 8.252 0 00-4.286 1.077m0 0a8.287 8.287 0 000 11.087m0 0c1.108 1.208 2.612 1.964 4.35 1.964 1.737 0 3.242-.756 4.35-1.964m0 0a8.252 8.252 0 004.286-1.077m0 0a8.252 8.252 0 00-4.286 1.077m0 0L12 21m-2.286-15.933L12 3m0 0L14.286 5.067" /></svg>,
        advancedCaptureDevice: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M12 7.5V5.25m0 2.25l-2.25 1.313M6.343 7.5l-2.25-1.313M6.343 7.5l-2.25 1.313M6.343 7.5v2.25m11.314 0l-2.25-1.313m-2.25 1.313l-2.25-1.313m2.25-1.313V7.5m2.25 2.25l-2.25 1.313m0 6.75l2.25-1.313M17.657 16.5l-2.25-1.313m-2.25 1.313l-2.25-1.313m2.25-1.313V15" /></svg>,
        captureSynchronizer: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        scoutingGear: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.375 1.518L7.5 21L6.375 19.775a3 3 0 01-.375-1.518V17.25m6 0v1.007a3 3 0 01-.375 1.518L15 21l-1.125-1.225a3 3 0 01-.375-1.518V17.25m-6 0h6m-6 0V6.75m6 0V6.75m0 10.5l-3-1.5m3 1.5V6.75m0 0l-3 1.5m-3-1.5l3-1.5m0 0l3 1.5M9 6.75l-3 1.5" /></svg>,
        transportNetwork: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 003.375-3.375h1.5a1.125 1.125 0 011.125 1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5v.15a3.375 3.375 0 01-3.375 3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 013.375-3.375H19.5z" /></svg>,
        expeditionCenter: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>,
        marketingOffice: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" /></svg>,
        stadiumExpansion: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18" /></svg>,
        merchShop: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>,
        financialDept: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0H21m-9 6h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.095A2.25 2.25 0 016 3.845m8.25-.338a2.25 2.25 0 00-1.03-1.386m-6.42 1.386a2.25 2.25 0 011.03-1.386M3.75 12a2.25 2.25 0 012.25-2.25m8.25-3.338a2.25 2.25 0 00-1.03-1.386m-6.42 1.386a2.25 2.25 0 011.03-1.386M12 6.75A2.25 2.25 0 0114.25 9m-9 3.75a2.25 2.25 0 012.25-2.25M12 11.25a2.25 2.25 0 012.25-2.25" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25A2.25 2.25 0 019.75 9m3.375-2.625a2.25 2.25 0 00-1.03-1.386M6.75 18.75a2.25 2.25 0 012.25-2.25" /></svg>,
        scoutNetwork: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663l.001-.109m-8.381 5.624a8.962 8.962 0 011.933-5.003 8.964 8.964 0 014.185-3.324A8.995 8.995 0 0113.5 3c1.052 0 2.062.18 3.034.524" /></svg>,
        hqTraining: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 100-13.5h9a9.75 9.75 0 100 13.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 110-13.5h9a9.75 9.75 0 110 13.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    };

    return (
        <div className="w-14 h-14 p-3 bg-dark-1/50 rounded-lg text-poke-yellow flex-shrink-0">
            {iconMap[id] || <div />}
        </div>
    );
};

const LevelIndicator: React.FC<{ current: number, max: number }> = ({ current, max }) => (
    <div className="flex items-center gap-1.5 w-full">
        {Array.from({ length: max }).map((_, i) => (
            <div key={i} className={`h-2 flex-1 rounded-sm transition-colors ${i < current ? 'bg-poke-green shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-dark-1/50'}`} />
        ))}
    </div>
);

export const Infrastructure: React.FC<InfrastructureProps> = ({ gameState }) => {
    const { gameState: gs, purchaseUpgrade } = gameState;
    const hasEngineer = gs.trainers.some(t => t.trait?.id === 'engineer');

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-2">Infraestrutura da Liga</h2>
            <p className="text-gray-400 mb-6">Invista em melhorias de longo prazo para fortalecer a fundação da sua liga.</p>
            
            {hasEngineer && (
                <div className="mb-6 bg-green-900 border border-green-500 text-green-300 text-sm p-3 rounded-md text-center">
                    Um <strong>Engenheiro</strong> no seu plantel está fornecendo um <strong>desconto de 5%</strong> em todas as melhorias!
                </div>
            )}

            <div className="space-y-10">
                {UPGRADE_CATEGORIES.map(({ category, upgrades }) => (
                    <div key={category}>
                        <h3 className="text-2xl font-semibold text-white mb-4 border-b-2 border-dark-3 pb-2">{category}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {upgrades.map(upgrade => {
                                const currentLevel = gs.upgrades[upgrade.id] || 0;
                                let cost = upgrade.cost * Math.pow(2, currentLevel);
                                if (hasEngineer) {
                                    cost = Math.floor(cost * 0.95);
                                }
                                const canAfford = gs.money >= cost;
                                const isMaxLevel = currentLevel >= upgrade.maxLevel;

                                return (
                                    <div key={upgrade.id} className="bg-dark-3 p-4 rounded-lg shadow-lg flex flex-col justify-between border border-transparent hover:border-dark-1 transition-colors duration-300">
                                        <div className="flex gap-4">
                                            <UpgradeIcon id={upgrade.id} />
                                            <div className="flex-grow">
                                                <h4 className="text-lg font-bold text-poke-yellow">{upgrade.name}</h4>
                                                <p className="text-sm text-gray-300 mt-1 min-h-[40px]">{upgrade.description}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center gap-4">
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-xs font-semibold text-gray-400">NÍVEL {currentLevel}/{upgrade.maxLevel}</span>
                                                    {!isMaxLevel && (
                                                        <span className="text-xs font-semibold text-gray-400">Custo: <span className="text-light-1">${cost.toLocaleString()}</span></span>
                                                    )}
                                                </div>
                                                <LevelIndicator current={currentLevel} max={upgrade.maxLevel} />
                                            </div>
                                            <button
                                                onClick={() => purchaseUpgrade(upgrade)}
                                                disabled={!canAfford || isMaxLevel}
                                                className={`px-4 py-2 text-sm font-bold rounded-lg shadow-md transition-all duration-300 disabled:cursor-not-allowed flex-shrink-0 w-32
                                                    ${isMaxLevel ? 'bg-poke-yellow text-dark-1 cursor-default' : ''}
                                                    ${!isMaxLevel && canAfford ? 'bg-poke-green text-white hover:bg-green-600' : ''}
                                                    ${!isMaxLevel && !canAfford ? 'bg-poke-red text-white' : ''}`}
                                            >
                                                {isMaxLevel ? (
                                                    <div className="flex items-center justify-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        <span>MÁX.</span>
                                                    </div>
                                                ) : canAfford ? 'Melhorar' : 'Sem Fundos'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
