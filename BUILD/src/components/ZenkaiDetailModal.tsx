import React, { useMemo, useState } from 'react';
import { Zenkai, Trainer, ZenkaiData, ZenkaiType } from '../types';
import { ZenkaiPortrait } from './ZenkaiPortrait';
import { TypeBadge } from './TypeBadge';
import { ZENKAI_DATA, ZENKAI_TYPE_MATCHUPS } from '../data';
import { ZENKAI_TYPES, ZENKAI_TYPE_BORDER_COLORS } from '../constants';

interface ZenkaiDetailModalProps {
    zenkai: Zenkai;
    trainer: Trainer | null;
    onClose: () => void;
}

const SwordIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
const BrokenShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-4.473 0-8.25 3.486-8.25 7.875 0 4.418 3.527 8.125 8.25 8.125s8.25-3.707 8.25-8.125C20.25 5.736 16.473 2.25 12 2.25zm-4.75 14.5L16.25 5" /></svg>;
const PowerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const BasePowerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

export const ZenkaiDetailModal: React.FC<ZenkaiDetailModalProps> = ({ zenkai, trainer, onClose }) => {
    
    const [previewZenkai, setPreviewZenkai] = useState<ZenkaiData | null>(null);

    const evolutionChain = useMemo(() => {
        let baseFormTemplate = ZENKAI_DATA.find(p => p.name === zenkai.name);
        if (!baseFormTemplate) return [];

        while (true) {
            const predecessor = ZENKAI_DATA.find(p => p.evolution?.to === baseFormTemplate?.name);
            if (predecessor) {
                baseFormTemplate = predecessor;
            } else {
                break;
            }
        }

        const chain: ZenkaiData[] = [];
        let currentTemplate: ZenkaiData | null = baseFormTemplate;
        while (currentTemplate) {
            chain.push(currentTemplate);
            if (currentTemplate.evolution) {
                const nextEvolutionTemplate = ZENKAI_DATA.find(p => p.name === currentTemplate.evolution!.to);
                currentTemplate = nextEvolutionTemplate || null;
            } else {
                currentTemplate = null;
            }
        }
        return chain;
    }, [zenkai.name]);

    const typeMatchups = useMemo(() => {
        const currentType = zenkai.type;
        const strongAgainst: ZenkaiType[] = [];
        const weakAgainst: ZenkaiType[] = [];

        const offensiveMatchups = ZENKAI_TYPE_MATCHUPS[currentType];
        if (offensiveMatchups) {
            for (const type in offensiveMatchups) {
                if (offensiveMatchups[type as ZenkaiType] === 2) {
                    strongAgainst.push(type as ZenkaiType);
                }
            }
        }

        for (const opponentType of ZENKAI_TYPES) {
            const matchupValue = ZENKAI_TYPE_MATCHUPS[opponentType]?.[currentType];
            if (matchupValue === 2) {
                weakAgainst.push(opponentType);
            }
        }

        return { strongAgainst, weakAgainst };
    }, [zenkai.type]);


    const xpProgress = zenkai.xpToNextLevel > 0 ? (zenkai.xp / zenkai.xpToNextLevel) * 100 : 0;
    
    const isPreviewing = !!previewZenkai;
    const displayZenkai = previewZenkai || zenkai;
    const borderColorClass = ZENKAI_TYPE_BORDER_COLORS[zenkai.type] || 'border-dark-3';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className={`bg-dark-2 p-4 md:p-8 rounded-2xl shadow-2xl w-full max-w-4xl relative border-4 ${borderColorClass} transition-colors duration-300 max-h-[90vh] overflow-y-auto`}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl leading-none z-10">&times;</button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* LEFT COLUMN: IDENTITY & EVOLUTION */}
                    <div className="flex flex-col items-center text-center">
                        <ZenkaiPortrait zenkaiName={displayZenkai.name} sizeClass="w-32 h-32 md:w-40 md:h-40" />
                        <h3 className="text-3xl font-bold mt-3 text-white">{displayZenkai.name}</h3>
                        {!isPreviewing && <p className="text-lg text-gray-400">Nível {zenkai.level}</p>}
                        {isPreviewing && (
                            <button onClick={() => setPreviewZenkai(null)} className="mt-2 px-4 py-1 bg-poke-blue text-white text-sm font-bold rounded-md hover:bg-blue-600 transition duration-200">
                                &larr; Voltar ao Original
                            </button>
                        )}
                        
                        <div className="w-full text-center mt-6">
                            <h4 className="font-semibold text-poke-yellow mb-3 text-lg">Caminho da Evolução</h4>
                            {evolutionChain.length > 1 ? (
                                <div className="bg-dark-3 p-3 rounded-lg flex flex-row items-center justify-center gap-2 flex-wrap">
                                    {evolutionChain.map((evo, index) => {
                                        const isCurrentOriginal = evo.name === zenkai.name;
                                        const isCurrentlyViewing = evo.name === displayZenkai.name;
                                        const evolutionInfo = evolutionChain[index - 1]?.evolution;

                                        return (
                                            <React.Fragment key={evo.name}>
                                                {index > 0 && evolutionInfo && (
                                                    <div className="text-center mx-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                        {evolutionInfo.level && <p className="text-xs text-gray-400 -mt-1">Nvl {evolutionInfo.level}</p>}
                                                    </div>
                                                )}
                                                <div
                                                    onClick={() => { if (evo.name !== zenkai.name) setPreviewZenkai(evo); }}
                                                    className={`flex flex-col items-center p-2 rounded-md transition-all duration-200 
                                                        ${isCurrentlyViewing ? 'bg-poke-blue/30 ring-2 ring-poke-blue' : ''}
                                                        ${isCurrentOriginal && !isPreviewing ? 'bg-dark-1' : ''}
                                                        ${evo.name !== zenkai.name ? 'cursor-pointer hover:bg-dark-1' : ''}
                                                    `}
                                                >
                                                    <ZenkaiPortrait zenkaiName={evo.name} sizeClass="w-16 h-16" />
                                                    <p className={`font-semibold text-sm mt-1 w-20 truncate text-center ${isCurrentlyViewing ? 'text-poke-yellow' : 'text-white'}`}>{evo.name}</p>
                                                </div>
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="bg-dark-3 p-3 rounded-lg">
                                    <p className="text-sm text-gray-500 italic">Este Zenkai não evolui.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: STATS & MATCHUPS */}
                    <div className="space-y-6">
                        <h4 className="text-2xl font-bold text-poke-yellow">Detalhes</h4>
                        
                        <div className="bg-dark-3 p-4 rounded-lg space-y-4">
                            {!isPreviewing && (
                                <div>
                                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                                        <span>Experiência</span>
                                        <span>{zenkai.xp.toLocaleString()} / {zenkai.xpToNextLevel.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-dark-1 rounded-full h-3.5 relative border border-dark-1/50">
                                        <div className="bg-poke-blue h-full rounded-full" style={{ width: `${xpProgress}%` }}></div>
                                    </div>
                                </div>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                                {!isPreviewing && (
                                <div className="bg-dark-1 p-3 rounded-lg flex items-center gap-3">
                                    <PowerIcon />
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase">Poder Atual</p>
                                        <p className="text-xl font-bold text-white">{zenkai.power.toLocaleString()}</p>
                                    </div>
                                </div>
                                )}
                                <div className={`bg-dark-1 p-3 rounded-lg flex items-center gap-3 ${isPreviewing ? 'col-span-2' : ''}`}>
                                    <BasePowerIcon />
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase">Poder Base</p>
                                        <p className="text-xl font-bold text-white">{displayZenkai.basePower.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-dark-1 p-3 rounded-lg space-y-2 text-sm">
                                <div className="flex justify-between items-center"><span className="text-gray-400">Tipo</span><TypeBadge type={displayZenkai.type} /></div>
                                <div className="flex justify-between items-center"><span className="text-gray-400">Habitat</span><span className="font-semibold">{displayZenkai.habitat}</span></div>
                                {!isPreviewing && (
                                    <div className="flex justify-between items-center"><span className="text-gray-400">Designado Para</span><span className="font-semibold">{trainer ? trainer.name : 'Não Designado'}</span></div>
                                )}
                            </div>
                        </div>
                        
                        {!isPreviewing && (
                            <div>
                                <h4 className="font-semibold text-poke-yellow mb-2 text-lg">Relações de Tipo</h4>
                                <div className="bg-dark-3 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-around gap-4">
                                    <div className="flex flex-col items-center gap-2 text-center flex-1">
                                        <div className="flex items-center gap-2 text-red-400 font-bold"><BrokenShieldIcon /><span>Fraco Contra</span></div>
                                        <div className="flex flex-wrap justify-center gap-1 min-h-[28px]">
                                            {typeMatchups.weakAgainst.length > 0 ? typeMatchups.weakAgainst.map(type => <TypeBadge key={type} type={type} />) : <span className="text-sm text-gray-500 italic">Nenhum</span>}
                                        </div>
                                    </div>
                                    <div className="h-px w-full sm:h-16 sm:w-px bg-dark-1"></div>
                                    <div className="flex flex-col items-center gap-2 text-center flex-1">
                                        <div className="flex items-center gap-2 text-green-400 font-bold"><SwordIcon /><span>Forte Contra</span></div>
                                        <div className="flex flex-wrap justify-center gap-1 min-h-[28px]">
                                            {typeMatchups.strongAgainst.length > 0 ? typeMatchups.strongAgainst.map(type => <TypeBadge key={type} type={type} />) : <span className="text-sm text-gray-500 italic">Nenhum</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <button onClick={onClose} className="mt-8 w-full px-4 py-3 bg-poke-red text-white text-base font-bold rounded-md hover:bg-red-600 transition-colors">
                    Fechar
                </button>
            </div>
        </div>
    );
};