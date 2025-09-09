import React, { ReactNode } from 'react';
import { GameState, Tab } from '../types';
import { StatCard } from './StatCard';
import { NotificationBell } from './NotificationBell';

interface LayoutProps {
    children: ReactNode;
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
    gameState: { 
        gameState: GameState,
        markNotificationAsRead: (id: string) => void,
        markAllNotificationsAsRead: () => void,
        clearReadNotifications: () => void,
    };
}

const NavItem: React.FC<{
    label: Tab;
    activeTab: Tab;
    onClick: (tab: Tab) => void;
    icon: ReactNode;
}> = ({ label, activeTab, onClick, icon }) => (
    <button
        onClick={() => onClick(label)}
        className={`nav-item flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg 
            ${activeTab === label
                ? 'active'
                : 'text-gray-300 hover:bg-dark-3 hover:text-white'
        }`}
    >
        <span className="mr-3">{icon}</span>
        {label}
    </button>
);

const BottomNavItem: React.FC<{
    label: Tab;
    activeTab: Tab;
    onClick: (tab: Tab) => void;
    icon: ReactNode;
    translatedLabel: string;
}> = ({ label, activeTab, onClick, icon, translatedLabel }) => (
    <button
        onClick={() => onClick(label)}
        className={`bottom-nav-item ${activeTab === label ? 'active' : ''}`}
    >
        {icon}
        <span className="mt-1">{translatedLabel}</span>
    </button>
);


export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, gameState }) => {
    const { money, popularity, week, season, notifications } = gameState.gameState;
    const { markNotificationAsRead, markAllNotificationsAsRead, clearReadNotifications } = gameState;
    const playerLeague = gameState.gameState.leagues.find(l => l.isPlayer);
    const totalPower = playerLeague?.power || 0;

    const navTranslations: { [key in Tab]: string } = {
        Hub: 'Hub',
        Missions: 'Missões',
        Gyms: 'Ginásios',
        Trainers: 'Treinadores',
        Zenkais: 'Zenkais',
        Infrastructure: 'Infraestrutura',
        Expeditions: 'Expedições',
        Training: 'Treinamento',
        Sponsorships: 'Patrocínios',
        Finances: 'Finanças',
        Ranking: 'Ranking',
    };

    const icons = {
      Hub: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>,
      Gyms: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm3 2a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1H7zm5 0a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1h-1zM7 9a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1v-1a1 1 0 00-1-1H7zm5 0a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1v-1a1 1 0 00-1-1h-1z" clipRule="evenodd" /></svg>,
      Trainers: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>,
      Zenkais: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.5 10a.5.5 0 011 0v1a.5.5 0 01-1 0v-1zM10 12a2 2 0 110-4 2 2 0 010 4zm3.5-1a.5.5 0 010 1h-1a.5.5 0 010-1h1z" /></svg>,
      Expeditions: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.527-1.973 6.012 6.012 0 012.706 1.912 6.012 6.012 0 01-1.912 2.706C13.488 12.27 13.026 12 12.5 12a1.5 1.5 0 01-1.5-1.5V10a2 2 0 00-4 0 2 2 0 01-1.527 1.973 6.012 6.012 0 01-2.706-1.912z" clipRule="evenodd" /></svg>,
      Training: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>,
      Missions: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 00-1 1v11a1 1 0 001 1h10a1 1 0 001-1V3a1 1 0 00-1-1H5zm9 3H6v1h8V5zm0 2H6v1h8V7zm0 2H6v1h8V9zm-2 2H6v1h6v-1z" clipRule="evenodd" /></svg>,
      Sponsorships: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8.433 7.418c.158-.103.346-.196.567-.267v1.698a2.5 2.5 0 00-1.162-.328zM11 12.849v-1.698c.22.071.409.164.567.267a2.5 2.5 0 001.162.328z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2-8a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" /></svg>,
      Infrastructure: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm15-10a1 1 0 00-1-1h-.01a1 1 0 100 2h.01a1 1 0 001-1z" clipRule="evenodd" /><path d="M12 2.252A8.014 8.014 0 0117.748 10 8.014 8.014 0 0112 17.748 8.014 8.014 0 016.252 10 8.014 8.014 0 0112 2.252z" /></svg>,
      Finances: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8.433 7.418c.158-.103.346-.196.567-.267v1.698a2.5 2.5 0 00-1.162-.328zM11 12.849v-1.698c.22.071.409.164.567.267a2.5 2.5 0 001.162.328z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" /></svg>,
      Ranking: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.94 1.94a1 1 0 01.12 1.399l-1 2A1 1 0 0110 6H7a1 1 0 01-1-1V4a1 1 0 011-1h2a1 1 0 01.94.66L11.94 1.94zM10 8a1 1 0 011 1v2a1 1 0 01-1 1H8a1 1 0 01-1-1V9a1 1 0 011-1h2zm6.94 1.94a1 1 0 00-.12-1.399l-1-2A1 1 0 0015 8h-3a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 00.94-.66L16.94 9.94zM5 13a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-1 1H6a1 1 0 01-1-1v-1zm10 0a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1z" clipRule="evenodd" /></svg>,
    };

    const navItems: Tab[] = ['Hub', 'Missions', 'Gyms', 'Trainers', 'Zenkais', 'Infrastructure', 'Expeditions', 'Training', 'Sponsorships', 'Finances', 'Ranking'];
    
    const statIcons = {
        money: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>,
        popularity: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
        power: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
        week: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
        season: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    };

    return (
        <div className="flex h-screen bg-dark-2">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 sidebar-gradient p-4 flex-col border-r border-dark-3/50">
                <h1 className="text-poke-yellow text-2xl font-orbitron font-bold mb-6 text-center">Zenkai League</h1>
                <nav className="flex-grow space-y-2">
                    {navItems.map(tab => (
                       <NavItem key={tab} label={navTranslations[tab] as Tab} activeTab={navTranslations[activeTab] as Tab} onClick={() => setActiveTab(tab)} icon={icons[tab]} />
                    ))}
                </nav>
            </aside>

            {/* Mobile Bottom Nav */}
            <nav className="bottom-nav md:hidden">
                {navItems.slice(0, 5).map(tab => (
                    <BottomNavItem 
                        key={tab} 
                        label={tab} 
                        activeTab={activeTab} 
                        onClick={setActiveTab} 
                        icon={icons[tab]} 
                        translatedLabel={navTranslations[tab]} 
                    />
                ))}
            </nav>
            
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-dark-1 shadow-lg p-2 md:p-4 z-10">
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex overflow-x-auto gap-2 md:gap-4 pb-2 -mb-2">
                            <StatCard label="Dinheiro" value={`$${money.toLocaleString()}`} icon={statIcons.money} iconBgColor="bg-green-900/50" />
                            <StatCard label="Popularidade" value={popularity.toLocaleString()} icon={statIcons.popularity} iconBgColor="bg-pink-900/50" />
                            <StatCard label="Poder da Liga" value={totalPower.toLocaleString()} icon={statIcons.power} iconBgColor="bg-red-900/50" />
                            <StatCard label="Semana" value={`${week} / 20`} icon={statIcons.week} iconBgColor="bg-blue-900/50" />
                            <StatCard label="Temporada" value={season.toString()} icon={statIcons.season} iconBgColor="bg-yellow-900/50" />
                        </div>
                         <NotificationBell 
                            notifications={notifications}
                            onNotificationClick={(notification) => {
                                markNotificationAsRead(notification.id);
                                if (notification.targetTab) {
                                    setActiveTab(notification.targetTab);
                                }
                            }}
                            onClearAll={markAllNotificationsAsRead}
                            onClearRead={clearReadNotifications}
                        />
                    </div>
                </header>
                <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-dark-2 pb-20 md:pb-6">
                    {children}
                </div>
            </main>
        </div>
    );
};