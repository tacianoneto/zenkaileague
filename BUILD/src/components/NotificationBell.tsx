import React, { useState, useEffect, useRef } from 'react';
import { Notification, Tab } from '../types';

interface NotificationBellProps {
    notifications: Notification[];
    onNotificationClick: (notification: Notification) => void;
    onClearAll: () => void;
    onClearRead: () => void;
}

const NotificationIcon: React.FC<{ type: Notification['type'], className?: string }> = ({ type, className = "w-6 h-6" }) => {
    const icons: { [key in Notification['type']]: JSX.Element } = {
        info: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        success: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        warning: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>,
        danger: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>,
    };
    const colors: { [key in Notification['type']]: string } = {
        info: 'text-blue-400',
        success: 'text-green-400',
        warning: 'text-yellow-400',
        danger: 'text-red-400',
    };
    return <div className={colors[type]}>{icons[type]}</div>;
};

export const NotificationBell: React.FC<NotificationBellProps> = ({ notifications, onNotificationClick, onClearAll, onClearRead }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const unreadCount = notifications.filter(n => !n.isRead).length;
    const readCount = notifications.length - unreadCount;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="relative p-2 rounded-full text-gray-300 hover:bg-dark-3 hover:text-white transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-poke-red text-white text-xs flex items-center justify-center ring-2 ring-dark-1">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-dark-3 border border-dark-1 rounded-lg shadow-2xl z-50 flex flex-col">
                    <div className="p-3 border-b border-dark-1">
                        <h4 className="font-bold text-white text-center">Notificações</h4>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map(notification => (
                                <button
                                    key={notification.id}
                                    onClick={() => onNotificationClick(notification)}
                                    className={`w-full text-left p-3 flex items-start gap-3 transition-colors hover:bg-dark-2 ${!notification.isRead ? 'bg-poke-blue/10' : ''}`}
                                >
                                    <div className="flex-shrink-0 mt-1">
                                       <NotificationIcon type={notification.type} />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm text-light-1">{notification.message}</p>
                                        <p className="text-xs text-gray-400 mt-1">T{notification.season}, S{notification.week}</p>
                                    </div>
                                    {!notification.isRead && <div className="w-2 h-2 rounded-full bg-poke-blue mt-1 flex-shrink-0"></div>}
                                </button>
                            ))
                        ) : (
                            <p className="p-4 text-center text-sm text-gray-500">Nenhuma notificação ainda.</p>
                        )}
                    </div>
                     {notifications.length > 0 && (
                        <div className="p-2 flex justify-end items-center border-t border-dark-1 gap-4">
                            {readCount > 0 && (
                                <button onClick={onClearRead} className="text-xs text-poke-red hover:underline">
                                    Limpar lidas
                                </button>
                            )}
                            {unreadCount > 0 && (
                                <button onClick={onClearAll} className="text-xs text-poke-blue hover:underline">
                                    Marcar todas como lidas
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};