import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Zenkai } from '../types';
import { ZenkaiPortrait } from './ZenkaiPortrait';

interface CaptureMinigameProps {
    zenkai: Zenkai;
    onCaptureAttempt: (quality: 'perfect' | 'good' | 'ok' | 'miss') => void;
    isLegendary: boolean;
    upgrades: Record<string, number>;
}

// Helper functions for feedback
const getMarkerColor = (quality: 'perfect' | 'good' | 'ok' | 'miss') => {
    switch (quality) {
        case 'perfect': return '#34D399'; // emerald-400
        case 'good': return '#10B981'; // emerald-500
        case 'ok': return '#059669'; // emerald-600
        case 'miss': return '#EF4444'; // red-500
        default: return 'white';
    }
};

const getFeedbackText = (quality: 'perfect' | 'good' | 'ok' | 'miss') => {
    switch (quality) {
        case 'perfect': return 'Perfeito!';
        case 'good': return 'Bom!';
        case 'ok': return 'Ok!';
        case 'miss': return 'Errou!';
        default: return '';
    }
};


export const CaptureMinigame: React.FC<CaptureMinigameProps> = ({ zenkai, onCaptureAttempt, isLegendary, upgrades }) => {
    const [indicatorPosition, setIndicatorPosition] = useState(0);
    const [direction, setDirection] = useState<'right' | 'left'>('right');
    const [timeLeft, setTimeLeft] = useState(100); // Percentage
    const [clickResult, setClickResult] = useState<{ quality: 'perfect' | 'good' | 'ok' | 'miss', position: number } | null>(null);
    
    const attemptMade = useRef(false);
    const requestRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    
    const timerDuration = useMemo(() => {
        return 5000 + ((upgrades['captureSynchronizer'] || 0) * 1000); // 5s base + 1s per level
    }, [upgrades]);

    const { perfectZone, goodZone, okZone } = useMemo(() => {
        const center = Math.random() * 50 + 25; // Random center between 25% and 75%
        const levelPenalty = Math.max(0, (zenkai.level - 1) * 0.15); 
        const perfectBonus = (upgrades['advancedCaptureDevice'] || 0) * 1.5; 
        
        const perfectSize = Math.max(1.5, 5 - levelPenalty + perfectBonus);
        const goodSize = Math.max(3, 15 - levelPenalty);
        const okSize = Math.max(5, 25 - levelPenalty);

        return {
            perfectZone: { start: Math.max(0, center - perfectSize), end: Math.min(100, center + perfectSize) },
            goodZone: { start: Math.max(0, center - goodSize), end: Math.min(100, center + goodSize) },
            okZone: { start: Math.max(0, center - okSize), end: Math.min(100, center + okSize) },
        };
    }, [upgrades, zenkai.level]);


    const speed = isLegendary ? 0.25 : 0.15; // percentage per ms

    useEffect(() => {
        const animate = (timestamp: number) => {
            if (attemptMade.current) return;
            if (lastTimeRef.current > 0) {
                const deltaTime = timestamp - lastTimeRef.current;
                
                setIndicatorPosition(prevPosition => {
                    if (direction === 'right') {
                        const newPosition = prevPosition + speed * deltaTime;
                        if (newPosition >= 100) {
                            setDirection('left');
                            return 100;
                        }
                        return newPosition;
                    } else { // 'left'
                        const newPosition = prevPosition - speed * deltaTime;
                        if (newPosition <= 0) {
                            setDirection('right');
                            return 0;
                        }
                        return newPosition;
                    }
                });
            }
            lastTimeRef.current = timestamp;
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [direction, speed]);

    const handleClick = (forcedQuality?: 'miss') => {
        if (attemptMade.current) return;
        attemptMade.current = true;
        cancelAnimationFrame(requestRef.current);
        
        let quality: 'perfect' | 'good' | 'ok' | 'miss';
        if (forcedQuality) {
            quality = forcedQuality;
        } else {
            if (indicatorPosition >= perfectZone.start && indicatorPosition <= perfectZone.end) {
                quality = 'perfect';
            } else if (indicatorPosition >= goodZone.start && indicatorPosition <= goodZone.end) {
                quality = 'good';
            } else if (indicatorPosition >= okZone.start && indicatorPosition <= okZone.end) {
                quality = 'ok';
            } else {
                quality = 'miss';
            }
        }

        setClickResult({ quality, position: indicatorPosition });

        setTimeout(() => {
            onCaptureAttempt(quality);
        }, 1500); // Wait for feedback animation to play
    };

    useEffect(() => {
        const timerInterval = 50; // ms
        const interval = setInterval(() => {
            if (attemptMade.current) {
                clearInterval(interval);
                return;
            }
            setTimeLeft(prev => {
                const newTime = prev - (100 * timerInterval / timerDuration);
                if (newTime <= 0) {
                    clearInterval(interval);
                    if (!attemptMade.current) {
                         handleClick('miss'); // Trigger a miss if time runs out
                    }
                    return 0;
                }
                return newTime;
            });
        }, timerInterval);

        return () => clearInterval(interval);
    }, [timerDuration, onCaptureAttempt]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[380px] p-4 text-center">
            <ZenkaiPortrait zenkaiName={zenkai.name} sizeClass="w-32 h-32 mb-4" />
            <p className="text-gray-400 mb-4">Clique no momento certo para capturar!</p>

            <div className="w-full h-2 bg-dark-1 rounded-full mb-4 border border-dark-3">
                <div 
                    className="h-full bg-poke-yellow rounded-full" 
                    style={{ width: `${timeLeft}%`, transition: timeLeft < 99 ? 'width 0.05s linear' : 'none' }}
                ></div>
            </div>
            
            <div className="w-full max-w-sm">
                <div className="relative w-full h-8 bg-dark-1 rounded-full border-2 border-dark-3 shadow-inner overflow-hidden">
                    {/* Zones */}
                    <div className="absolute h-full bg-green-900/80" style={{ left: `${okZone.start}%`, width: `${okZone.end - okZone.start}%` }}></div>
                    <div className="absolute h-full bg-green-700/80" style={{ left: `${goodZone.start}%`, width: `${goodZone.end - goodZone.start}%` }}></div>
                    <div className="absolute h-full bg-green-500/90 shadow-[0_0_12px_rgba(52,211,153,0.8)]" style={{ left: `${perfectZone.start}%`, width: `${perfectZone.end - perfectZone.start}%` }}></div>
                    
                    {/* Indicator */}
                    {!clickResult && (
                        <div 
                            className="absolute top-0 h-full w-1 bg-white rounded-full shadow-lg"
                            style={{ left: `calc(${indicatorPosition}% - 2px)` }}
                        ></div>
                    )}
                    
                    {/* Click Feedback */}
                    {clickResult && (
                        <>
                            {/* Marker */}
                            <div
                                className="absolute top-[-4px] h-10 w-1.5 rounded-full shadow-lg z-10"
                                style={{
                                    left: `calc(${clickResult.position}% - 3px)`,
                                    backgroundColor: getMarkerColor(clickResult.quality),
                                    boxShadow: `0 0 8px ${getMarkerColor(clickResult.quality)}`
                                }}
                            ></div>
                            {/* Text */}
                             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-2xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] animate-feedback-zoom">
                                    {getFeedbackText(clickResult.quality)}
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
             <button
                onClick={() => handleClick()}
                disabled={!!clickResult}
                className="mt-6 px-8 py-3 bg-poke-red text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
                Capturar!
            </button>
        </div>
    );
};