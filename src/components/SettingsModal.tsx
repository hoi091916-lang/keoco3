import React from 'react';
import { X, Volume2, VolumeX, Bot, Users, Check, Flame } from 'lucide-react';
import { DifficultyLevel, GameMode } from '../types';
import { DIFFICULTY_LABELS } from '../data/questions';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  difficulty: DifficultyLevel;
  onSelectDifficulty: (lvl: DifficultyLevel) => void;
  gameMode: GameMode;
  onSelectGameMode: (mode: GameMode) => void;
  timePerQuestion: number;
  onSelectTime: (seconds: number) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onRestart: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  difficulty,
  onSelectDifficulty,
  gameMode,
  onSelectGameMode,
  timePerQuestion,
  onSelectTime,
  soundEnabled,
  onToggleSound,
  onRestart,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="settings-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              Cài Đặt Trận Đấu Kéo Co
            </h2>
            <p className="text-xs text-stone-500">Tùy chỉnh cấp độ câu hỏi & hình thức đối kháng</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 py-4">
          {/* Difficulty Level Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">
              Mức Độ Câu Hỏi (10 Câu)
            </label>
            <div className="space-y-2">
              {(Object.keys(DIFFICULTY_LABELS) as DifficultyLevel[]).map((lvl) => {
                const info = DIFFICULTY_LABELS[lvl];
                const isSelected = difficulty === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => onSelectDifficulty(lvl)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? `${info.bg} ${info.border} ring-2 ring-amber-400 font-semibold shadow-xs`
                        : 'bg-stone-50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700/80 hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-sm font-bold ${info.color}`}>{info.label}</span>
                        {lvl === 'progressive' && (
                          <span className="text-[10px] bg-rose-500 text-white font-extrabold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                            <Flame className="w-2.5 h-2.5" /> HOT
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{info.desc}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Game Mode: 2 Players vs Bot */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">
              Chế Độ Chơi
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onSelectGameMode('pvp')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition ${
                  gameMode === 'pvp'
                    ? 'bg-amber-500 text-white border-amber-600 shadow-md font-bold'
                    : 'bg-stone-50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                }`}
              >
                <Users className="w-5 h-5 mb-1" />
                <span className="text-xs font-bold">2 Người (PvP)</span>
                <span className="text-[10px] opacity-80 mt-0.5">2 người trên cùng máy</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectGameMode('vs_bot')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition ${
                  gameMode === 'vs_bot'
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md font-bold'
                    : 'bg-stone-50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                }`}
              >
                <Bot className="w-5 h-5 mb-1" />
                <span className="text-xs font-bold">Đấu Với Máy (AI)</span>
                <span className="text-[10px] opacity-80 mt-0.5">Máy AI tự động trả lời</span>
              </button>
            </div>
          </div>

          {/* Time Per Question - Customizable */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Thời Gian Mỗi Câu Hỏi
              </label>
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                Hiện tại: {timePerQuestion}s / câu
              </span>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 mb-2.5">
              {[5, 8, 10, 12, 15, 20].map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => onSelectTime(sec)}
                  className={`py-1.5 px-2 rounded-xl border text-xs font-bold transition cursor-pointer text-center ${
                    timePerQuestion === sec
                      ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                      : 'bg-stone-50 dark:bg-stone-800/50 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-stone-300'
                  }`}
                >
                  {sec}s {sec === 12 ? '★' : ''}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/80 flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Tùy chỉnh số giây bất kỳ (3s - 60s):
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onSelectTime(Math.max(3, timePerQuestion - 1))}
                  className="w-7 h-7 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200 font-black text-sm flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-600 cursor-pointer active:scale-95"
                  title="Giảm 1 giây"
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
                    if (!isNaN(val)) {
                      onSelectTime(Math.max(3, Math.min(60, val)));
                    }
                  }}
                  className="w-14 p-1 text-center font-mono font-bold text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button
                  type="button"
                  onClick={() => onSelectTime(Math.min(60, timePerQuestion + 1))}
                  className="w-7 h-7 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200 font-black text-sm flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-600 cursor-pointer active:scale-95"
                  title="Tăng 1 giây"
                >
                  +
                </button>
                <span className="text-xs text-stone-500 font-bold ml-0.5">giây</span>
              </div>
            </div>
          </div>

          {/* Sound & Controls Guide */}
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onToggleSound}
                className="flex items-center gap-2 text-xs font-medium text-stone-700 dark:text-stone-300 py-1.5 px-3 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 cursor-pointer"
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                    <span>Âm thanh: BẬT</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 text-stone-400" />
                    <span>Âm thanh: TẮT</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex gap-3">
          <button
            type="button"
            onClick={() => {
              onRestart();
              onClose();
            }}
            className="flex-1 py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-sm shadow cursor-pointer active:scale-95 transition"
          >
            Áp Dụng & Bắt Đầu Lại Trận Mới
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-200 rounded-xl font-semibold text-sm cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
