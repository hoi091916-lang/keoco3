import React from 'react';
import {
  Play,
  BookOpen,
  Users,
  Bot,
  Sliders,
  Volume2,
  VolumeX,
  Keyboard,
  Trophy,
  Flame,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Clock
} from 'lucide-react';
import { DifficultyLevel, GameMode } from '../types';
import { DIFFICULTY_LABELS } from '../data/questions';

interface MainMenuProps {
  onStartPlay: () => void;
  onOpenQuestionManager: () => void;
  totalQuestions: number;
  difficulty: DifficultyLevel;
  onSelectDifficulty: (lvl: DifficultyLevel) => void;
  gameMode: GameMode;
  onSelectGameMode: (mode: GameMode) => void;
  timePerQuestion: number;
  onSelectTime: (seconds: number) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenKeyboardGuide: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStartPlay,
  onOpenQuestionManager,
  totalQuestions,
  difficulty,
  onSelectDifficulty,
  gameMode,
  onSelectGameMode,
  timePerQuestion,
  onSelectTime,
  soundEnabled,
  onToggleSound,
  onOpenKeyboardGuide,
}) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 overflow-y-auto select-none">
      {/* Top Bar with quick utilities */}
      <header className="px-4 py-3 shrink-0 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black shadow-xs">
            🏆
          </div>
          <span className="font-extrabold text-sm sm:text-base tracking-tight text-stone-800 dark:text-stone-100">
            KÉO CO ĐẤU TRÍ
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onToggleSound}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              soundEnabled
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300'
                : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-500'
            }`}
            title="Bật/Tắt âm thanh Web Audio"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Âm thanh: BẬT' : 'Âm thanh: TẮT'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenKeyboardGuide}
            className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            title="Xem hướng dẫn phím bấm"
          >
            <Keyboard className="w-4 h-4" />
            <span className="hidden sm:inline">Phím Bấm</span>
          </button>
        </div>
      </header>

      {/* Main Menu Hero & Content */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col justify-center items-center">
        {/* Hero Title & Graphics */}
        <div className="text-center mb-6 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 text-xs font-bold mb-3 shadow-2xs animate-pulse">
            <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>Đối Kháng Trắc Nghiệm 2 Người & Đấu Máy AI</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
            KÉO CO ĐẤU TRÍ
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-medium">
            Trả lời đúng và nhanh hơn đối thủ để kéo dây thừng về phía vạch đích của đội mình!
          </p>
        </div>

        {/* Dynamic Tug of War Visual Teaser */}
        <div className="w-full max-w-lg mb-8 p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between relative overflow-hidden">
          {/* Red Side */}
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-bounce" style={{ animationDuration: '1.2s' }}>
              🔴
            </span>
            <div className="text-left">
              <div className="font-black text-xs text-rose-600">ĐỘI ĐỎ</div>
              <div className="text-[10px] text-stone-400 font-mono">Phím 1, 2, 3, 4</div>
            </div>
          </div>

          {/* Rope in between */}
          <div className="flex-1 mx-3 flex items-center justify-center relative">
            <div className="h-2 w-full bg-amber-700 dark:bg-amber-800 rounded-full shadow-inner flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-red-600 border-2 border-white shadow-md animate-pulse" />
            </div>
          </div>

          {/* Blue Side */}
          <div className="flex items-center gap-2 flex-row-reverse text-right">
            <span className="text-2xl animate-bounce" style={{ animationDuration: '1.4s' }}>
              🔵
            </span>
            <div>
              <div className="font-black text-xs text-blue-600">ĐỘI XANH</div>
              <div className="text-[10px] text-stone-400 font-mono">Phím ↑, ←, ↓, →</div>
            </div>
          </div>
        </div>

        {/* 2 Main Menu Cards (Play & Quản lý câu hỏi) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl">
          {/* OPTION 1: PLAY (Vào trò chơi) */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl sm:rounded-3xl border-2 border-amber-400 dark:border-amber-600 p-5 sm:p-6 shadow-lg flex flex-col justify-between hover:shadow-xl transition relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-amber-500 text-white shadow-xs">
                  Mục 1
                </span>
                <span className="text-xs text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> 10 Câu đối kháng
                </span>
              </div>

              <h2 className="text-2xl font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span>VÀO TRÒ CHƠI</span>
                <span className="text-base text-amber-600 dark:text-amber-400 font-bold">(PLAY)</span>
              </h2>

              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1.5 leading-relaxed">
                Tham gia ngay ván đấu kéo co kịch tính giữa Đội Đỏ và Đội Xanh với đồ họa và âm thanh sống động.
              </p>

              {/* Quick Config Inside Play Card */}
              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2.5 text-xs">
                {/* Mode Selector - Highly Prominent Choice */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-extrabold text-stone-800 dark:text-stone-200 text-xs flex items-center gap-1">
                      <span>CHỌN ĐỐI THỦ:</span>
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                      {gameMode === 'pvp' ? '👥 Người vs Người' : '🤖 Người vs Máy'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {/* Option: Play with Human (2 Players) */}
                    <button
                      id="menu-mode-pvp-card"
                      type="button"
                      onClick={() => onSelectGameMode('pvp')}
                      className={`p-2.5 rounded-xl border-2 text-left transition cursor-pointer flex flex-col justify-between ${
                        gameMode === 'pvp'
                          ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-500 text-amber-900 dark:text-amber-200 shadow-xs ring-1 ring-amber-400'
                          : 'border-stone-200 dark:border-stone-700 bg-stone-50/60 dark:bg-stone-800/40 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-base">👥</span>
                        {gameMode === 'pvp' && (
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        )}
                      </div>
                      <div className="font-extrabold text-xs text-stone-900 dark:text-stone-100">
                        Chơi 2 Người (PvP)
                      </div>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5 leading-tight">
                        2 người chơi trên cùng máy (Phím 1-4 & Mũi tên)
                      </p>
                    </button>

                    {/* Option: Play with Bot / Machine */}
                    <button
                      id="menu-mode-bot-card"
                      type="button"
                      onClick={() => onSelectGameMode('vs_bot')}
                      className={`p-2.5 rounded-xl border-2 text-left transition cursor-pointer flex flex-col justify-between ${
                        gameMode === 'vs_bot'
                          ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-900 dark:text-blue-200 shadow-xs ring-1 ring-blue-400'
                          : 'border-stone-200 dark:border-stone-700 bg-stone-50/60 dark:bg-stone-800/40 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-base">🤖</span>
                        {gameMode === 'vs_bot' && (
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        )}
                      </div>
                      <div className="font-extrabold text-xs text-stone-900 dark:text-stone-100">
                        Chơi Với Máy (Bot AI)
                      </div>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5 leading-tight">
                        Bạn đấu với Máy AI tự động trả lời thông minh
                      </p>
                    </button>
                  </div>
                </div>

                {/* Difficulty Selector */}
                <div>
                  <span className="font-bold text-stone-700 dark:text-stone-300 block mb-1">
                    Mức độ thử thách:
                  </span>
                  <select
                    value={difficulty}
                    onChange={(e) => onSelectDifficulty(e.target.value as DifficultyLevel)}
                    className="w-full p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                  >
                    <option value="progressive">Tăng Tiến 10 Câu (Khuyên Dùng)</option>
                    <option value="nhanh">Nhanh (Phản xạ & Mẹo sống)</option>
                    <option value="vua">Vừa (Hiện tượng thường thức)</option>
                    <option value="kho">Khó (Kỳ quan & Vũ trụ)</option>
                    <option value="chuyen_gia">Chuyên Gia (Lượng tử & Vật lý)</option>
                  </select>
                </div>

                {/* Customizable Time Per Question */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>Thời gian mỗi câu:</span>
                    </span>
                    <span className="font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-1.5 py-0.2 rounded text-[11px]">
                      {timePerQuestion}s
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 mb-1.5">
                    {[8, 10, 12, 15].map((sec) => (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => onSelectTime(sec)}
                        className={`py-1 rounded-lg border text-[11px] font-bold transition cursor-pointer text-center ${
                          timePerQuestion === sec
                            ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                            : 'border-stone-200 dark:border-stone-700 text-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800'
                        }`}
                      >
                        {sec}s {sec === 12 ? '★' : ''}
                      </button>
                    ))}
                  </div>
                  {/* Stepper for custom seconds */}
                  <div className="flex items-center justify-between gap-1 p-1 bg-stone-50 dark:bg-stone-800/60 rounded-lg border border-stone-200 dark:border-stone-700 text-[11px]">
                    <span className="text-stone-500 font-medium pl-1">Tùy chỉnh:</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onSelectTime(Math.max(3, timePerQuestion - 1))}
                        className="w-5 h-5 rounded bg-white dark:bg-stone-700 border border-stone-300 dark:border-stone-600 font-bold flex items-center justify-center hover:bg-stone-100 cursor-pointer"
                        title="Giảm 1s"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={3}
                        max={60}
                        value={timePerQuestion}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          if (!isNaN(val)) onSelectTime(Math.max(3, Math.min(60, val)));
                        }}
                        className="w-10 text-center font-mono font-bold bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-600 rounded py-0.5 text-xs focus:ring-1 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => onSelectTime(Math.min(60, timePerQuestion + 1))}
                        className="w-5 h-5 rounded bg-white dark:bg-stone-700 border border-stone-300 dark:border-stone-600 font-bold flex items-center justify-center hover:bg-stone-100 cursor-pointer"
                        title="Tăng 1s"
                      >
                        +
                      </button>
                      <span className="text-stone-400 font-mono pr-1">s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Play Actions */}
            <div className="mt-5 space-y-2">
              <button
                id="menu-start-primary-btn"
                type="button"
                onClick={onStartPlay}
                className={`w-full py-3 px-4 rounded-xl text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer active:scale-98 group-hover:gap-3 ${
                  gameMode === 'vs_bot'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                }`}
              >
                {gameMode === 'vs_bot' ? (
                  <Bot className="w-4 h-4" />
                ) : (
                  <Users className="w-4 h-4" />
                )}
                <span>
                  {gameMode === 'vs_bot'
                    ? 'BẮT ĐẦU: ĐẤU VỚI MÁY (AI BOT)'
                    : 'BẮT ĐẦU: CHƠI 2 NGƯỜI (PvP)'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Quick switch and play button */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-1">
                <span>Hoặc muốn đổi chế độ?</span>
                <button
                  type="button"
                  onClick={() => {
                    const nextMode = gameMode === 'pvp' ? 'vs_bot' : 'pvp';
                    onSelectGameMode(nextMode);
                  }}
                  className="font-bold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer flex items-center gap-1"
                >
                  {gameMode === 'pvp' ? (
                    <>
                      <Bot className="w-3 h-3 text-blue-500" />
                      <span>Chuyển sang Đấu Với Máy</span>
                    </>
                  ) : (
                    <>
                      <Users className="w-3 h-3 text-amber-600" />
                      <span>Chuyển sang Chơi 2 Người</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* OPTION 2: QUẢN LÝ CÂU HỎI */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl sm:rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-stone-300 dark:hover:border-stone-700 transition relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-sky-500/10 rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-sky-600 text-white shadow-xs">
                  Mục 2
                </span>
                <span className="text-xs text-sky-700 dark:text-sky-400 font-bold flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> Kho Đề Mở
                </span>
              </div>

              <h2 className="text-2xl font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span>QUẢN LÝ CÂU HỎI</span>
              </h2>

              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1.5 leading-relaxed">
                Tự do sáng tạo và cập nhật kho câu hỏi trắc nghiệm của riêng bạn để sử dụng ngay trong các trận kéo co!
              </p>

              {/* Features List */}
              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                  <div className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">
                    +
                  </div>
                  <span><strong>Thêm câu hỏi mới:</strong> Soạn thảo nội dung và 4 đáp án</span>
                </div>
                <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                  <div className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0">
                    ✏️
                  </div>
                  <span><strong>Chỉnh sửa linh hoạt:</strong> Sửa đáp án, lời giải thích & độ khó</span>
                </div>
                <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                  <div className="w-5 h-5 rounded-md bg-rose-100 dark:bg-rose-950/70 text-rose-600 flex items-center justify-center font-bold text-xs shrink-0">
                    🗑️
                  </div>
                  <span><strong>Xóa & Lọc:</strong> Tìm kiếm và dọn dẹp câu hỏi theo chủ đề</span>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 mt-3 flex items-center justify-between">
                  <span className="text-stone-500 font-medium">Hiện có trong ngân hàng:</span>
                  <span className="font-extrabold text-stone-900 dark:text-stone-100">
                    {totalQuestions} câu hỏi
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenQuestionManager}
              className="mt-5 w-full py-3 px-4 rounded-xl border-2 border-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/30 text-sky-700 dark:text-sky-300 font-extrabold text-sm flex items-center justify-center gap-2 transition cursor-pointer active:scale-98"
            >
              <BookOpen className="w-4 h-4" />
              <span>MỞ QUẢN LÝ CÂU HỎI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-2.5 px-4 text-center text-[11px] text-stone-500 border-t border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-900/60">
        Trò chơi Kéo Co Đấu Trí Trivia • Hỗ trợ bàn phím đầy đủ cho 2 người chơi • Lưu câu hỏi trực tiếp trên trình duyệt
      </footer>
    </div>
  );
};
