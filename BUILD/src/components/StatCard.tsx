import React, { ReactNode } from 'react';

interface StatCardProps {
    label: string;
    value: string;
    icon: ReactNode;
    iconBgColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, iconBgColor = 'bg-gray-700' }) => (
    <div className="bg-gradient-to-br from-dark-3 to-dark-2 p-3 rounded-xl shadow-lg border border-dark-1/50 flex items-center gap-4 transition-all hover:scale-105 hover:shadow-poke-yellow/20">
        <div className={`p-3 rounded-lg ${iconBgColor} shadow-inner`}>
            {icon}
        </div>
        <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{label}</p>
            <p className="text-xl font-bold text-white">{value}</p>
        </div>
    </div>
);
