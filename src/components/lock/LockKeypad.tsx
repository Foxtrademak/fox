import React from 'react';
import { haptic } from '../../lib/utils';

interface KeypadItem {
  num: string;
  letters: string;
}

interface LockKeypadProps {
  onNumberClick: (num: string) => void;
  onDelete: () => void;
}

const KEYPAD_ITEMS: KeypadItem[] = [
  { num: '1', letters: '' },
  { num: '2', letters: 'ABC' },
  { num: '3', letters: 'DEF' },
  { num: '4', letters: 'GHI' },
  { num: '5', letters: 'JKL' },
  { num: '6', letters: 'MNO' },
  { num: '7', letters: 'PQRS' },
  { num: '8', letters: 'TUV' },
  { num: '9', letters: 'WXYZ' }
];

export const LockKeypad = React.memo(function LockKeypad({ onNumberClick, onDelete }: LockKeypadProps) {
  return (
    <div className="grid grid-cols-3 gap-x-8 gap-y-6 sm:gap-x-12 sm:gap-y-8">
      {KEYPAD_ITEMS.map((item) => (
        <button
          key={item.num}
          onClick={() => { onNumberClick(item.num); haptic('light'); }}
          className="w-[75px] h-[75px] sm:w-[85px] sm:h-[85px] rounded-full bg-white/[0.05] border border-white/[0.1] flex flex-col items-center justify-center transition-all duration-200 active:bg-white/[0.15] active:scale-95 group shadow-xl"
        >
          <span className="text-3xl sm:text-4xl font-normal text-white mb-0.5 leading-none">{item.num}</span>
          {item.letters && (
            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.1em] text-white/50 leading-none group-active:text-white/70">{item.letters}</span>
          )}
        </button>
      ))}
      <div className="w-[75px] h-[75px] sm:w-[85px] sm:h-[85px]" />
      <button
        onClick={() => { onNumberClick('0'); haptic('light'); }}
        className="w-[75px] h-[75px] sm:w-[85px] sm:h-[85px] rounded-full bg-white/[0.05] border border-white/[0.1] flex flex-col items-center justify-center transition-all duration-200 active:bg-white/[0.15] active:scale-95 group shadow-xl"
      >
        <span className="text-3xl sm:text-4xl font-normal text-white mb-0.5 leading-none">0</span>
      </button>
      <button
        onClick={() => { onDelete(); haptic('medium'); }}
        className="w-[75px] h-[75px] sm:w-[85px] sm:h-[85px] rounded-full flex items-center justify-center transition-all active:scale-90 text-white/40 hover:text-white"
      >
        <span className="text-xs font-bold uppercase tracking-widest">Cancel</span>
      </button>
    </div>
  );
});
