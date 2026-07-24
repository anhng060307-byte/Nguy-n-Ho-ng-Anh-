import React from 'react';
import { X, Keyboard, Gamepad2, Heart, Sparkles, Scroll, Star } from 'lucide-react';

interface InstructionsModalProps {
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="bg-stone-900 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl text-white relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-stone-800 hover:bg-stone-700 rounded-full border border-stone-600 transition-all"
        >
          <X className="w-5 h-5 text-stone-300" />
        </button>

        <h2 className="text-2xl sm:text-3xl font-black text-amber-400 tracking-wide uppercase mb-1 flex items-center gap-2">
          <Gamepad2 className="w-8 h-8 text-amber-400" />
          HƯỚNG DẪN CHƠI GAME
        </h2>
        <p className="text-xs text-stone-400 mb-6">
          Mèo Mũ Cối — Cách Mạng Tháng Tám 1945
        </p>

        {/* Item Powers */}
        <div className="mb-6">
          <h3 className="text-sm font-extrabold text-yellow-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> VẬT PHẨM & SỨC MẠNH
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-stone-800/80 border border-amber-600/40 rounded-xl p-3 flex flex-col items-center text-center">
              <span className="text-3xl mb-1">🍠</span>
              <span className="font-extrabold text-xs text-amber-300">Củ Khoai / Bánh Mì</span>
              <p className="text-[11px] text-stone-300 mt-1">
                Giúp Mèo Mũ Cối biến to hoặc hồi lại +1 Mạng!
              </p>
            </div>

            <div className="bg-stone-800/80 border border-red-600/40 rounded-xl p-3 flex flex-col items-center text-center">
              <span className="text-3xl mb-1">📜</span>
              <span className="font-extrabold text-xs text-red-400">Tờ Truyền Đơn</span>
              <p className="text-[11px] text-stone-300 mt-1">
                Bắn lá truyền đơn Cứu Quốc làm choáng & tiêu diệt quân địch từ xa.
              </p>
            </div>

            <div className="bg-stone-800/80 border border-yellow-500/40 rounded-xl p-3 flex flex-col items-center text-center">
              <span className="text-3xl mb-1">⭐️</span>
              <span className="font-extrabold text-xs text-yellow-400">Ngôi Sao Vàng</span>
              <p className="text-[11px] text-stone-300 mt-1">
                Trạng thái Bất Tử ngắn hạn: Mèo phát sáng, chạy nhanh, húc văng mọi xe tăng & lính tuần tra!
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6">
          <h3 className="text-sm font-extrabold text-yellow-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Keyboard className="w-4 h-4" /> ĐIỀU KHIỂN BÀN PHÍM & CẢM ỨNG
          </h3>

          <div className="bg-stone-800/80 border border-stone-700 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-stone-700 pb-2">
              <span className="text-xs text-stone-300 font-semibold">Di chuyển Trái / Phải</span>
              <span className="bg-stone-700 text-yellow-300 font-mono text-xs px-2.5 py-1 rounded-md font-bold">
                Phím Mũi Tên ← → hoặc A / D
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-stone-700 pb-2">
              <span className="text-xs text-stone-300 font-semibold">Nhảy Lên</span>
              <span className="bg-stone-700 text-yellow-300 font-mono text-xs px-2.5 py-1 rounded-md font-bold">
                Phím Mũi Tên ↑ / W / Space
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-stone-700 pb-2">
              <span className="text-xs text-stone-300 font-semibold">Bắn Truyền Đơn Cứu Quốc</span>
              <span className="bg-stone-700 text-yellow-300 font-mono text-xs px-2.5 py-1 rounded-md font-bold">
                Phím X / Shift / Ctrl
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-300 font-semibold">Tạm dừng / Menu</span>
              <span className="bg-stone-700 text-yellow-300 font-mono text-xs px-2.5 py-1 rounded-md font-bold">
                Phím Esc / P
              </span>
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="bg-red-900/30 border border-red-700/50 rounded-2xl p-4 text-xs text-stone-200 space-y-1.5">
          <p className="font-bold text-red-300 text-sm">💡 QUY TẮC BẢO VỆ MẠNG SỐNG:</p>
          <p>• Nhảy lên đầu lính tuần tra để đè bẹp chúng.</p>
          <p>• Húc vào khối có hình Ngôi Sao Vàng ⭐ bên trên để tìm khoai, bánh mì & truyền đơn.</p>
          <p>• Thu thập đủ các cờ đỏ sao vàng và tiến tới cột cờ / lễ đài ở cuối màn để giành chiến thắng!</p>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-amber-600 hover:bg-amber-500 text-stone-900 font-black rounded-xl transition-all shadow-lg text-sm"
        >
          ĐÃ HỂU, BẮT ĐẦU CHƠI!
        </button>
      </div>
    </div>
  );
};
