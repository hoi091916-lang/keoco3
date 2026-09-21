import React from 'react';
import { motion } from 'motion/react';
import { Clock, ArrowRight } from 'lucide-react';

interface TugOfWarArenaProps {
  ropePosition: number; // -100 to 100, 0 is center
  isPulling: 'left' | 'right' | null;
  lastPullMagnitude?: number;
  leftScore: number;
  rightScore: number;
  leftTeamName: string;
  rightTeamName: string;
  roundNumber?: number;
  totalRounds?: number;
  timeLeft?: number;
  totalTime?: number;
  isEvaluating?: boolean;
  roundEvaluation?: { message: string; winner: 'left' | 'right' | 'draw' | null } | null;
  onNextQuestionNow?: () => void;
  isGameOver?: boolean;
}

export const TugOfWarArena: React.FC<TugOfWarArenaProps> = ({
  ropePosition,
  isPulling,
  leftScore,
  rightScore,
  leftTeamName,
  rightTeamName,
  roundNumber = 1,
  totalRounds = 10,
  timeLeft = 10,
  totalTime = 10,
  isEvaluating = false,
  roundEvaluation = null,
  onNextQuestionNow,
  isGameOver = false,
}) => {
  // Convert -100..100 to percentage translation: -100 is -35%, +100 is +35%
  const offsetPercent = (ropePosition / 100) * 32;

  const isTimeCritical = timeLeft <= 3 && !isEvaluating;
  const timeProgressPercent = Math.min(100, Math.max(0, (timeLeft / totalTime) * 100));

  return (
    <div id="tug-arena-container" className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-b from-amber-50/80 via-orange-50/60 to-amber-100/80 dark:from-stone-900 dark:via-stone-900/90 dark:to-stone-950 border border-amber-200/80 dark:border-stone-800 shadow-inner select-none shrink-0">
      {/* Top Banner Status: Scores, Round Info, Countdown Timer, & Distance Meter */}
      <div className="flex items-center justify-between px-2.5 sm:px-4 py-1 sm:py-1.5 border-b border-amber-200/40 dark:border-stone-800/80 text-xs font-medium">
        {/* Left Team Info */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0"></span>
          <span className="font-bold text-xs sm:text-sm text-rose-600 dark:text-rose-400 truncate max-w-[100px] sm:max-w-none">{leftTeamName}</span>
          <span className="bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 font-bold px-1.5 py-0.2 rounded-full text-[10px] sm:text-xs shrink-0">
            {leftScore}
          </span>
        </div>

        {/* Center: Round Badge, Timer / Next Button & Mini Distance Meter */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Round badge */}
          <span className="font-bold text-[10px] sm:text-xs text-amber-900 dark:text-amber-300 bg-amber-200/60 dark:bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-300/80 dark:border-amber-800">
            CÂU {roundNumber}/{totalRounds}
          </span>

          {/* Center Mini Meter */}
          <div className="hidden sm:flex flex-col items-center">
            <div className="flex items-center gap-1 text-stone-600 dark:text-stone-300 font-mono font-bold text-[10px] sm:text-[11px] tracking-wider">
              <span className={ropePosition < -5 ? 'text-rose-600 font-black' : ''}>
                {ropePosition < 0 ? `◄ ${Math.abs(ropePosition).toFixed(0)}m` : '0m'}
              </span>
              <span className="text-stone-400 text-[9px]">|</span>
              <span className="text-stone-500 font-medium text-[9px]">GIỮA</span>
              <span className="text-stone-400 text-[9px]">|</span>
              <span className={ropePosition > 5 ? 'text-blue-600 font-black' : ''}>
                {ropePosition > 0 ? `${ropePosition.toFixed(0)}m ►` : '0m'}
              </span>
            </div>
            {/* Visual Mini Track */}
            <div className="w-24 sm:w-32 h-1 bg-stone-200 dark:bg-stone-800 rounded-full mt-0.5 relative overflow-hidden">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-stone-400 -translate-x-1/2 z-10"></div>
              <div
                className="absolute top-0 bottom-0 w-2 bg-amber-500 rounded-full shadow transition-all duration-300 -translate-x-1/2"
                style={{ left: `${50 + (ropePosition / 100) * 45}%` }}
              ></div>
            </div>
          </div>

          {/* Countdown Timer OR Next Question Button */}
          {isEvaluating && !isGameOver && onNextQuestionNow ? (
            <button
              id="arena-next-question-btn"
              type="button"
              onClick={onNextQuestionNow}
              className="py-1 px-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-900 font-bold text-[11px] sm:text-xs shadow-xs transition flex items-center gap-1 cursor-pointer active:scale-95 animate-pulse"
            >
              <span>Tiếp Tục</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            <div
              className={`flex items-center gap-1 font-mono font-bold text-[11px] sm:text-xs px-2 py-0.5 rounded-full border transition-all ${
                isTimeCritical
                  ? 'bg-rose-500 text-white border-rose-600 shadow-sm animate-pulse'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Clock className={`w-3 h-3 ${isTimeCritical ? 'text-white' : 'text-amber-600'}`} />
              <span>{Math.max(0, timeLeft).toFixed(1)}s</span>
            </div>
          )}
        </div>

        {/* Right Team Info */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 justify-end">
          <span className="bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-bold px-1.5 py-0.2 rounded-full text-[10px] sm:text-xs shrink-0">
            {rightScore}
          </span>
          <span className="font-bold text-xs sm:text-sm text-blue-600 dark:text-blue-400 truncate max-w-[100px] sm:max-w-none">{rightTeamName}</span>
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0"></span>
        </div>
      </div>

      {/* Main Arena Stage with SVG Field & Pullers */}
      <div className="relative h-20 sm:h-24 md:h-28 w-full flex items-center justify-center">
        {/* Floating evaluation banner */}
        {isEvaluating && roundEvaluation && (
          <div className="absolute top-1 z-25 px-2.5 py-0.5 rounded-full bg-stone-900/90 text-white text-[11px] font-bold shadow-md border border-amber-400 flex items-center gap-1">
            <span>{roundEvaluation.message}</span>
          </div>
        )}
        {/* Ground lines and boundary marks */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-end pb-2">
          {/* Ground texture bar */}
          <div className="h-4 sm:h-5 w-full bg-gradient-to-r from-amber-200/70 via-stone-300/60 to-amber-200/70 dark:from-stone-800 dark:via-stone-700 dark:to-stone-800 border-t-2 border-dashed border-amber-300 dark:border-stone-600 relative">
            {/* Center mark */}
            <div className="absolute left-1/2 -top-7 sm:-top-8 bottom-0 w-1 bg-amber-500/80 dark:bg-amber-400 -translate-x-1/2 flex flex-col items-center">
              <span className="absolute -top-4 text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest bg-amber-100/90 dark:bg-stone-800 px-1 py-0.2 rounded">
                Giữa
              </span>
            </div>
            {/* Left knock-out danger mark */}
            <div className="absolute left-[20%] -top-4 bottom-0 w-0.5 bg-rose-400/60 border-l border-dashed border-rose-500">
              <span className="absolute -top-3.5 -translate-x-1/2 text-[8px] font-semibold text-rose-500">Đỏ</span>
            </div>
            {/* Right knock-out danger mark */}
            <div className="absolute right-[20%] -top-4 bottom-0 w-0.5 bg-blue-400/60 border-r border-dashed border-blue-500">
              <span className="absolute -top-3.5 -translate-x-1/2 text-[8px] font-semibold text-blue-500">Xanh</span>
            </div>
          </div>
        </div>

        {/* Dynamic Motion Rope & Pulling Teams System */}
        <motion.div
          className="relative w-full max-w-4xl h-full flex items-center justify-center px-2 sm:px-4"
          animate={{ x: `${offsetPercent}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        >
          {/* Left Team Characters (3 Pullers) */}
          <div className="flex items-center gap-0.5 sm:gap-1.5 mr-1.5 sm:mr-2 z-10">
            {/* Character 3 (Anchor / Người neo đuôi) */}
            <PullerCharacter
              team="left"
              role="anchor"
              isPulling={isPulling === 'left'}
              isBeingPulled={isPulling === 'right'}
            />
            {/* Character 2 (Middle / Người giữa) */}
            <PullerCharacter
              team="left"
              role="mid"
              isPulling={isPulling === 'left'}
              isBeingPulled={isPulling === 'right'}
            />
            {/* Character 1 (Front Leader / Người dẫn đầu) */}
            <PullerCharacter
              team="left"
              role="front"
              isPulling={isPulling === 'left'}
              isBeingPulled={isPulling === 'right'}
            />
          </div>

          {/* The Rope & Center Ribbon */}
          <div className="relative flex-1 min-w-[90px] sm:min-w-[140px] md:min-w-[180px] h-10 flex items-center justify-center">
            {/* Rope with realistic braided pattern */}
            <div className="w-full h-3 sm:h-4 bg-gradient-to-b from-amber-700 via-yellow-600 to-amber-900 rounded-full shadow-md relative overflow-hidden border border-amber-800">
              {/* Rope fiber twist texture */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, #451a03 0, #451a03 3px, transparent 3px, transparent 8px)',
                }}
              />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(-45deg, #fef08a 0, #fef08a 2px, transparent 2px, transparent 8px)',
                }}
              />
            </div>

            {/* Center Red Ribbon / Flag */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-20"
              animate={
                isPulling
                  ? {
                      rotate: isPulling === 'left' ? [-6, -14, -8] : [6, 14, 8],
                      scale: [1, 1.15, 1],
                    }
                  : { rotate: [0, -1, 1, 0] }
              }
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              {/* Knot */}
              <div className="w-3.5 h-3.5 bg-red-600 rounded-full shadow-md border border-red-800 flex items-center justify-center">
                <div className="w-1 h-1 bg-red-300 rounded-full"></div>
              </div>
              {/* Red Ribbon Tails */}
              <div className="w-2 h-6 bg-gradient-to-b from-red-600 to-red-700 rounded-b shadow-xs -mt-0.5 origin-top"></div>
            </motion.div>
          </div>

          {/* Right Team Characters (3 Pullers) */}
          <div className="flex items-center gap-0.5 sm:gap-1.5 ml-1.5 sm:ml-2 z-10">
            {/* Character 1 (Front Leader) */}
            <PullerCharacter
              team="right"
              role="front"
              isPulling={isPulling === 'right'}
              isBeingPulled={isPulling === 'left'}
            />
            {/* Character 2 (Middle) */}
            <PullerCharacter
              team="right"
              role="mid"
              isPulling={isPulling === 'right'}
              isBeingPulled={isPulling === 'left'}
            />
            {/* Character 3 (Anchor) */}
            <PullerCharacter
              team="right"
              role="anchor"
              isPulling={isPulling === 'right'}
              isBeingPulled={isPulling === 'left'}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

interface PullerCharacterProps {
  team: 'left' | 'right';
  role: 'front' | 'mid' | 'anchor';
  isPulling: boolean;
  isBeingPulled: boolean;
}

const PullerCharacter: React.FC<PullerCharacterProps> = ({ team, role, isPulling, isBeingPulled }) => {
  const isLeft = team === 'left';
  const mainColor = isLeft ? '#ef4444' : '#3b82f6';
  const headBandColor = isLeft ? '#b91c1c' : '#1d4ed8';
  const pantsColor = isLeft ? '#7f1d1d' : '#1e3a8a';

  // Leaning angle when pulling or being dragged
  const leanAngle = isPulling ? (isLeft ? -22 : 22) : isBeingPulled ? (isLeft ? 10 : -10) : isLeft ? -8 : 8;

  // Size variation based on role: anchor is bigger!
  const scale = role === 'anchor' ? 1.08 : role === 'mid' ? 0.98 : 1.02;

  return (
    <motion.div
      className="relative flex flex-col items-center origin-bottom"
      animate={{
        rotate: leanAngle,
        y: isPulling ? [0, -3, 0] : isBeingPulled ? [0, 2, 0] : 0,
        scale,
      }}
      transition={{ type: 'spring', stiffness: 180, damping: 12 }}
    >
      {/* SVG Cartoon Character */}
      <svg
        viewBox="0 0 54 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-9 h-[52px] sm:w-11 sm:h-16 ${isLeft ? '' : 'scale-x-[-1]'}`}
      >
        {/* Headband & Hair */}
        <path d="M18 14C18 7 24 3 31 3C38 3 44 7 44 14V17H18V14Z" fill="#292524" />
        <rect x="17" y="14" width="28" height="5" rx="2" fill={headBandColor} />
        {/* Headband tail waving */}
        <path
          d={isPulling ? "M17 16C12 14 7 10 4 14C3 17 8 18 15 17Z" : "M17 16C13 18 9 20 6 23C7 25 11 22 16 19Z"}
          fill={headBandColor}
        />

        {/* Head / Face */}
        <circle cx="31" cy="20" r="10" fill="#fed7aa" />

        {/* Facial Expression */}
        {isPulling ? (
          // Determined grit face / gồng mình
          <>
            <path d="M26 18L30 20" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
            <path d="M37 18L33 20" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="28" cy="20" rx="1.5" ry="1.5" fill="#451a03" />
            <ellipse cx="35" cy="20" rx="1.5" ry="1.5" fill="#451a03" />
            <path d="M28 25C29 23 34 23 35 25" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
            {/* Sweat drop */}
            <path d="M38 12C39 10 41 12 40 14C39 15 38 14 38 12Z" fill="#38bdf8" />
          </>
        ) : isBeingPulled ? (
          // Strained / panic face / bị trượt
          <>
            <circle cx="27" cy="19" r="2.5" fill="#ffffff" />
            <circle cx="27" cy="19" r="1.5" fill="#451a03" />
            <circle cx="35" cy="19" r="2.5" fill="#ffffff" />
            <circle cx="35" cy="19" r="1.5" fill="#451a03" />
            <ellipse cx="31" cy="24" rx="2" ry="3" fill="#451a03" />
          </>
        ) : (
          // Confident ready smile face
          <>
            <circle cx="28" cy="19" r="1.5" fill="#451a03" />
            <circle cx="35" cy="19" r="1.5" fill="#451a03" />
            <path d="M29 23C30 25 33 25 34 23" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" />
          </>
        )}

        {/* Torso & Shirt */}
        <path
          d="M21 28C21 27 25 26 31 26C37 26 41 27 41 28L44 48C44 50 42 51 40 51H22C20 51 18 50 18 48L21 28Z"
          fill={mainColor}
        />
        {/* Team number on back/chest */}
        <text
          x="31"
          y="42"
          textAnchor="middle"
          fontSize="10"
          fontWeight="bold"
          fill="#ffffff"
          opacity="0.9"
        >
          {role === 'anchor' ? '3' : role === 'mid' ? '2' : '1'}
        </text>

        {/* Arms gripping rope */}
        <path
          d={
            isPulling
              ? "M21 34L11 40C9 41 9 44 12 45L22 42"
              : "M22 34L14 38C12 39 12 42 15 43L23 40"
          }
          stroke="#fdba74"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="11" cy="42" r="3.5" fill="#ea580c" />

        {/* Pants */}
        <path d="M22 50H40L42 62H33L31 54L29 62H20L22 50Z" fill={pantsColor} />

        {/* Shoes bracing ground */}
        <rect x="16" y="62" width="13" height="7" rx="3" fill="#1c1917" />
        <rect x="33" y="62" width="13" height="7" rx="3" fill="#1c1917" />
      </svg>

      {/* Role tag */}
      <span className="text-[9px] font-semibold text-stone-500 dark:text-stone-400 mt-0.5">
        {role === 'anchor' ? 'Trụ Đuôi' : role === 'mid' ? 'Tiếp Lực' : 'Tiên Phong'}
      </span>
    </motion.div>
  );
};
