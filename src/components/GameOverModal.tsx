import React from 'react';
import { RotateCcw, Home, Skull } from 'lucide-react';
import { WorldDefinition } from '../types';

interface GameOverModalProps {
  world: WorldDefinition;
  onRetry: () => void;
  onMainMenu: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  world,
  onRetry,
  onMainMenu,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="bg-stone-900 border-2 border-red-600/80 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center text-white relative">
        <div className="w-16 h-16 bg-red-950/80 border border-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
          <Skull className="w-8 h-8 text-red-500" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-red-500 tracking-wider uppercase">
          CHƯA HOÀN THÀNH
        </h2>

        <p className="text-xs text-stone-400 mt-1">
          Mèo Mũ Cối đã kiệt sức tại <span className="font-bold text-stone-200">{world.title}</span> ({world.location}).
        </p>

        <div className="my-6 p-4 bg-stone-800/80 border border-stone-700 rounded-xl">
          <p className="text-xs text-amber-300 font-semibold italic">
            "Không có gì quý hơn độc lập tự do!" — Đừng bỏ cuộc, hãy thử lại để cắm cờ giải phóng!
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onRetry}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold rounded-xl shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-2 text-base border border-amber-400/30"
          >
            <RotateCcw className="w-5 h-5" />
            THỬ LẠI MÀN NÀY (5 MẠNG)
          </button>

          <button
            onClick={onMainMenu}
            className="w-full py-3 px-4 bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold rounded-xl border border-stone-700 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Home className="w-4 h-4 text-amber-400" />
            THOÁT VỀ MENU CHÍNH
          </button>
        </div>
      </div>
    </div>
  );
};
