
import React from 'react';
import { ZenkaiType } from '../types';
import { ZENKAI_TYPE_COLORS } from '../constants';

interface TypeBadgeProps {
    type: ZenkaiType;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
    const colorClass = ZENKAI_TYPE_COLORS[type] || 'bg-gray-500';
    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${colorClass}`}>
            {type}
        </span>
    );
};
