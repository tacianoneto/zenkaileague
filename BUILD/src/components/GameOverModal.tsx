import React from 'react';
import { useGameState } from '../hooks/useGameState';

interface GameOverModalProps {
    gameState: ReturnType<typeof useGameState>;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ gameState }) => {
    const { gameState: gs, restartGame } = gameState;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[100]">
            <div className="bg-dark-2 p-8 rounded-lg shadow-2xl w-full max-w-md text-center border-2 border-poke-red">
                <h2 className="text-3xl font-bold text-poke-red mb-4">Fim de Jogo</h2>
                <p className="text-lg text-light-1 mb-8">{gs.gameOverReason}</p>
                <button
                    onClick={restartGame}
                    className="px-8 py-3 bg-poke-green text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                >
                    Começar uma Nova Liga
                </button>
            </div>
        </div>
    );
};
