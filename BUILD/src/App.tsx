

import React, { useState, useMemo } from 'react';
import { Layout } from './components/Layout';
import { HubCentral } from './components/tabs/HubCentral';
import { Gyms } from './components/tabs/Gyms';
import { Trainers } from './components/tabs/Trainers';
import { Zenkais } from './components/tabs/Zenkais';
import { Expeditions } from './components/tabs/Expeditions';
import { Training } from './components/tabs/Training';
import { Infrastructure } from './components/tabs/Infrastructure';
import { Finances } from './components/tabs/Finances';
import { Ranking } from './components/tabs/Ranking';
import { useGameState } from './hooks/useGameState';
import { GameOverModal } from './components/GameOverModal';
import { EndOfSeasonModal } from './components/EndOfSeasonModal';
import { Sponsorships } from './components/tabs/Sponsorships';
import { Missions } from './components/tabs/Missions';
import { Tab } from './types';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('Hub');
    const gameState = useGameState();

    const renderContent = () => {
        switch (activeTab) {
            case 'Hub':
                return <HubCentral gameState={gameState} />;
            case 'Gyms':
                return <Gyms gameState={gameState} />;
            case 'Trainers':
                return <Trainers gameState={gameState} />;
            case 'Zenkais':
                return <Zenkais gameState={gameState} />;
            case 'Expeditions':
                return <Expeditions gameState={gameState} />;
            case 'Training':
                return <Training gameState={gameState} />;
            case 'Missions':
                return <Missions gameState={gameState} />;
            case 'Sponsorships':
                return <Sponsorships gameState={gameState} />;
            case 'Infrastructure':
                return <Infrastructure gameState={gameState} />;
            case 'Finances':
                return <Finances gameState={gameState} />;
            case 'Ranking':
                return <Ranking gameState={gameState} />;
            default:
                return <HubCentral gameState={gameState} />;
        }
    };

    return (
        <>
            <Layout activeTab={activeTab} setActiveTab={setActiveTab} gameState={gameState}>
                {renderContent()}
            </Layout>
            {gameState.gameState.isGameOver && <GameOverModal gameState={gameState} />}
            {gameState.gameState.isEndOfSeason && <EndOfSeasonModal gameStateHook={gameState} />}
        </>
    );
};

export default App;