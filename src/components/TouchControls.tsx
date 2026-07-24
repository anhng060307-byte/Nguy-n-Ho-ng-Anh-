import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUp, Send } from 'lucide-react';

interface TouchControlsProps {
  onLeftStart: () => void;
  onLeftEnd: () => void;
  onRightStart: () => void;
  onRightEnd: () => void;
  onJumpStart: () => void;
  onJumpEnd: () => void;
  onShootStart: () => void;
  hasShootPower: boolean;
}

export const TouchControls: React.FC<TouchControlsProps> = ({
  onLeftStart,
  onLeftEnd,
  onRightStart,
  onRightEnd,
  onJumpStart,
  onJumpEnd,
  onShootStart,
  hasShootPower,
}) => {
  return (
    <div className="md:hidden fixed bottom-4 left-0 right-0 px-4 z-30 flex items-end justify-between pointer-events-none select-none">
      {/* D-Pad Left / Right */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <button
          onTouchStart={(e) => {
            e.preventDefault();
            onLeftStart();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            onLeftEnd();
          }}
          onMouseDown={onLeftStart}
          onMouseUp={onLeftEnd}
          className="w-16 h-16 bg-stone-900/80 active:bg-stone-700 border-2 border-stone-600 rounded-2xl flex items-center justify-center text-white shadow-xl backdrop-blur-md active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-8 h-8 text-amber-400" />
        </button>

        <button
          onTouchStart={(e) => {
            e.preventDefault();
            onRightStart();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            onRightEnd();
          }}
          onMouseDown={onRightStart}
          onMouseUp={onRightEnd}
          className="w-16 h-16 bg-stone-900/80 active:bg-stone-700 border-2 border-stone-600 rounded-2xl flex items-center justify-center text-white shadow-xl backdrop-blur-md active:scale-95 transition-transform"
        >
          <ArrowRight className="w-8 h-8 text-amber-400" />
        </button>
      </div>

      {/* Action Buttons: Shoot & Jump */}
      <div className="flex items-center gap-3 pointer-events-auto">
        {hasShootPower && (
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              onShootStart();
            }}
            onMouseDown={onShootStart}
            className="w-14 h-14 bg-red-800/90 active:bg-red-700 border-2 border-red-500 rounded-full flex items-center justify-center text-white shadow-xl backdrop-blur-md active:scale-95 transition-transform"
          >
            <Send className="w-6 h-6 text-white" />
          </button>
        )}

        <button
          onTouchStart={(e) => {
            e.preventDefault();
            onJumpStart();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            onJumpEnd();
          }}
          onMouseDown={onJumpStart}
          onMouseUp={onJumpEnd}
          className="w-16 h-16 bg-gradient-to-tr from-amber-600 to-yellow-500 active:from-amber-500 active:to-yellow-400 border-2 border-yellow-300 rounded-full flex items-center justify-center text-stone-950 shadow-2xl backdrop-blur-md active:scale-95 transition-transform"
        >
          <ArrowUp className="w-8 h-8 font-black stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
