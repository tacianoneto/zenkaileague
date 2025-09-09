import React, { useMemo, useState } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { TypeBadge } from '../TypeBadge';
import { Zenkai, ZenkaiType, Trainer } from '../../types';
import { ZENKAI_TYPES } from '../../constants';
import { ZenkaiPortrait } from '../ZenkaiPortrait';
import { ZenkaiDetailModal } from '../ZenkaiDetailModal';

interface ZenkaisProps {
    gameState: ReturnType<typeof useGameState>;
}

type SortKey = 'name' | 'type' | 'level' | 'power' | 'assignedTo' | 'habitat' | 'forma';

const SortableHeader: React.FC<{
    label: string;
    sortKey: SortKey;
    currentSort: { key: SortKey; direction: 'asc' | 'desc' };
    setSort: (key: SortKey) => void;
    isSortable: boolean;
}> = ({ label, sortKey, currentSort, setSort, isSortable }) => {
    const isSorted = currentSort.key === sortKey;
    const directionIcon = currentSort.direction === 'asc' ? '▲' : '▼';
    
    if (!isSortable) {
        return (
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                {label}
            </th>
        );
    }
    
    return (
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
            <button onClick={() => setSort(sortKey)} className="flex items-center space-x-1 hover:text-white">
                <span>{label}</span>
                {isSorted && <span className="text-poke-yellow">{directionIcon}</span>}
            </button>
        </th>
    );
};

const LockClosedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
    </svg>
);


export const Zenkais: React.FC<ZenkaisProps> = ({ gameState }) => {
    const { gameState: gs, sellZenkai, toggleZenkaiLock } = gameState;
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({ key: 'power', direction: 'desc' });
    const [filterType, setFilterType] = useState<ZenkaiType | 'All'>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [zenkaiToSell, setZenkaiToSell] = useState<Zenkai | null>(null);
    const [selectedZenkai, setSelectedZenkai] = useState<(Zenkai & { trainer: Trainer | null }) | null>(null);
    
    const zenkaisWithAssignments = useMemo(() => {
        return gs.zenkais.map(zenkai => {
            const trainer = gs.trainers.find(t => t.zenkais.includes(zenkai.id));
            return {
                ...zenkai,
                assignedTo: trainer?.name ?? 'Não Designado',
                trainer: trainer || null,
            };
        });
    }, [gs.zenkais, gs.trainers]);

    const sortedAndFilteredZenkais = useMemo(() => {
        const filtered = zenkaisWithAssignments.filter(p => {
            const typeMatch = filterType === 'All' || p.type === filterType;
            const nameMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            return typeMatch && nameMatch;
        });
        
        return [...filtered].sort((a, b) => {
            let compareA = a[sortConfig.key];
            let compareB = b[sortConfig.key];
            
            if (compareA < compareB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (compareA > compareB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [zenkaisWithAssignments, sortConfig, filterType, searchQuery]);
    
    const handleSort = (key: SortKey) => {
        setSortConfig(prev => {
            if (prev.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key, direction: 'desc' };
        });
    };

    const handleConfirmSell = () => {
        if (zenkaiToSell) {
            sellZenkai(zenkaiToSell.id);
            setZenkaiToSell(null);
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                 <h2 className="text-3xl font-bold text-white">Seus Zenkais</h2>
                 <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                     <div className="w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Buscar por nome..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-dark-2 border border-dark-1 text-white text-sm rounded-lg focus:ring-poke-blue focus:border-poke-blue p-2 w-full md:w-48"
                        />
                    </div>
                    <div className="flex items-center space-x-2 w-full md:w-auto">
                        <label htmlFor="type-filter" className="text-sm font-medium text-gray-300">Tipo:</label>
                        <select
                            id="type-filter"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value as ZenkaiType | 'All')}
                            className="w-full bg-dark-2 border border-dark-1 text-white text-sm rounded-lg focus:ring-poke-blue focus:border-poke-blue p-2"
                        >
                            <option value="All">Todos</option>
                            {ZENKAI_TYPES.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                 </div>
            </div>
             <div className="bg-dark-3 rounded-lg shadow-lg overflow-x-auto">
                <table className="min-w-full responsive-table">
                    <thead className="bg-dark-1 hidden md:table-header-group">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Retrato</th>
                            <SortableHeader label="Nome" sortKey="name" currentSort={sortConfig} setSort={handleSort} isSortable={true} />
                            <SortableHeader label="Tipo" sortKey="type" currentSort={sortConfig} setSort={handleSort} isSortable={true} />
                            <SortableHeader label="Forma" sortKey="forma" currentSort={sortConfig} setSort={handleSort} isSortable={true} />
                            <SortableHeader label="Habitat" sortKey="habitat" currentSort={sortConfig} setSort={handleSort} isSortable={true} />
                            <SortableHeader label="Nível" sortKey="level" currentSort={sortConfig} setSort={handleSort} isSortable={true} />
                            <SortableHeader label="Poder" sortKey="power" currentSort={sortConfig} setSort={handleSort} isSortable={true} />
                            <SortableHeader label="Designado Para" sortKey="assignedTo" currentSort={sortConfig} setSort={handleSort} isSortable={true} />
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-2 md:divide-y-0">
                        {sortedAndFilteredZenkais.map(zenkai => {
                            return (
                                <tr key={zenkai.id} className="hover:bg-dark-2 cursor-pointer block md:table-row" onClick={() => setSelectedZenkai(zenkai)}>
                                    <td className="px-4 py-2 whitespace-nowrap block md:table-cell" data-label="Retrato">
                                        <ZenkaiPortrait zenkaiName={zenkai.name} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white block md:table-cell" data-label="Nome">{zenkai.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm block md:table-cell" data-label="Tipo"><TypeBadge type={zenkai.type} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 block md:table-cell" data-label="Forma">{zenkai.forma}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 block md:table-cell" data-label="Habitat">{zenkai.habitat}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 block md:table-cell" data-label="Nível">{zenkai.level}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 block md:table-cell" data-label="Poder">{zenkai.power}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 block md:table-cell" data-label="Designado Para">{zenkai.assignedTo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 block md:table-cell" data-label="Ações">
                                        <div className="flex items-center justify-end md:justify-start space-x-2">
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setZenkaiToSell(zenkai);
                                                }}
                                                disabled={zenkai.isLocked}
                                                className="px-3 py-1 bg-poke-green text-white text-xs font-bold rounded hover:bg-green-600 transition duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
                                                title={zenkai.isLocked ? "Desbloqueie para vender" : ""}
                                            >
                                                Vender
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleZenkaiLock(zenkai.id);
                                                }}
                                                className={`p-1 rounded-full hover:bg-dark-1 ${zenkai.isLocked ? 'text-poke-yellow' : 'text-gray-500'}`}
                                                title={zenkai.isLocked ? "Zenkai está bloqueado. Clique para desbloquear." : "Zenkai está desbloqueado. Clique para bloquear."}
                                            >
                                                <LockClosedIcon />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {zenkaiToSell && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-dark-2 p-6 rounded-lg shadow-2xl w-full max-w-md text-center">
                        <h3 className="text-2xl font-bold mb-4 text-poke-yellow">Confirmar Venda</h3>
                        <p className="text-gray-300 mb-6">
                            Você tem certeza que quer vender <strong className="text-white">{zenkaiToSell.name}</strong> (Nvl {zenkaiToSell.level}) por $2,000? Esta ação não pode ser desfeita.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button 
                                onClick={() => setZenkaiToSell(null)} 
                                className="px-6 py-2 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleConfirmSell} 
                                className="px-6 py-2 bg-poke-green text-white font-bold rounded-lg hover:bg-green-700"
                            >
                                Confirmar Venda
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {selectedZenkai && (
                <ZenkaiDetailModal 
                    zenkai={selectedZenkai}
                    trainer={selectedZenkai.trainer}
                    onClose={() => setSelectedZenkai(null)}
                />
            )}
        </div>
    );
};