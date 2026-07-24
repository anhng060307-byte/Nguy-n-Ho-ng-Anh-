import React from 'react';
import { X, Calendar, MapPin, Landmark, History } from 'lucide-react';
import { WORLDS } from '../data/worlds';

interface HistoryModalProps {
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="bg-stone-900 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl text-white relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-stone-800 hover:bg-stone-700 rounded-full border border-stone-600 transition-all"
        >
          <X className="w-5 h-5 text-stone-300" />
        </button>

        <h2 className="text-2xl sm:text-3xl font-black text-amber-400 tracking-wide uppercase mb-1 flex items-center gap-2">
          <History className="w-8 h-8 text-amber-400" />
          TƯ LIỆU CÁCH MẠNG THÁNG TÁM 1945
        </h2>
        <p className="text-xs text-stone-400 mb-6">
          Hành trình giải phóng dân tộc & khai sinh nước Việt Nam Dân chủ Cộng hòa
        </p>

        <div className="space-y-4">
          {WORLDS.map((w) => (
            <div
              key={w.id}
              className="bg-stone-800/90 border border-stone-700 hover:border-amber-500/50 rounded-2xl p-4 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="bg-red-900/80 text-yellow-300 font-extrabold text-xs px-3 py-1 rounded-full border border-red-600/50 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  World {w.worldNumber}: {w.timePeriod}
                </span>

                <span className="text-xs font-semibold text-stone-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {w.location}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-amber-300 mb-1">
                {w.title} — {w.subtitle}
              </h3>

              <p className="text-xs text-stone-300 leading-relaxed">
                {w.description}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl border border-stone-600 transition-all text-sm"
        >
          ĐÓNG TƯ LIỆU
        </button>
      </div>
    </div>
  );
};
