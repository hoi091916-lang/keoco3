import React from 'react';
import { Check, X, Lock, HelpCircle } from 'lucide-react';
import { Question, PlayerAnswerState, TeamSide } from '../types';
import { DIFFICULTY_LABELS } from '../data/questions';

interface TeamControlPanelProps {
  side: TeamSide;
  teamName: string;
  question: Question;
  roundNumber: number;
  totalRounds: number;
  answerState: PlayerAnswerState;
  isEvaluating: boolean;
  onSelectOption: (optionIndex: number) => void;
  disabled: boolean;
  isBot?: boolean;
}

export const TeamControlPanel: React.FC<TeamControlPanelProps> = ({
  side,
  teamName,
  question,
  roundNumber,
  totalRounds,
  answerState,
  isEvaluating,
  onSelectOption,
  disabled,
  isBot = false,
}) => {
  const isLeft = side === 'left';

  // Key badges for display
  const keyLabels = isLeft
    ? ['Phím 1', 'Phím 2', 'Phím 3', 'Phím 4']
    : isBot
    ? ['Lựa chọn A', 'Lựa chọn B', 'Lựa chọn C', 'Lựa chọn D']
    : ['↑ / I', '← / J', '↓ / K', '→ / L'];

  const letterLabels = ['A', 'B', 'C', 'D'];
  const diffInfo = DIFFICULTY_LABELS[question.difficulty];

  return (
    <div
      id={`${side}-team-panel`}
      className={`flex-1 min-h-0 flex flex-col justify-between rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border transition-all ${
        isLeft
          ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200/80 dark:border-rose-900/40 shadow-xs'
          : 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-200/80 dark:border-blue-900/40 shadow-xs'
      }`}
    >
      {/* 1. Header: Team Name, Key Guide Pill */}
      <div className="flex items-center justify-between pb-1.5 border-b border-stone-200/60 dark:border-stone-800 shrink-0">
        <div className="flex items-center gap-1.5">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              isLeft ? 'bg-rose-500' : 'bg-blue-500'
            }`}
          />
          <h3
            className={`font-bold text-xs sm:text-sm tracking-tight ${
              isLeft ? 'text-rose-700 dark:text-rose-300' : 'text-blue-700 dark:text-blue-300'
            }`}
          >
            {teamName}
          </h3>
        </div>

        {/* Shortcut guide pill */}
        <div className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded bg-white/90 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 shadow-2xs font-semibold flex items-center gap-1">
          {isLeft ? (
            'Phím [1, 2, 3, 4]'
          ) : isBot ? (
            <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
              🤖 Tự động chọn (Máy)
            </span>
          ) : (
            'Phím [↑, ←, ↓, →] / [I, J, K, L]'
          )}
        </div>
      </div>

      {/* 2. BẢNG CÂU HỎI (Question Board for this team) */}
      <div className="my-1.5 p-2 sm:p-2.5 bg-white/90 dark:bg-stone-900/90 rounded-lg sm:rounded-xl border border-stone-200 dark:border-stone-800 shadow-2xs shrink-0">
        {/* Category & Round meta */}
        <div className="flex items-center justify-between gap-1 mb-1 text-[10px] sm:text-[11px]">
          <span className="font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-200/80 dark:border-amber-800/60">
            Câu {roundNumber}/{totalRounds}
          </span>
          <span className="text-stone-500 dark:text-stone-400 font-medium truncate">
            {question.category} • {diffInfo ? diffInfo.label : question.difficulty}
          </span>
        </div>

        {/* Question Text */}
        <h4 className="font-bold text-xs sm:text-[13px] sm:leading-snug text-stone-900 dark:text-stone-100 line-clamp-2">
          {question.question}
        </h4>
      </div>

      {/* 3. PHẦN TRẢ LỜI Ở DƯỚI (Answer Options Grid below) */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 flex-1 min-h-0">
        {question.options.map((text, idx) => {
          const isSelected = answerState.selectedIndex === idx;
          const isCorrect = idx === question.correctIndex;

          let btnStyle =
            'bg-white dark:bg-stone-800/90 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-500 hover:bg-stone-50 dark:hover:bg-stone-750';

          if (isEvaluating) {
            if (isCorrect) {
              btnStyle =
                'bg-emerald-500 text-white border-emerald-600 shadow-sm font-bold ring-2 ring-emerald-300';
            } else if (isSelected && !isCorrect) {
              btnStyle =
                'bg-rose-500 text-white border-rose-600 line-through opacity-80';
            } else {
              btnStyle =
                'bg-stone-100 dark:bg-stone-900/60 text-stone-400 dark:text-stone-600 border-stone-200 dark:border-stone-800 opacity-60';
            }
          } else if (isSelected) {
            // Player has locked this answer
            btnStyle = isLeft
              ? 'bg-rose-600 text-white border-rose-700 shadow-sm ring-2 ring-rose-300'
              : 'bg-blue-600 text-white border-blue-700 shadow-sm ring-2 ring-blue-300';
          }

          return (
            <button
              key={idx}
              id={`${side}-opt-${idx}`}
              type="button"
              disabled={disabled || isBot || answerState.hasAnswered || isEvaluating}
              onClick={() => onSelectOption(idx)}
              className={`relative flex items-start gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-lg sm:rounded-xl border text-left transition-all duration-150 ${
                isBot ? 'cursor-default' : 'cursor-pointer'
              } disabled:cursor-default active:scale-[0.98] ${btnStyle}`}
            >
              {/* Option Letter Tag */}
              <div
                className={`w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-md flex items-center justify-center font-bold text-[11px] sm:text-xs shrink-0 ${
                  isEvaluating && isCorrect
                    ? 'bg-white text-emerald-700'
                    : isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                }`}
              >
                {letterLabels[idx]}
              </div>

              {/* Option Content & Keyboard hint */}
              <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                <span className="text-[11px] sm:text-xs font-medium leading-tight line-clamp-2">
                  {text}
                </span>

                {/* Key hint badge */}
                <div className="mt-1 flex items-center justify-between">
                  <span
                    className={`inline-block text-[9px] sm:text-[10px] font-mono px-1 py-0.2 rounded font-bold ${
                      isSelected
                        ? 'bg-black/20 text-white'
                        : 'bg-stone-100 dark:bg-stone-700/80 text-stone-500 dark:text-stone-400'
                    }`}
                  >
                    {keyLabels[idx]}
                  </span>

                  {isEvaluating && isCorrect && (
                    <span className="text-[9px] sm:text-[10px] font-bold text-emerald-100 flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> ĐÚNG
                    </span>
                  )}
                  {isEvaluating && isSelected && !isCorrect && (
                    <span className="text-[9px] sm:text-[10px] font-bold text-rose-100 flex items-center gap-0.5">
                      <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> SAI
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 4. Footer: Lock-in Status & Evaluation Explanation */}
      <div className="mt-1.5 pt-1 border-t border-stone-200/50 dark:border-stone-800/60 flex items-center justify-between text-[10px] sm:text-[11px] shrink-0">
        <span className="text-stone-600 dark:text-stone-300">
          {answerState.hasAnswered ? (
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {isBot ? 'Máy đã chốt' : 'Đã chốt'} sau {(answerState.timeSpentMs / 1000).toFixed(1)}s
            </span>
          ) : isBot ? (
            <span className="text-blue-600 dark:text-blue-400 font-semibold italic flex items-center gap-1 animate-pulse">
              🤖 Máy đang suy nghĩ...
            </span>
          ) : (
            <span className="text-stone-500 dark:text-stone-400 italic">Đang chờ chọn...</span>
          )}
        </span>

        {isEvaluating && (
          <span
            className={`font-bold ${
              answerState.isCorrect
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {answerState.isCorrect ? '+1 Điểm đúng' : '0 Điểm'}
          </span>
        )}
      </div>

      {/* Explanation when evaluating */}
      {isEvaluating && question.explanation && (
        <div className="mt-1 p-1 sm:p-1.5 bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-md text-[10px] text-stone-700 dark:text-stone-300 flex items-center gap-1 shrink-0">
          <HelpCircle className="w-3 h-3 text-amber-600 shrink-0" />
          <p className="line-clamp-1">
            <strong className="text-amber-800 dark:text-amber-300">Giải thích: </strong>
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};
