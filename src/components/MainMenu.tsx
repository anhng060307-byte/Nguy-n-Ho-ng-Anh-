import React from 'react';
import { Play, Grid, HelpCircle, History, Volume2, VolumeX, Shield, Award } from 'lucide-react';

interface MainMenuProps {
  onStartGame: () => void;
  onOpenLevelSelect: () => void;
  onOpenInstructions: () => void;
  onOpenHistory: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  highScore: number;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStartGame,
  onOpenLevelSelect,
  onOpenInstructions,
  onOpenHistory,
  isMuted,
  onToggleMute,
  highScore,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-red-950 text-white p-4 sm:p-8 flex flex-col items-center justify-between select-none relative overflow-hidden">
      {/* Background Decorative Star Rays */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Top Bar with Sound & High score */}
      <div className="w-full max-w-2xl flex items-center justify-between z-10">
        <div className="flex items-center gap-2 bg-stone-900/80 border border-stone-700 px-3 py-1.5 rounded-xl shadow-md">
          <Award className="w-4 h-4 text-yellow-400" />
          <span className="text-xs text-stone-300 font-bold">KỶ LỤC:</span>
          <span className="text-sm font-black text-yellow-300">{highScore.toLocaleString()}</span>
        </div>

        <button
          onClick={onToggleMute}
          className="p-2 bg-stone-900/80 hover:bg-stone-800 border border-stone-700 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5 text-xs font-bold"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-red-400" />
              <span className="text-red-400">ÂM THANH: TẮT</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-green-400" />
              <span className="text-green-400">ÂM THANH: BẬT</span>
            </>
          )}
        </button>
      </div>

      {/* Main Title & Hero Mascot */}
      <div className="w-full max-w-2xl text-center z-10 my-auto py-6">
        {/* Animated Mèo Mũ Cối Avatar */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-yellow-300 rounded-full blur-lg opacity-40 animate-pulse" />
          <div className="w-full h-full bg-stone-900 border-4 border-yellow-400 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden">
            {/* Cute Cat SVG Graphic */}
            <svg viewBox="0 0 100 100" className="w-28 h-28">
              {/* Green Pith Helmet */}
              <path d="M 20 40 Q 50 15 80 40 Z" fill="#2e7d32" />
              <rect x="15" y="40" width="70" height="6" fill="#1b5e20" rx="3" />
              {/* Yellow Star on Helmet */}
              <polygon points="50,22 53,29 60,29 55,33 57,40 50,36 43,40 45,33 40,29 47,29" fill="#ffff00" />

              {/* White Cat Ears */}
              <polygon points="25,40 15,20 35,32" fill="#ffffff" />
              <polygon points="27,37 20,23 33,32" fill="#ff9ff3" />
              <polygon points="75,40 85,20 65,32" fill="#ffffff" />
              <polygon points="73,37 80,23 67,32" fill="#ff9ff3" />

              {/* White Cat Head */}
              <circle cx="50" cy="55" r="28" fill="#ffffff" />

              {/* Big Twinkling Eyes */}
              <circle cx="38" cy="52" r="5" fill="#2c3e50" />
              <circle cx="36" cy="50" r="2" fill="#ffffff" />
              <circle cx="62" cy="52" r="5" fill="#2c3e50" />
              <circle cx="60" cy="50" r="2" fill="#ffffff" />

              {/* Pink Nose */}
              <circle cx="50" cy="58" r="3" fill="#ff7675" />

              {/* Whiskers */}
              <line x1="20" y1="56" x2="33" y2="58" stroke="#b2bec3" strokeWidth="1.5" />
              <line x1="20" y1="62" x2="33" y2="61" stroke="#b2bec3" strokeWidth="1.5" />
              <line x1="80" y1="56" x2="67" y2="58" stroke="#b2bec3" strokeWidth="1.5" />
              <line x1="80" y1="62" x2="67" y2="61" stroke="#b2bec3" strokeWidth="1.5" />

              {/* Red Collar */}
              <rect x="30" y="76" width="40" height="6" fill="#da251d" rx="2" />
            </svg>
          </div>
        </div>

        {/* Title Text */}
        <div className="inline-block bg-red-950/80 border border-yellow-500/50 px-4 py-1 rounded-full mb-3 shadow-md">
          <span className="text-xs font-black text-yellow-400 uppercase tracking-widest flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-yellow-400" />
            GAME PLATFORMER CÁCH MẠNG
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 uppercase tracking-wider drop-shadow-md mb-2">
          MARIO CAT
        </h1>

        <p className="text-base sm:text-lg font-extrabold text-red-500 uppercase tracking-widest mb-8">
          CÁCH MẠNG THÁNG 8 / 1945
        </p>

        {/* Menu Actions */}
        <div className="flex flex-col gap-3.5 max-w-md mx-auto">
          <button
            onClick={onStartGame}
            className="w-full py-4 px-6 bg-gradient-to-r from-red-600 via-amber-600 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-stone-950 font-black rounded-2xl shadow-xl hover:shadow-yellow-500/30 transition-all transform hover:-translate-y-0.5 active:scale-98 flex items-center justify-center gap-3 text-base sm:text-lg uppercase tracking-wider"
          >
            <Play className="w-6 h-6 fill-stone-950" />
            BẮT ĐẦU CHƠI MỚI
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              onClick={onOpenLevelSelect}
              className="py-3 px-3 bg-stone-900 hover:bg-stone-800 text-amber-300 font-extrabold rounded-xl border border-stone-700 hover:border-amber-500/50 transition-all flex items-center justify-center gap-1.5 text-xs uppercase"
            >
              <Grid className="w-4 h-4 text-amber-400" />
              CHỌN MÀN
            </button>

            <button
              onClick={onOpenInstructions}
              className="py-3 px-3 bg-stone-900 hover:bg-stone-800 text-stone-200 font-extrabold rounded-xl border border-stone-700 hover:border-stone-500 transition-all flex items-center justify-center gap-1.5 text-xs uppercase"
            >
              <HelpCircle className="w-4 h-4 text-sky-400" />
              HƯỚNG DẪN
            </button>

            <button
              onClick={onOpenHistory}
              className="py-3 px-3 bg-stone-900 hover:bg-stone-800 text-stone-200 font-extrabold rounded-xl border border-stone-700 hover:border-stone-500 transition-all flex items-center justify-center gap-1.5 text-xs uppercase"
            >
              <History className="w-4 h-4 text-red-400" />
              TƯ LIỆU
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-2xl text-center text-[11px] text-stone-500 z-10 pt-4">
        © 1945–2026 Mario Cat: Cách Mạng Tháng Tám • Tải nghiệm hào hùng lịch sử Việt Nam
      </div>
    </div>
  );
};
