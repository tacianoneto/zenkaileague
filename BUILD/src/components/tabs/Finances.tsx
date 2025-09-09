import React, { useState } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { GYM_WEEKLY_COST, INCOME_PER_10_POPULARITY } from '../../constants';
import { WeeklyReport } from '../../types';

interface FinancesProps {
    gameState: ReturnType<typeof useGameState>;
}

const Icon: React.FC<{ type: string; className?: string }> = ({ type, className = 'w-6 h-6' }) => {
    const icons: { [key: string]: JSX.Element } = {
        sponsorship: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-3.355a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>,
        merchandise: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>,
        popularity: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>,
        battles: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
        salaries: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663l.001-.109m-8.381 5.624a8.962 8.962 0 011.933-5.003 8.964 8.964 0 014.185-3.324A8.995 8.995 0 0113.5 3c1.052 0 2.062.18 3.034.524" /></svg>,
        maintenance: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18" /></svg>,
    };
    return (
        <div className={className}>
            {icons[type] || <div />}
        </div>
    );
};

const CashFlowChart: React.FC<{ reports: WeeklyReport[] }> = ({ reports }) => {
    const chartData = [...reports].reverse().slice(-8).map(report => {
        const income = report.income.reduce((sum, item) => sum + item.amount, 0);
        const expenses = report.expenses.reduce((sum, item) => sum + item.amount, 0);
        return { week: `T${report.season} S${report.week}`, income, expenses };
    });

    if (chartData.length === 0) {
        return (
            <div className="bg-dark-3 p-6 rounded-lg text-center text-gray-500 italic">
                Dados insuficientes para o gráfico. Jogue algumas semanas!
            </div>
        );
    }

    const maxValue = Math.max(1, ...chartData.flatMap(d => [d.income, d.expenses]));

    return (
        <div className="bg-dark-3 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-poke-yellow mb-4">Fluxo de Caixa Semanal (Últimas {chartData.length} Semanas)</h3>
            <div className="flex justify-around items-end h-64 border-l border-b border-dark-1 p-4 gap-2">
                {chartData.map(data => (
                    <div key={data.week} className="flex-1 flex flex-col items-center justify-end h-full relative group">
                        <div className="absolute -top-12 bg-dark-1 p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-32 text-center z-10">
                            <p className="font-bold text-sm">{data.week}</p>
                            <p className="text-xs text-green-400">Renda: ${data.income.toLocaleString()}</p>
                            <p className="text-xs text-red-400">Despesa: ${data.expenses.toLocaleString()}</p>
                        </div>
                        <div className="flex items-end h-full gap-1 w-full max-w-[60px]">
                            <div className="bg-green-500 rounded-t-sm w-1/2" style={{ height: `${(data.income / maxValue) * 100}%`, transition: 'height 0.5s ease-out' }} title={`Renda: $${data.income.toLocaleString()}`}></div>
                            <div className="bg-red-500 rounded-t-sm w-1/2" style={{ height: `${(data.expenses / maxValue) * 100}%`, transition: 'height 0.5s ease-out' }} title={`Despesas: $${data.expenses.toLocaleString()}`}></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">{data.week}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-4 mt-2 text-sm">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-green-500 rounded-sm"></div><span>Renda</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-red-500 rounded-sm"></div><span>Despesas</span></div>
            </div>
        </div>
    );
};

const FinancialCard: React.FC<{
    title: string;
    icon: string;
    totalAmount: number;
    items: { name: string; amount: number }[];
    isExpanded: boolean;
    onToggle: () => void;
    colorClass: string;
}> = ({ title, icon, totalAmount, items, isExpanded, onToggle, colorClass }) => (
    <div className="bg-dark-3 rounded-lg overflow-hidden">
        <button onClick={onToggle} className="w-full flex items-center justify-between p-4 bg-dark-2 hover:bg-dark-1/50 transition-colors">
            <div className="flex items-center gap-4">
                <div className={`${colorClass} bg-opacity-20 p-2 rounded-lg`}>
                    <Icon type={icon} className={`w-8 h-8 ${colorClass}`} />
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-left">{title}</h4>
                    <p className="text-xs text-gray-400 text-left">Clique para ver detalhes</p>
                </div>
            </div>
            <div className="text-right">
                <p className={`text-2xl font-bold font-mono ${colorClass}`}>${totalAmount.toLocaleString()}</p>
                <p className="text-xs text-gray-500 -mt-1">Total Est.</p>
            </div>
        </button>
        {isExpanded && (
            <div className="p-4 border-t-2 border-dark-1">
                {items.length > 0 ? (
                    <ul className="space-y-2 max-h-48 overflow-y-auto pr-2 text-sm">
                        {items.map((item, index) => (
                            <li key={index} className="flex justify-between items-center p-2 bg-dark-1/50 rounded-md">
                                <span>{item.name}</span>
                                <span className={`font-semibold font-mono ${colorClass}`}>${item.amount.toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500 italic">Nenhum item para exibir.</p>
                )}
            </div>
        )}
    </div>
);

export const Finances: React.FC<FinancesProps> = ({ gameState }) => {
    const { gameState: gs, addDebugMoney } = gameState;
    const [expandedItem, setExpandedItem] = useState<string | null>(null);

    const handleToggle = (itemId: string) => {
        setExpandedItem(prev => (prev === itemId ? null : itemId));
    };

    // --- REVENUE CALCULATION ---
    const sponsorshipItems = gs.sponsorships.filter(s => s.status === 'active').map(s => ({ name: s.name, amount: s.weeklyIncome }));
    const totalSponsorshipIncome = sponsorshipItems.reduce((sum, item) => sum + item.amount, 0);
    const popularityIncome = Math.floor(gs.popularity / 10) * INCOME_PER_10_POPULARITY;
    const merchIncome = (gs.upgrades['merchShop'] || 0) * 500;
    const battleIncome = gs.reports[0]?.income.find(i => i.source === 'Ganhos de Batalha')?.amount || 0;
    const totalEstimatedRevenue = totalSponsorshipIncome + popularityIncome + merchIncome + battleIncome;

    // --- EXPENSE CALCULATION ---
    const salaryReduction = 1 - ((gs.upgrades['financialDept'] || 0) * 0.1);
    const hasHandyman = gs.trainers.some(t => t.trait?.id === 'handyman');
    const salaryItems = gs.trainers.map(t => ({ name: t.name, amount: t.salary })); // Show pre-discount salary
    const totalSalaries = Math.floor(salaryItems.reduce((sum, item) => sum + item.amount, 0) * salaryReduction);
    
    const maintenanceItems = gs.gyms.map(gym => ({
        name: `Ginásio de ${gym.type}`,
        amount: gs.trainers.find(t => t.id === gym.trainerId)?.trait?.id === 'handyman' ? 0 : GYM_WEEKLY_COST
    }));
    const totalMaintenance = maintenanceItems.reduce((sum, item) => sum + item.amount, 0);
    const totalEstimatedExpenses = totalSalaries + totalMaintenance;

    const netTotal = totalEstimatedRevenue - totalEstimatedExpenses;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">Centro Financeiro</h2>
                 <button 
                    onClick={addDebugMoney}
                    className="px-4 py-2 bg-poke-yellow text-dark-1 text-sm font-bold rounded-lg shadow-md hover:bg-yellow-300 transition-colors"
                >
                    Debug: Adicionar $50,000
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-dark-3 p-4 rounded-lg text-center">
                    <h3 className="text-lg font-semibold text-green-400">Receita Semanal Est.</h3>
                    <p className="text-2xl font-bold font-mono">${totalEstimatedRevenue.toLocaleString()}</p>
                </div>
                 <div className="bg-dark-3 p-4 rounded-lg text-center">
                    <h3 className="text-lg font-semibold text-red-400">Despesas Semanais Est.</h3>
                    <p className="text-2xl font-bold font-mono">${totalEstimatedExpenses.toLocaleString()}</p>
                </div>
                 <div className="bg-dark-3 p-4 rounded-lg text-center">
                    <h3 className={`text-lg font-semibold ${netTotal >= 0 ? 'text-poke-yellow' : 'text-poke-red'}`}>Lucro Líquido Semanal Est.</h3>
                    <p className={`text-2xl font-bold font-mono`}>${netTotal.toLocaleString()}</p>
                </div>
            </div>
            
            <CashFlowChart reports={gs.reports} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* REVENUE COLUMN */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-green-400">Fontes de Renda</h3>
                    <FinancialCard
                        title="Patrocínios"
                        icon="sponsorship"
                        totalAmount={totalSponsorshipIncome}
                        items={sponsorshipItems}
                        isExpanded={expandedItem === 'sponsorships'}
                        onToggle={() => handleToggle('sponsorships')}
                        colorClass="text-green-400"
                    />
                    <FinancialCard
                        title="Vendas de Mercadorias"
                        icon="merchandise"
                        totalAmount={merchIncome}
                        items={merchIncome > 0 ? [{ name: `Loja de Mercadorias (Nvl ${gs.upgrades['merchShop'] || 0})`, amount: merchIncome }] : []}
                        isExpanded={expandedItem === 'merchandise'}
                        onToggle={() => handleToggle('merchandise')}
                        colorClass="text-green-400"
                    />
                    <FinancialCard
                        title="Bônus de Popularidade"
                        icon="popularity"
                        totalAmount={popularityIncome}
                        items={popularityIncome > 0 ? [{ name: `${gs.popularity.toLocaleString()} Popularidade`, amount: popularityIncome }] : []}
                        isExpanded={expandedItem === 'popularity'}
                        onToggle={() => handleToggle('popularity')}
                        colorClass="text-green-400"
                    />
                     <FinancialCard
                        title="Ganhos de Batalha"
                        icon="battles"
                        totalAmount={battleIncome}
                        items={battleIncome > 0 ? [{ name: `Ganhos da última semana`, amount: battleIncome }] : []}
                        isExpanded={expandedItem === 'battles'}
                        onToggle={() => handleToggle('battles')}
                        colorClass="text-green-400"
                    />
                </div>

                {/* EXPENSES COLUMN */}
                <div className="space-y-4">
                     <h3 className="text-xl font-bold text-red-400">Fontes de Despesa</h3>
                     <FinancialCard
                        title="Salários dos Treinadores"
                        icon="salaries"
                        totalAmount={totalSalaries}
                        items={salaryItems.filter(i => i.amount > 0)}
                        isExpanded={expandedItem === 'salaries'}
                        onToggle={() => handleToggle('salaries')}
                        colorClass="text-red-400"
                    />
                     <FinancialCard
                        title="Manutenção dos Ginásios"
                        icon="maintenance"
                        totalAmount={totalMaintenance}
                        items={maintenanceItems.filter(i => i.amount > 0)}
                        isExpanded={expandedItem === 'maintenance'}
                        onToggle={() => handleToggle('maintenance')}
                        colorClass="text-red-400"
                    />
                </div>
            </div>

        </div>
    );
};
