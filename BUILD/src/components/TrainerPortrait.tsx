import React, { useState, useEffect } from 'react';
import { ZenkaiType } from '../types';
import { TRAINER_PORTRAIT_COLORS } from '../constants';

interface TrainerPortraitProps {
    trainerName: string;
    synergyType?: ZenkaiType;
    sizeClass?: string;
}

// Formats the trainer name to match the expected filename in the GitHub repo.
// e.g., "Vitor T." -> "Vitor_T", "Júnior" -> "Junior"
const formatTrainerNameForUrl = (name: string): string => {
    return name
        .normalize("NFD") // Decompose accented characters into base characters and diacritics
        .replace(/[\u0300-\u036f]/g, "") // Remove the diacritical marks
        .replace(/\./g, '') // Remove periods
        .replace(/ /g, '_'); // Replace spaces with underscores
};

export const TrainerPortrait: React.FC<TrainerPortraitProps> = ({ trainerName, synergyType, sizeClass = 'w-12 h-12' }) => {
    // Construct the URL dynamically based on the trainer's name.
    const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/tacianoneto/zenkai-images/main/';
    const formattedName = formatTrainerNameForUrl(trainerName);
    const potentialImageUrl = `${GITHUB_BASE_URL}${formattedName}.png`;

    const [imageSrc, setImageSrc] = useState(potentialImageUrl);
    const [imageHasError, setImageHasError] = useState(false);

    // This effect resets the component's state whenever the trainerName prop changes.
    // This is crucial for components reused in lists.
    useEffect(() => {
        setImageSrc(potentialImageUrl);
        setImageHasError(false);
    }, [potentialImageUrl]);

    const handleImageError = () => {
        // If the image fails to load from the URL, set an error state
        // which will trigger the fallback UI.
        setImageHasError(true);
    };
    
    // If the image fails to load, render the fallback UI (colored circle with initial).
    if (imageHasError) {
        const initial = trainerName.charAt(0).toUpperCase();
        const bgColorClass = synergyType ? TRAINER_PORTRAIT_COLORS[synergyType] : 'bg-gray-600';

        return (
            <div
                className={`${sizeClass} ${bgColorClass} rounded-full flex items-center justify-center font-bold text-white text-2xl border-2 border-gray-500 shadow-md flex-shrink-0`}
                title={trainerName} // Add title for accessibility
            >
                {initial}
            </div>
        );
    }

    // Otherwise, render the image.
    return (
        <div className={`${sizeClass} rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-500 shadow-md bg-dark-1`}>
            <img
                src={imageSrc}
                alt={`Portrait of ${trainerName}`}
                className="w-full h-full object-cover"
                onError={handleImageError}
                loading="lazy"
            />
        </div>
    );
};