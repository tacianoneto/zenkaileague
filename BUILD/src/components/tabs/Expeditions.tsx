import React, { useState, useMemo } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { EXPEDITION_COST } from '../../constants';
import { Zenkai, ZenkaiType } from '../../types';
import { TypeBadge } from '../TypeBadge';
import { ZenkaiPortrait } from '../ZenkaiPortrait';
import { ZENKAI_DATA } from '../../data';
import { CaptureMinigame } from '../CaptureMinigame';

interface ExpeditionsProps {
    gameState: ReturnType<typeof useGameState>;
}

type ExpeditionStatus = 'idle' | 'exploring' | 'encounter' | 'capturing' | 'capture_result' | 'finished';

const TypeIcon: React.FC<{ type: ZenkaiType; className?: string }> = ({ type, className }) => {
    const icons: { [key in ZenkaiType]: React.ReactNode } = {
        [ZenkaiType.Herbal]: <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.89 14.11c-1.07-.38-1.9-1.38-2-2.58-.1-1.2.6-2.38 1.66-2.88.24-.12.48-.22.73-.3.44-.14.9-.22 1.36-.22.99 0 1.93.31 2.68.85.75.54 1.25 1.33 1.4 2.22.15.89-.09 1.79-.64 2.52-.55.73-1.39 1.23-2.31 1.38-.28.05-.57.07-.86.07-.5 0-.99-.09-1.46-.26z" />,
        [ZenkaiType.Fogo]: <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0117.657 18.657z" />,
        [ZenkaiType.Agua]: <path d="M12 21.147c-4.418 0-8-3.582-8-8 0-4.935 8-11.147 8-11.147s8 6.212 8 11.147c0 4.418-3.582 8-8 8z" />,
        [ZenkaiType.Voador]: <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10zM12 14.5l-3.5-3.5 1.5-1.5 2 2 4.5-4.5 1.5 1.5L12 14.5z" />,
        [ZenkaiType.Noturno]: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z m-2-9a2 2 0 104 0 2 2 0 00-4 0z" />,
        [ZenkaiType.Toxico]: <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM9 13a1 1 0 11-2 0 1 1 0 012 0zm6 0a1 1 0 11-2 0 1 1 0 012 0zm-5-5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5z" />,
        [ZenkaiType.Terra]: <path d="M12 2L2 7l10 5 10-5-10-5z m0 11.5L2 15l10 5 10-5-10-5z" />,
        [ZenkaiType.Eletrico]: <path d="M7 2v11h3v9l7-12h-4l4-8z" />,
        [ZenkaiType.Mineral]: <path d="M12 2L2 8.5l10 11.5 10-11.5L12 2z m0 2.31L19.5 8.5 12 17.69 4.5 8.5 12 4.31z" />,
    };
    return <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>{icons[type]}</svg>;
};

const habitatToTypeMap: { [key: string]: ZenkaiType } = {
    Floresta: ZenkaiType.Herbal,
    Campina: ZenkaiType.Terra,
    Aquático: ZenkaiType.Agua,
    Montanha: ZenkaiType.Mineral,
    Urbano: ZenkaiType.Eletrico,
    Glacial: ZenkaiType.Mineral,
};

const HabitatCard: React.FC<{
    habitat: string;
    onExplore: (habitat: string) => void;
    onViewZenkais: (habitat: string) => void;
    canAfford: boolean;
    expeditionCost: number;
}> = ({ habitat, onExplore, onViewZenkais, canAfford, expeditionCost }) => {
    const gradients: { [key: string]: string } = {
        Floresta: 'from-green-900/70 to-dark-3',
        Campina: 'from-yellow-900/70 to-dark-3',
        Aquático: 'from-blue-900/70 to-dark-3',
        Montanha: 'from-stone-800/70 to-dark-3',
        Urbano: 'from-gray-800/70 to-dark-3',
        Glacial: 'from-indigo-900/70 to-dark-3',
    };
    
    const habitatType = habitatToTypeMap[habitat] || ZenkaiType.Noturno;

    return (
        <div className={`bg-gradient-to-br ${gradients[habitat] || 'from-dark-3 to-dark-2'} p-6 rounded-lg shadow-lg flex flex-col justify-between relative overflow-hidden transition-all hover:scale-105 border border-white/10`}>
             <TypeIcon type={habitatType} className="absolute -bottom-8 -right-8 w-40 h-40 text-white/5 pointer-events-none" />
            
            <button
                onClick={() => onViewZenkais(habitat)}
                className="absolute top-3 right-3 z-20 px-4 py-1.5 bg-poke-blue/80 text-white text-xs font-bold rounded-full shadow-md hover:bg-blue-600 backdrop-blur-sm transition duration-300"
            >
                Ver Zenkais
            </button>

            <div className="relative z-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-poke-yellow mb-2">{habitat}</h3>
                <p className="text-sm text-gray-300 mb-4 flex-grow min-h-[40px]">Explore esta região para encontrar Zenkais únicos.</p>
                <div className="mt-auto">
                    <button
                        onClick={() => onExplore(habitat)}
                        disabled={!canAfford}
                        className="w-full px-4 py-3 bg-poke-green text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {canAfford ? `Explorar ($${expeditionCost.toLocaleString()})` : 'Dinheiro Insuficiente'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export const Expeditions: React.FC<ExpeditionsProps> = ({ gameState }) => {
    const { gameState: gs, startExpedition, attemptCapture } = gameState;
    const [status, setStatus] = useState<ExpeditionStatus>('idle');
    const [exploringHabitat, setExploringHabitat] = useState<string | null>(null);
    const [viewingHabitat, setViewingHabitat] = useState<string | null>(null);

    const [foundZenkais, setFoundZenkais] = useState<Zenkai[]>([]);
    const [currentCaptureIndex, setCurrentCaptureIndex] = useState(0);
    const [isLegendaryEncounter, setIsLegendaryEncounter] = useState(false);
    
    const [captureResults, setCaptureResults] = useState<{ zenkai: Zenkai; success: boolean; quality: string }[]>([]);
    const [lastCaptureResult, setLastCaptureResult] = useState<{ success: boolean; quality: string } | null>(null);

    const expeditionCost = useMemo(() => {
        const discount = 1 - ((gs.upgrades['transportNetwork'] || 0) * 0.1);
        return Math.floor(EXPEDITION_COST * discount);
    }, [gs.upgrades]);
    
    const canAfford = gs.money >= expeditionCost;
    const hasRecruiter = gs.trainers.some(t => t.trait?.id === 'recruiter');

    const habitats = useMemo(() => Array.from(new Set(ZENKAI_DATA.map(p => p.habitat))), []);
    const capturedZenkaiNames = useMemo(() => new Set(gs.zenkais.map(p => p.name)), [gs.zenkais]);

    const handleStartExpedition = (habitat: string) => {
        if (!canAfford || status !== 'idle') return;
        setStatus('exploring');
        setExploringHabitat(habitat);
        
        setTimeout(async () => {
            const { foundZenkais: discoveredZenkais, isLegendary } = await startExpedition(habitat);
            setFoundZenkais(discoveredZenkais);
            setIsLegendaryEncounter(isLegendary);
            setCurrentCaptureIndex(0);
            setStatus('encounter');
        }, 2500);
    };

    const handleCaptureAttempt = (quality: 'perfect' | 'good' | 'ok' | 'miss') => {
        const zenkaiToCapture = foundZenkais[currentCaptureIndex];
        const success = attemptCapture(zenkaiToCapture, quality);
        
        setCaptureResults(prev => [...prev, { zenkai: zenkaiToCapture, success, quality }]);
        setLastCaptureResult({ success, quality });
        setStatus('capture_result');
    };

    const advanceToNextCapture = () => {
        setLastCaptureResult(null);
        if (currentCaptureIndex < foundZenkais.length - 1) {
            setCurrentCaptureIndex(prev => prev + 1);
            setStatus('encounter');
        } else {
            setStatus('finished');
        }
    };
    
    const resetExpedition = () => {
        setStatus('idle');
        setExploringHabitat(null);
        setFoundZenkais([]);
        setCurrentCaptureIndex(0);
        setIsLegendaryEncounter(false);
        setCaptureResults([]);
        setLastCaptureResult(null);
    }

    const renderContent = () => {
        switch (status) {
            case 'exploring':
                return (
                    <div className="flex flex-col items-center justify-center min-h-[380px]">
                        <svg className="animate-spin h-10 w-10 text-poke-yellow mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <h3 className="text-xl font-semibold text-white">Explorando {exploringHabitat}...</h3>
                        <p className="text-gray-400 mt-2">Procurando por Zenkais selvagens!</p>
                    </div>
                );
             case 'encounter':
                const currentZenkai = foundZenkais[currentCaptureIndex];
                if (!currentZenkai) return null;
                return (
                    <div className="flex flex-col items-center justify-center min-h-[380px] text-center">
                        {isLegendaryEncounter && (
                            <h2 className="text-4xl font-bold text-poke-yellow animate-pulse mb-4">ENCONTRO LENDÁRIO!</h2>
                        )}
                        <ZenkaiPortrait zenkaiName={currentZenkai.name} sizeClass="w-32 h-32 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Um {currentZenkai.name} selvagem apareceu!</h3>
                        <button onClick={() => setStatus('capturing')} className="mt-8 px-6 py-3 bg-poke-blue text-white font-bold rounded-lg shadow-md hover:bg-blue-600">
                            Tentar Capturar
                        </button>
                    </div>
                );
            case 'capturing':
                const zenkaiToCapture = foundZenkais[currentCaptureIndex];
                return (
                    <CaptureMinigame 
                        zenkai={zenkaiToCapture}
                        onCaptureAttempt={handleCaptureAttempt}
                        isLegendary={isLegendaryEncounter && currentCaptureIndex === 0}
                        upgrades={gs.upgrades}
                    />
                );
            case 'capture_result':
                if (!lastCaptureResult) return null;
                const resultData = captureResults[captureResults.length - 1];
                const qualityTextMap = { perfect: 'Perfeito!', good: 'Bom!', ok: 'Ok', miss: 'Errou' };

                return (
                    <div className="flex flex-col items-center justify-center min-h-[380px] text-center">
                        <ZenkaiPortrait zenkaiName={resultData.zenkai.name} sizeClass="w-32 h-32 mb-4" />
                        {lastCaptureResult.success ? (
                            <h3 className="text-2xl font-bold text-green-400 animate-zoom">Pegou! {resultData.zenkai.name} foi capturado!</h3>
                        ) : (
                            <h3 className="text-2xl font-bold text-red-400 animate-shake">Ah não! O Zenkai escapou!</h3>
                        )}
                        <p className="text-gray-300 mt-2">Tentativa: <span className="font-semibold">{qualityTextMap[lastCaptureResult.quality as keyof typeof qualityTextMap]}</span></p>
                        <button onClick={advanceToNextCapture} className="mt-8 px-6 py-3 bg-poke-blue text-white font-bold rounded-lg shadow-md hover:bg-blue-600">
                            Continuar
                        </button>
                    </div>
                );
            case 'finished':
                const successfulCaptures = captureResults.filter(r => r.success);
                return (
                    <div className="flex flex-col min-h-[380px] p-4 bg-dark-3 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-poke-yellow mb-4">Relatório da Expedição: {exploringHabitat}</h3>
                        <div className="flex-grow text-left">
                            {successfulCaptures.length > 0 ? (
                                <>
                                    <p className="text-green-400 mb-4 text-center">Sucesso! Sua equipe retornou com {successfulCaptures.length} novo(s) Zenkai(s)!</p>
                                    <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                                        {successfulCaptures.map(res => (
                                            <div key={res.zenkai.id} className="bg-dark-2 p-2 rounded-md flex justify-between items-center text-sm">
                                                <div className="flex items-center gap-2">
                                                    <ZenkaiPortrait zenkaiName={res.zenkai.name} sizeClass="w-8 h-8"/>
                                                    <span><strong className="text-white">{res.zenkai.name}</strong> - Nvl {res.zenkai.level}</span>
                                                </div>
                                                <TypeBadge type={res.zenkai.type} />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p className="text-red-400 text-center my-10">A expedição acabou. Sua equipe retornou de mãos vazias de {exploringHabitat}.</p>
                            )}
                        </div>
                        <button onClick={resetExpedition} className="w-full mt-4 px-6 py-3 bg-poke-blue text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                            Voltar para os Habitats
                        </button>
                    </div>
                );
            case 'idle':
            default:
                 return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {habitats.map(habitat => (
                             <HabitatCard
                                key={habitat}
                                habitat={habitat}
                                onExplore={handleStartExpedition}
                                onViewZenkais={setViewingHabitat}
                                canAfford={canAfford}
                                expeditionCost={expeditionCost}
                            />
                        ))}
                    </div>
                );
        }
    };

    const mainContent = (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-white">Faça uma Expedição</h2>
                <p className="text-gray-400 mt-2">Selecione um habitat para explorar. Se encontrar algum Zenkai, você precisará de habilidade para capturá-lo. Cada expedição custa ${expeditionCost.toLocaleString()}.</p>
                {hasRecruiter && (
                    <div className="mt-4 bg-green-900 border border-green-500 text-green-300 text-sm p-3 rounded-md text-center max-w-lg mx-auto">
                        Um <strong>Recrutador</strong> no seu plantel está melhorando as chances da expedição!
                    </div>
                 )}
            </div>
            {renderContent()}
        </div>
    );
    
     if (status !== 'idle') {
        return (
            <div>
                 <h2 className="text-3xl font-bold text-white mb-6">Expedição em Andamento</h2>
                 <div className="max-w-md mx-auto bg-dark-3 rounded-lg p-4">
                    {renderContent()}
                 </div>
            </div>
        )
    }

    return (
        <>
            {mainContent}
            {viewingHabitat && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-dark-2 p-6 rounded-lg shadow-2xl w-full max-w-4xl relative border-2 border-dark-3">
                        <button onClick={() => setViewingHabitat(null)} className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
                        <h3 className="text-2xl font-bold mb-4 text-center text-poke-yellow">Zenkais de {viewingHabitat}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                            {ZENKAI_DATA.filter(p => p.habitat === viewingHabitat).map(zenkai => {
                                const isCaptured = capturedZenkaiNames.has(zenkai.name);
                                return (
                                    <div key={zenkai.name} className="flex flex-col items-center text-center bg-dark-3 p-2 rounded-lg">
                                        <ZenkaiPortrait zenkaiName={zenkai.name} sizeClass="w-20 h-20" isSilhouetted={!isCaptured} />
                                        <p className="font-semibold mt-2 text-sm h-10 flex items-center">{isCaptured ? zenkai.name : '???'}</p>
                                        {isCaptured ? <TypeBadge type={zenkai.type} /> : <p className="text-xs text-gray-500">- - -</p>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};