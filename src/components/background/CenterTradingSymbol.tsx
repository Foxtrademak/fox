import React from 'react';
import { Activity } from 'lucide-react';

/**
 * Responsibility: Render the large central Activity icon in the background.
 */
export const CenterTradingSymbol = React.memo(() => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
      <Activity className="w-96 h-96 text-[#D4AF37]" strokeWidth={0.5} />
    </div>
  );
});
