import React from 'react';
import { Heart, Pause, Volume2, VolumeX, Flag, Star, Award } from 'lucide-react';
import { Player, PowerUpType, WorldDefinition } from '../types';

interface HUDProps {
  player: Player;
  world: WorldDefinition;
  score: number;
  flagsCollected: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onPause: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  player,
  world,
  score,
  flagsCollected,
  isMuted,
  onToggleMute,
  onPause,
}) => {
  const getPowerUpBadge = (powerUp: PowerUpType) => {
    switch (powerUp) {
      case 'BIG_CAT':
        return <span className="bg-amber-600/90 text-white text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1">🍠 Củ Khoai</span>;
      case 'LEAFLET':
        return <span className="bg-red-600/90 text-white text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1">📜 Truyền Đơn</span>;
      case 'STAR_INVINCIBLE':
        return (
          <span className="bg-yellow-500 text-black text-xs px-2 py-0.5 rounded-full font-extrabold animate-pulse flex items-center gap-1 shadow-md shadow-yellow-500/50">
            ⭐️ Bất Tử ({Math.ceil(player.invincibleTimer)}s)
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 p-3 z-20 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white select-none pointer-events-none">
      {/* Left Info: Lives & Level */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="flex items-center gap-1 bg-red-900/80 border border-red-500/50 px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-md">
          <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
          <span className="font-extrabold text-lg tracking-wide">{player.lives}</span>
        </div>

        <div className="hidden sm:flex flex-col bg-stone-900/80 border border-stone-700 px-3 py-1 rounded-xl backdrop-blur-md">
          <span className="text-[10px] text-yellow-400 uppercase font-bold tracking-wider">
            World {world.worldNumber}: {world.timePeriod}
          </span>
          <span className="text-sm font-bold text-stone-100 truncate max-w-[180px]">
            {world.title}
          </span>
        </div>

        {getPowerUpBadge(player.powerUp)}
      </div>

      {/* Center Score & Collectibles */}
      <div className="flex items-center gap-4 bg-stone-900/80 border border-amber-500/30 px-4 py-1.5 rounded-xl shadow-lg backdrop-blur-md pointer-events-auto">
        <div className="flex items-center gap-1.5">
          <Award className="w-4 h-4 text-yellow-400" />
          <div className="flex flex-col">
            <span className="text-[9px] text-stone-400 font-semibold uppercase">Điểm Số</span>
            <span className="font-black text-yellow-300 text-base leading-none">
              {score.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="h-6 w-px bg-stone-700" />

        <div className="flex items-center gap-1.5">
          <Flag className="w-4 h-4 text-red-500 fill-red-500" />
          <div className="flex flex-col">
            <span className="text-[9px] text-stone-400 font-semibold uppercase">Cờ Đỏ</span>
            <span className="font-black text-white text-base leading-none">
              {flagsCollected}
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls: Mute & Pause */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <button
          onClick={onToggleMute}
          className="p-2 bg-stone-800/90 hover:bg-stone-700 border border-stone-600 rounded-xl transition-all shadow-md active:scale-95"
          title={isMuted ? 'Bật Âm Thanh' : 'Tắt Âm Thanh'}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-green-400" />}
        </button>

        <button
          onClick={onPause}
          className="p-2 bg-amber-600/90 hover:bg-amber-500 border border-amber-400 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1 font-bold text-xs"
        >
          <Pause className="w-5 h-5 text-white" />
          <span className="hidden md:inline">Tạm Dừng</span>
        </button>
      </div>
    </div>
  );
};
