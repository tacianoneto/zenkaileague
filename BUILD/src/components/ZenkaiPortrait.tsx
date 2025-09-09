import React, { useState, useEffect } from 'react';

// This function formats the name for both the GitHub URL and the fallback URL.
const formatSpriteName = (name: string) => {
    // Handle specific Pokémon-like names first
    switch (name) {
        case 'Nidoran♀': return 'Nidoran_F';
        case 'Nidoran♂': return 'Nidoran_M';
        case "Farfetch'd": return 'Farfetchd';
        case 'Mr. Mime': return 'Mr_Mime';
        default:
            // General formatting for custom names
            return name
                .replace(' Zen', '')
                .replace(' Kai', '')
                .trim()
                .replace(/ /g, '_')
                // Correctly removes accents for URL compatibility (e.g., "Guatatá" -> "Guatata")
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
};


interface ZenkaiPortraitProps {
    zenkaiName: string;
    sizeClass?: string; // e.g., 'w-10 h-10'
    isSilhouetted?: boolean;
}

export const ZenkaiPortrait: React.FC<ZenkaiPortraitProps> = ({ zenkaiName, sizeClass = 'w-12 h-12', isSilhouetted = false }) => {
    const githubUsername = 'tacianoneto';
    const repoName = 'zenkai-images';
    
    const formattedName = formatSpriteName(zenkaiName);

    // Primary URL from GitHub
    const preferredUrl = `https://raw.githubusercontent.com/${githubUsername}/${repoName}/main/${formattedName}.png`;
    // Fallback URL
    const fallbackUrl = `https://sprites.pmdcollab.org/portrait/${formattedName}.png`;

    const [imageUrl, setImageUrl] = useState(preferredUrl);
    const [hasTriedFallback, setHasTriedFallback] = useState(false);
    
    // Reset image URL when the zenkaiName prop changes
    useEffect(() => {
        setImageUrl(preferredUrl);
        setHasTriedFallback(false);
    }, [zenkaiName, preferredUrl]);

    const handleError = () => {
        // If the preferred URL (GitHub) fails, try the fallback.
        if (!hasTriedFallback) {
            setImageUrl(fallbackUrl);
            setHasTriedFallback(true);
        } else {
             // If the fallback also fails, show an error state.
            setImageUrl('error');
        }
    };

    const silhouetteClass = isSilhouetted ? 'brightness-0 invert-[.15] opacity-80' : '';

    return (
        <div className={`${sizeClass} flex-shrink-0 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-md overflow-hidden flex items-center justify-center p-1 border border-gray-600 shadow-lg`}>
            {imageUrl === 'error' ? (
                 <div className="w-full h-full bg-dark-1 flex items-center justify-center">
                    <span className={`font-bold text-lg ${isSilhouetted ? 'text-gray-700' : 'text-red-500'}`}>?</span>
                 </div>
            ) : (
                <img 
                    src={imageUrl} 
                    alt={`Portrait of ${zenkaiName}`} 
                    className={`object-contain h-full w-full drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] transition-all ${silhouetteClass}`}
                    onError={handleError}
                    loading="lazy"
                />
            )}
        </div>
    );
};