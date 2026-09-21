import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Sliders, CheckCircle2, Zap, Home, Clock } from 'lucide-react';
import { RoundResult } from '../types';

interface GameResultModalProps {
  ropePosition: number;
  leftScore: number;
  rightScore: number;
  leftTeamName: string;
  rightTeamName: string;
  history: RoundResult[];
  totalMatchSeconds?: number;
  onPlayAgain: () => void;
  onOpenSettings: () => void;
  onBackToMenu?: () => void;
}

export const GameResultModal: React.FC<GameResultModalProps> = ({
  ropePosition,
  leftScore,
  rightScore,
  leftTeamName,
  rightTeamName,
  history,
  totalMatchSeconds,
  onPlayAgain,
  onOpenSettings,
  onBackToMenu,
}) => {
  // Determine overall winner based on rope position (or score if exact 0)
  let winner: 'left' | 'right' | 'draw' = 'draw';
  if (ropePosition < -3) {
    winner = 'left';
  } else if (ropePosition > 3) {
    winner = 'right';
  } else {
    if (leftScore > rightScore) winner = 'left';
    else if (rightScore > leftScore) winner = 'right';
    else winner = 'draw';
  }

  const winnerName =
    winner === 'left' ? leftTeamName : winner === 'right' ? rightTeamName : 'Hòa Nhau Cân Não!';

  // Compute average answer times
  const leftTimes = history.filter((h) => h.leftAnswer.hasAnswered).map((h) => h.leftAnswer.timeSpentMs);
  const rightTimes = history.filter((h) => h.rightAnswer.hasAnswered).map((h) => h.rightAnswer.timeSpentMs);

  const leftAvgTime = leftTimes.length ? (leftTimes.reduce((a, b) => a + b, 0) / leftTimes.length / 1000).toFixed(2) : '0';
  const rightAvgTime = rightTimes.length ? (rightTimes.reduce((a, b) => a + b, 0) / rightTimes.length / 1000).toFixed(2) : '0';

  useEffect(() => {
    if (winner !== 'draw') {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {}
    }
  }, [winner]);

  return (
    <div
      id="game-result-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Trophy Icon */}
        <div className="flex flex-col items-center text-center">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg ${
              winner === 'left'
                ? 'bg-rose-500 text-white ring-8 ring-rose-100 dark:ring-rose-950'
                : winner === 'right'
                ? 'bg-blue-500 text-white ring-8 ring-blue-100 dark:ring-blue-950'
                : 'bg-amber-500 text-white ring-8 ring-amber-100 dark:ring-amber-950'
            }`}
          >
            <Trophy className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
            KẾT THÚC TRẬN ĐẤU (10 CÂU)
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 mt-1 mb-2">
            {winner === 'draw' ? 'Trận Đấu Bất Phân Thắng Bại!' : `🏆 ${winnerName} Chiến Thắng!`}
          </h2>

          <p className="text-sm text-stone-600 dark:text-stone-300 max-w-sm mb-6">
            {winner === 'left'
              ? `${leftTeamName} đã kéo dây lệch về phía mình ${Math.abs(ropePosition).toFixed(0)}m với tinh thần thép!`
              : winner === 'right'
              ? `${rightTeamName} đã kéo dây lệch về phía mình ${Math.abs(ropePosition).toFixed(0)}m với phản xạ cực đỉnh!`
              : 'Hai đội có phản xạ và kiến thức ngang tài ngang sức, dây kéo dừng sát vạch ranh giới!'}
          </p>
        </div>

        {/* Total Match Time Badge if available */}
        {totalMatchSeconds !== undefined && (
          <div className="mb-4 py-2 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 flex items-center justify-between text-xs">
            <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-spin-slow" />
              <span>Tổng Thời Gian Cả Trận Đấu:</span>
            </span>
            <span className="font-mono font-black text-sm text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-900 px-2 py-0.5 rounded-lg border border-amber-300 dark:border-amber-700">
              {Math.floor(totalMatchSeconds / 60)
                .toString()
                .padStart(2, '0')}
              :
              {(totalMatchSeconds % 60).toString().padStart(2, '0')}
            </span>
          </div>
        )}

        {/* Detailed Stats Comparison */}
        <div className="bg-stone-50 dark:bg-stone-800/60 rounded-2xl p-4 border border-stone-200 dark:border-stone-700/60 mb-6">
          <div className="grid grid-cols-3 gap-2 text-center text-xs pb-3 border-b border-stone-200 dark:border-stone-700 font-bold text-stone-400">
            <span className="text-rose-600 dark:text-rose-400">{leftTeamName}</span>
            <span>CHỈ SỐ ĐỐI KHÁNG</span>
            <span className="text-blue-600 dark:text-blue-400">{rightTeamName}</span>
          </div>

          <div className="space-y-3 pt-3 text-xs sm:text-sm">
            {/* Correct Answers */}
            <div className="grid grid-cols-3 items-center text-center">
              <span className="font-extrabold text-stone-800 dark:text-stone-200">
                {leftScore} / {history.length}
              </span>
              <span className="text-stone-500 font-medium flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Số câu đúng
              </span>
              <span className="font-extrabold text-stone-800 dark:text-stone-200">
                {rightScore} / {history.length}
              </span>
            </div>

            {/* Average Reaction Time */}
            <div className="grid grid-cols-3 items-center text-center">
              <span className="font-bold text-stone-700 dark:text-stone-300">{leftAvgTime}s</span>
              <span className="text-stone-500 font-medium flex items-center justify-center gap-1">
                <Zap className="w-3.5 h-3.5" /> Tốc độ chốt TB
              </span>
              <span className="font-bold text-stone-700 dark:text-stone-300">{rightAvgTime}s</span>
            </div>

            {/* Final Rope Position meter */}
            <div className="pt-2 border-t border-stone-200/80 dark:border-stone-700">
              <div className="text-center text-xs text-stone-500 mb-1.5 font-medium">
                Vị trí dây thừng cuối cùng:
              </div>
              <div className="h-2.5 bg-stone-200 dark:bg-stone-700 rounded-full relative overflow-hidden">
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-stone-400 -translate-x-1/2"></div>
                <div
                  className={`absolute top-0 bottom-0 w-4 rounded-full -translate-x-1/2 shadow ${
                    ropePosition < 0 ? 'bg-rose-500' : 'bg-blue-500'
                  }`}
                  style={{ left: `${50 + (ropePosition / 100) * 45}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
                <span>◀ Đội Trái</span>
                <span>0m</span>
                <span>Đội Phải ▶</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          {onBackToMenu && (
            <button
              id="back-to-menu-btn"
              type="button"
              onClick={onBackToMenu}
              className="py-3 px-4 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Menu Chính</span>
            </button>
          )}
          <button
            id="play-again-btn"
            type="button"
            onClick={onPlayAgain}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Đấu Trận Mới
          </button>
          <button
            id="settings-btn"
            type="button"
            onClick={onOpenSettings}
            className="py-3 px-3 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sliders className="w-4 h-4" />
            <span className="hidden sm:inline">Cài Đặt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
