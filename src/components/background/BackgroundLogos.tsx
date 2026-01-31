import React from 'react';
import logo from '../../assets/app-logo-new.webp';

/**
 * Responsibility: Render the large, faint background logos on the sides.
 */
export const BackgroundLogos = React.memo(() => {
  return (
    <div className="absolute inset-0 transform-gpu" style={{ contain: 'paint' }}>
      <div className="absolute top-1/2 -translate-y-1/2 -left-[300px] sm:-left-[500px] w-[600px] sm:w-[1000px] aspect-square opacity-[0.06] blur-[1px] transform-gpu">
        <img 
          src={logo} 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 -right-[300px] sm:-right-[500px] w-[600px] sm:w-[1000px] aspect-square opacity-[0.06] blur-[1px] transform-gpu">
        <img 
          src={logo} 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
});
