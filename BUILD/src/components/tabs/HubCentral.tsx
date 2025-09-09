import React from 'react';
import { useGameState } from '../../hooks/useGameState';
import { TypeBadge } from '../TypeBadge';

interface HubCentralProps {
    gameState: ReturnType<typeof useGameState>;
}

export const HubCentral: React.FC<HubCentralProps> = ({ gameState }) => {
    const { gameState: gs, advanceWeek } = gameState;
    const { reports, isProcessingWeek } = gs;

    const latestReport = reports[0];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-3xl font-bold text-white text-center md:text-left">Hub Central</h2>
                <button
                    onClick={advanceWeek}
                    disabled={isProcessingWeek}
                    className="w-full md:w-auto px-6 py-3 bg-poke-green text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    {isProcessingWeek ? (
                        <div className="flex items-center justify-center">
                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processando...
                        </div>
                    ) : (
                        `Avançar para Semana ${gs.week === 20 ? 1 : gs.week + 1}`
                    )}
                </button>
            </div>

            <div className="bg-dark-3 p-4 md:p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-poke-yellow">Último Relatório Semanal (Temporada {latestReport?.season}, Semana {latestReport?.week})</h3>
                {latestReport ? (
                    <div className="space-y-6">
                        <div>
                             <h4 className="font-bold text-lg mb-2">Resumo Semanal</h4>
                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                                {latestReport.summary.map((item, index) => {
                                    const isNetItem = item.includes('Lucro Líquido') || item.includes('Prejuízo Líquido');
                                    const colorClass = item.includes('Lucro') ? 'text-green-400' : item.includes('Prejuízo') ? 'text-red-400' : '';
                                    return (
                                        <li key={index} className={`${isNetItem ? 'font-bold' : ''} ${colorClass}`}>
                                            {item}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        
                        <div className="border-t border-dark-2 pt-4">
                            <h4 className="font-bold text-lg mb-2">Desempenho dos Ginásios</h4>
                            {latestReport.gymBattleReport && latestReport.gymBattleReport.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {latestReport.gymBattleReport.map(report => (
                                        <div key={report.gymId} className="bg-dark-2 p-3 rounded-md text-center">
                                            <div className="flex justify-center items-center gap-2">
                                                <span className="font-semibold">{report.gymType}</span>
                                                <TypeBadge type={report.gymType} />
                                            </div>
                                            <p className="text-lg font-bold">{report.wins} / {report.totalBattles}</p>
                                            <p className="text-xs text-gray-400">Vitórias</p>
                                        </div>
                                    ))}
                                </div>
                            ) : <p className="text-sm text-gray-400">Nenhuma batalha de ginásio esta semana.</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-dark-2 pt-4">
                            <div>
                                <h4 className="font-bold text-green-400">Renda</h4>
                                {latestReport.income.length > 0 ? (
                                    <ul className="text-sm">
                                        {latestReport.income.map((inc, i) => <li key={i}>{inc.source}: <span className="font-mono">${inc.amount.toLocaleString()}</span></li>)}
                                    </ul>
                                ): <p className="text-sm text-gray-400">Nenhuma renda esta semana.</p>}
                            </div>
                            <div>
                                <h4 className="font-bold text-red-400">Despesas</h4>
                                 {latestReport.expenses.length > 0 ? (
                                    <ul className="text-sm">
                                        {latestReport.expenses.map((exp, i) => <li key={i}>{exp.source}: <span className="font-mono">${exp.amount.toLocaleString()}</span></li>)}
                                    </ul>
                                 ): <p className="text-sm text-gray-400">Nenhuma despesa esta semana.</p>}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-400">Nenhum relatório ainda. Avance a semana para ver seu primeiro relatório.</p>
                )}
            </div>
            
             <div className="bg-dark-3 p-4 md:p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-poke-yellow">Relatórios Anteriores</h3>
                {reports.slice(1).length > 0 ? (
                    <div className="space-y-4">
                        {reports.slice(1).map(report => (
                             <details key={`${report.season}-${report.week}`} className="bg-dark-2 p-3 rounded">
                                <summary className="font-semibold cursor-pointer">Relatório: Temporada {report.season}, Semana {report.week}</summary>
                                <ul className="list-disc list-inside space-y-1 text-gray-300 mt-2 pl-4">
                                    {report.summary.map((item, index) => (
                                        <li key={index} className="text-sm">{item}</li>
                                    ))}
                                </ul>
                            </details>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">Nenhum relatório antigo disponível.</p>
                )}
             </div>
        </div>
    );
};