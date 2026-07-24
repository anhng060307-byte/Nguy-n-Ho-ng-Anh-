import React from 'react';
import { Play, RotateCcw, Home, HelpCircle } from 'lucide-react';
import { WorldDefinition } from '../types';

interface PauseModalProps {
  world: WorldDefinition;
  onResume: () => void;
  onRestart: () => void;
  onMainMenu: () => void;
  onOpenInstructions: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  world,
  onResume,
  onRestart,
  onMainMenu,
  onOpenInstructions,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-stone-900 border-2 border-amber-500/60 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center text-white relative overflow-hidden">
        {/* Decorative Golden Star Accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <h2 className="text-2xl sm:text-3xl font-black text-amber-400 tracking-wide uppercase mb-1">
          TẠM DỪNG MÀN CHƠI
        </h2>

        <div className="bg-stone-800/80 border border-stone-700 rounded-xl p-3 my-4">
          <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-0.5">
            Màn {world.worldNumber}: {world.timePeriod}
          </p>
          <p className="text-base font-extrabold text-stone-100">{world.title}</p>
          <p className="text-xs text-stone-400 italic mt-1">{world.location}</p>
        </div>

        {/* Menu Actions */}
        <div className="flex flex-col gap-3 my-6">
          <button
            onClick={onResume}
            className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-extrabold rounded-xl shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-2 text-base border border-green-400/30"
          >
            <Play className="w-5 h-5 fill-white" />
            TIẾP TỤC CHƠI
          </button>

          <button
            onClick={onRestart}
            className="w-full py-3 px-4 bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold rounded-xl border border-amber-500/30 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <RotateCcw className="w-4 h-4 text-amber-400" />
            CHƠI LẠI MÀN NÀY
          </button>

          <button
            onClick={onOpenInstructions}
            className="w-full py-3 px-4 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl border border-stone-700 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <HelpCircle className="w-4 h-4 text-sky-400" />
            XEM HƯỚNG DẪN
          </button>

          <button
            onClick={onMainMenu}
            className="w-full py-3 px-4 bg-red-900/80 hover:bg-red-800 text-red-100 font-extrabold rounded-xl border border-red-600/50 transition-all flex items-center justify-center gap-2 text-sm shadow-md mt-2"
          >
            <Home className="w-4 h-4 text-red-300" />
            THOÁT VỀ MENU CHÍNH
          </button>
        </div>

        <p className="text-[11px] text-stone-500 italic">
          Mèo Mũ Cối luôn sẵn sàng giải phóng các tỉnh thành!
        </p>
      </div>
    </div>
  );
};
