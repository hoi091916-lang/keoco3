import React from 'react';
import { motion } from 'motion/react';
import { Clock, Zap, HelpCircle } from 'lucide-react';
import { Question } from '../types';
import { DIFFICULTY_LABELS } from '../data/questions';

interface QuestionCardProps {
  question: Question;
  roundNumber: number;
  totalRounds: number;
  timeLeft: number;
  totalTime: number;
  isEvaluating: boolean;
  roundEvaluation: {
    message: string;
    winner: 'left' | 'right' | 'draw' | null;
  } | null;
  leftAnswered: boolean;
  leftAnswerTime?: number;
  rightAnswered: boolean;
  rightAnswerTime?: number;
  leftTeamName: string;
  rightTeamName: string;
  onNextQuestionNow?: () => void;
  isGameOver?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  roundNumber,
  totalRounds,
  timeLeft,
  totalTime,
  isEvaluating,
  roundEvaluation,
  leftAnswered,
  leftAnswerTime,
  rightAnswered,
  rightAnswerTime,
  leftTeamName,
  rightTeamName,
  onNextQuestionNow,
  isGameOver,
}) => {
  const diffInfo = DIFFICULTY_LABELS[question.difficulty] || DIFFICULTY_LABELS['nhanh'];
  const progressPercent = Math.max(0, Math.min(100, (timeLeft / totalTime) * 100));
  const isUrgent = timeLeft <= 3 && !isEvaluating;

  return (
    <div
      id="question-card"
      className="relative w-full bg-white dark:bg-stone-900 rounded-xl sm:rounded-2xl shadow-md border border-stone-200 dark:border-stone-800 p-2.5 sm:p-3.5 transition-all shrink-0"
    >
      {/* Top Header: Round badge, Category, Difficulty, Timer */}
      <div className="flex items-center justify-between gap-2 mb-1.5 pb-1.5 border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs">
            CÂU {roundNumber}/{totalRounds}
          </span>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold border ${diffInfo.bg} ${diffInfo.color} ${diffInfo.border}`}
          >
            <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            {diffInfo.label.split(' ')[0]}
          </span>
          <span className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-400 hidden xs:inline-block font-medium">
            • {question.category}
          </span>
        </div>

        {/* Dynamic Timer Badge & Quick Next Button */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {isEvaluating && !isGameOver && onNextQuestionNow && (
            <button
              id="next-question-btn"
              type="button"
              onClick={onNextQuestionNow}
              className="py-1 px-2.5 rounded-lg bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900 font-bold text-[11px] shadow-xs transition flex items-center gap-1 cursor-pointer animate-pulse"
            >
              <span>Tiếp tục</span>
              <span className="text-xs">►</span>
            </button>
          )}

          <div
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-mono font-bold transition-colors ${
              isUrgent
                ? 'bg-rose-500 text-white animate-bounce'
                : isEvaluating
                ? 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
            }`}
          >
            <Clock className={`w-3 h-3 ${isUrgent ? 'animate-spin' : ''}`} />
            <span>{isEvaluating ? 'Hết giờ' : `${timeLeft.toFixed(1)}s`}</span>
          </div>
        </div>
      </div>

      {/* Timer Bar */}
      <div className="w-full h-1 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden mb-1.5">
        <motion.div
          className={`h-full ${
            isUrgent ? 'bg-rose-500' : 'bg-gradient-to-r from-amber-400 to-orange-500'
          }`}
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ ease: 'linear', duration: 0.1 }}
        />
      </div>

      {/* Main Question Text */}
      <div className="min-h-[44px] sm:min-h-[50px] flex items-center justify-center text-center px-1.5 py-0.5">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-stone-800 dark:text-stone-100 leading-snug tracking-tight">
          {question.question}
        </h2>
      </div>

      {/* Live Lock-in Status for Both Teams */}
      <div className="mt-1.5 pt-1.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] sm:text-xs">
        {/* Left Team Status */}
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-rose-600 dark:text-rose-400">{leftTeamName}:</span>
          {leftAnswered ? (
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800 text-[10px] sm:text-[11px]">
              ✓ Đã chốt ({leftAnswerTime ? (leftAnswerTime / 1000).toFixed(1) + 's' : 'nhanh'})
            </span>
          ) : (
            <span className="text-stone-500 dark:text-stone-400 italic flex items-center gap-1 text-[10px] sm:text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping"></span>
              Đang chọn...
            </span>
          )}
        </div>

        {/* Evaluation Banner in Center if round resolved */}
        {roundEvaluation && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold border ${
              roundEvaluation.winner === 'left'
                ? 'bg-rose-100 text-rose-800 border-rose-300'
                : roundEvaluation.winner === 'right'
                ? 'bg-blue-100 text-blue-800 border-blue-300'
                : 'bg-stone-100 text-stone-700 border-stone-300'
            }`}
          >
            {roundEvaluation.message}
          </motion.div>
        )}

        {/* Right Team Status */}
        <div className="flex items-center gap-1.5">
          {rightAnswered ? (
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800 text-[10px] sm:text-[11px]">
              ✓ Đã chốt ({rightAnswerTime ? (rightAnswerTime / 1000).toFixed(1) + 's' : 'nhanh'})
            </span>
          ) : (
            <span className="text-stone-500 dark:text-stone-400 italic flex items-center gap-1 text-[10px] sm:text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
              Đang chọn...
            </span>
          )}
          <span className="font-semibold text-blue-600 dark:text-blue-400">{rightTeamName}:</span>
        </div>
      </div>

      {/* Explanation when evaluated */}
      {isEvaluating && question.explanation && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-1.5 p-1.5 sm:p-2 bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-lg text-[11px] text-stone-700 dark:text-stone-300 flex items-center gap-1.5"
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <div className="line-clamp-2">
            <strong className="text-amber-800 dark:text-amber-300 font-semibold">Giải thích: </strong>
            {question.explanation}
          </div>
        </motion.div>
      )}
    </div>
  );
};
