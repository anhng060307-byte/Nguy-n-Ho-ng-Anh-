import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Flag, Trophy, ArrowRight, Home, Star, ShieldCheck } from 'lucide-react';
import { WorldDefinition } from '../types';

interface VictoryModalProps {
  world: WorldDefinition;
  score: number;
  flagsCollected: number;
  isFinalWorld: boolean;
  onNextLevel: () => void;
  onMainMenu: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  world,
  score,
  flagsCollected,
  isFinalWorld,
  onNextLevel,
  onMainMenu,
}) => {
  useEffect(() => {
    // Confetti explosion
    const count = isFinalWorld ? 250 : 100;
    const defaults = { origin: { y: 0.6 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#da251d', '#ffff00', '#ffffff'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#da251d', '#f1c40f'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#e74c3c', '#2ecc71', '#f1c40f'],
    });
  }, [isFinalWorld]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="bg-gradient-to-b from-stone-900 via-stone-900 to-red-950 border-2 border-yellow-500/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-center text-white relative overflow-hidden">
        {/* Top Celebration Emblem */}
        <div className="w-20 h-20 bg-gradient-to-tr from-amber-500 to-yellow-300 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-yellow-500/40 border-2 border-white animate-bounce">
          <Trophy className="w-10 h-10 text-red-700" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-yellow-400 tracking-wider uppercase drop-shadow-md">
          {isFinalWorld ? 'NƯỚC VIỆT NAM ĐỘC LẬP!' : 'GIẢI PHÓNG THÀNH CÔNG!'}
        </h2>

        <p className="text-sm font-extrabold text-red-400 tracking-widest mt-1 uppercase">
          {world.title} - {world.timePeriod}
        </p>

        {isFinalWorld ? (
          <div className="my-4 bg-red-900/40 border border-yellow-500/50 rounded-2xl p-4 text-left">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-6 h-6 text-yellow-400" />
              <h3 className="font-extrabold text-base text-yellow-300">
                LỄ TAY THOÁT NẠN & KHAI SINH NƯỚC VIỆT NAM
              </h3>
            </div>
            <p className="text-xs text-stone-200 leading-relaxed">
              Mèo Mũ Cối đã cùng Nhân dân cắm cờ đỏ sao vàng tại Quảng trường Ba Đình! Ngày 02/09/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa!
            </p>
          </div>
        ) : (
          <div className="my-4 bg-stone-800/80 border border-stone-700 rounded-2xl p-4 text-center">
            <p className="text-xs text-stone-300 italic">{world.description}</p>
          </div>
        )}

        {/* Score & Flags Recap */}
        <div className="grid grid-cols-2 gap-3 my-5">
          <div className="bg-stone-800/90 border border-stone-700 rounded-xl p-3 flex flex-col items-center">
            <Star className="w-5 h-5 text-yellow-400 mb-1" />
            <span className="text-[10px] text-stone-400 font-bold uppercase">Tổng Điểm</span>
            <span className="text-xl font-black text-yellow-300">{score.toLocaleString()}</span>
          </div>

          <div className="bg-stone-800/90 border border-stone-700 rounded-xl p-3 flex flex-col items-center">
            <Flag className="w-5 h-5 text-red-500 fill-red-500 mb-1" />
            <span className="text-[10px] text-stone-400 font-bold uppercase">Cờ Thu Thuật</span>
            <span className="text-xl font-black text-white">{flagsCollected}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-6">
          {!isFinalWorld ? (
            <button
              onClick={onNextLevel}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-red-600 via-amber-600 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-white font-black rounded-xl shadow-xl transition-all transform active:scale-98 flex items-center justify-center gap-2 text-base uppercase tracking-wider"
            >
              TIẾP TỤC MÀN KẾ TIẾP
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : null}

          <button
            onClick={onMainMenu}
            className="w-full py-3 px-6 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl border border-stone-600 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Home className="w-4 h-4 text-amber-400" />
            VỀ MENU CHÍNH
          </button>
        </div>
      </div>
    </div>
  );
};
