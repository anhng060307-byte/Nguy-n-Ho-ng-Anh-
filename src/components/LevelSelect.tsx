import React from 'react';
import { WORLDS } from '../data/worlds';
import { WorldDefinition } from '../types';
import { Play, ArrowLeft, Calendar, MapPin, Lock, CheckCircle2 } from 'lucide-react';

interface LevelSelectProps {
  unlockedLevel: number;
  onSelectLevel: (world: WorldDefinition) => void;
  onBackToMenu: () => void;
}

export const LevelSelect: React.FC<LevelSelectProps> = ({
  unlockedLevel,
  onSelectLevel,
  onBackToMenu,
}) => {
  return (
    <div className="min-h-screen bg-stone-950 text-white p-4 sm:p-8 flex flex-col items-center select-none relative overflow-x-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-red-900/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-8 z-10">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-xl transition-all text-sm font-bold text-stone-200"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          MENU CHÍNH
        </button>

        <h1 className="text-xl sm:text-2xl font-black text-amber-400 uppercase tracking-wider text-center">
          CHỌN MÀN CHƠI
        </h1>

        <div className="w-24" /> {/* Spacer */}
      </div>

      {/* World Cards List */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 z-10 pb-12">
        {WORLDS.map((w) => {
          const isUnlocked = w.id <= unlockedLevel;
          const isCompleted = w.id < unlockedLevel;

          return (
            <div
              key={w.id}
              className={`relative rounded-2xl border-2 p-5 flex flex-col justify-between transition-all transform duration-200 ${
                isUnlocked
                  ? 'bg-stone-900/90 border-amber-500/60 hover:border-amber-400 hover:-translate-y-1 shadow-xl hover:shadow-amber-500/20'
                  : 'bg-stone-900/40 border-stone-800 opacity-60 grayscale'
              }`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-400 bg-red-950/80 px-2.5 py-0.5 rounded-full border border-red-800/50">
                    WORLD {w.worldNumber}
                  </span>

                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : !isUnlocked ? (
                    <Lock className="w-5 h-5 text-stone-500" />
                  ) : null}
                </div>

                <h3 className="text-lg font-black text-amber-300 mb-1 leading-snug">
                  {w.title}
                </h3>

                <p className="text-xs text-stone-400 font-semibold mb-3">
                  {w.subtitle}
                </p>

                <div className="space-y-1 text-[11px] text-stone-300 mb-4 bg-stone-800/60 rounded-xl p-2.5 border border-stone-700/50">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{w.timePeriod}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    <span className="truncate">{w.location}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                disabled={!isUnlocked}
                onClick={() => onSelectLevel(w)}
                className={`w-full py-2.5 px-4 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-stone-950 cursor-pointer active:scale-98'
                    : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                }`}
              >
                {isUnlocked ? (
                  <>
                    <Play className="w-4 h-4 fill-stone-950" />
                    BẮT ĐẦU MÀN {w.worldNumber}
                  </>
                ) : (
                  'KHÓA (CẦN VƯỢT MÀN TRƯỚC)'
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
