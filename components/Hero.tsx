import React, { useState } from 'react';
import { HERO_IMAGE_URL, HERO_MOBILE_IMAGE_URL } from '../constants';

// Reusable Image Component to handle fallback logic
const SmartBackground: React.FC<{ 
  baseSrc: string; 
  className: string; 
  priority?: boolean;
  style?: React.CSSProperties;
}> = ({ baseSrc, className, style }) => {
  const FALLBACK_IMAGE = "https://ik.imagekit.io/gnubc5ud3/hero.png";
  
  // Create variations to try (jpg, png, jpeg, capitalized)
  // Remove query params from baseSrc if needed to append extensions cleanly, 
  // but here we just append logic assuming baseSrc is a filename like "/hero.jpg"
  const cleanBase = baseSrc.replace(/\.(jpg|png|jpeg)$/i, '');
  const timestamp = Date.now();
  
  const CANDIDATES = [
    `${baseSrc}?v=${timestamp}`,                  // Original provided path
    `${cleanBase}.png?v=${timestamp}`,            // Try .png
    `${cleanBase}.jpg?v=${timestamp}`,            // Try .jpg
    `${cleanBase.charAt(0).toUpperCase() + cleanBase.slice(1)}.jpg?v=${timestamp}`, // Try Capitalized
    `${cleanBase}.jpeg?v=${timestamp}`            // Try .jpeg
  ];

  const [attemptIndex, setAttemptIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(CANDIDATES[0]);

  const handleError = () => {
    const nextIndex = attemptIndex + 1;
    if (nextIndex < CANDIDATES.length) {
      setAttemptIndex(nextIndex);
      setImgSrc(CANDIDATES[nextIndex]);
    } else {
      // If all local attempts fail, switch to the external fallback
      setImgSrc(FALLBACK_IMAGE);
    }
  };

  return (
    <img 
      src={imgSrc} 
      alt="Heavens Harmony Background"
      onError={handleError}
      className={className}
      style={style}
    />
  );
};

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-maroon-950">
      {/* Background Images */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        
        {/* Mobile Image (Hidden on Medium screens and up) */}
        <SmartBackground 
          baseSrc={HERO_MOBILE_IMAGE_URL} 
          className="block md:hidden w-full h-full object-cover object-top animate-[fadeIn_1.5s_ease-out]"
          style={{ objectPosition: 'center top' }}
        />

        {/* Desktop/Tablet Image (Shown on Medium screens and up - tablets and desktops use same image) */}
        <SmartBackground 
          baseSrc={HERO_IMAGE_URL} 
          className="hidden md:block w-full h-full object-cover transition-transform duration-[20s] ease-linear transform hover:scale-105"
        />
        
        {/* Overlays - z-index ensures they sit on top of image */}
        <div className="absolute inset-0 bg-maroon-950/40 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-maroon-900/40 to-maroon-950/20 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-end md:justify-center items-center text-center px-4 pb-32 md:pb-0">
        
        {/* EST. 2020 - Small Gold Text */}
        <div className="mb-4 overflow-hidden">
          <h2 className="text-gold-500 uppercase tracking-[0.3em] text-sm md:text-base font-medium animate-[fadeInUp_1s_ease-out_0.5s_both]">
            Est. 2020
          </h2>
        </div>

        {/* Heavens Harmony - Large Cinematic Title */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl text-white/95 font-bold mb-8 drop-shadow-2xl animate-[fadeInUp_1s_ease-out_0.7s_both] tracking-tight">
          Heavens Harmony
        </h1>
        
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Hero;
