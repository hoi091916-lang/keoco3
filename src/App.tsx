import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Trophy,
  RotateCcw,
  Sliders,
  Volume2,
  VolumeX,
  Keyboard,
  ArrowRight,
  Flame,
  Info,
  Home,
  BookOpen,
  Clock,
  Bot,
  Users
} from 'lucide-react';
import {
  Question,
  DifficultyLevel,
  GameMode,
  PlayerAnswerState,
  RoundResult,
} from './types';
import { QUESTIONS_DATABASE } from './data/questions';
import { soundManager } from './utils/audio';
import { TugOfWarArena } from './components/TugOfWarArena';
import { TeamControlPanel } from './components/TeamControlPanel';
import { GameResultModal } from './components/GameResultModal';
import { SettingsModal } from './components/SettingsModal';
import { MainMenu } from './components/MainMenu';
import { QuestionManager } from './components/QuestionManager';

const TOTAL_ROUNDS = 10;

export default function App() {
  // Navigation / View State
  const [viewMode, setViewMode] = useState<'menu' | 'game' | 'questions'>('menu');

  // Custom Questions State with LocalStorage Persistence
  const [allQuestions, setAllQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem('tug_of_war_custom_questions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 4) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved questions', e);
    }
    return QUESTIONS_DATABASE;
  });

  const handleSaveQuestions = (updated: Question[]) => {
    setAllQuestions(updated);
    try {
      localStorage.setItem('tug_of_war_custom_questions', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save questions to localStorage', e);
    }
  };

  // Game Settings State
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('progressive');
  const [gameMode, setGameMode] = useState<GameMode>('pvp');
  const [timePerQuestion, setTimePerQuestion] = useState<number>(12);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [showKeyboardGuide, setShowKeyboardGuide] = useState<boolean>(false);

  // Match State
  const [matchQuestions, setMatchQuestions] = useState<Question[]>([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [ropePosition, setRopePosition] = useState<number>(0); // -100 to +100
  const [leftScore, setLeftScore] = useState<number>(0);
  const [rightScore, setRightScore] = useState<number>(0);
  const [isPulling, setIsPulling] = useState<'left' | 'right' | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [roundHistory, setRoundHistory] = useState<RoundResult[]>([]);
  const [matchElapsedSeconds, setMatchElapsedSeconds] = useState<number>(0);

  // Current Round Answer State
  const [timeLeft, setTimeLeft] = useState<number>(timePerQuestion);
  const [leftAnswer, setLeftAnswer] = useState<PlayerAnswerState>({
    hasAnswered: false,
    selectedIndex: null,
    timeSpentMs: 0,
    isCorrect: null,
  });
  const [rightAnswer, setRightAnswer] = useState<PlayerAnswerState>({
    hasAnswered: false,
    selectedIndex: null,
    timeSpentMs: 0,
    isCorrect: null,
  });

  const [roundEvaluation, setRoundEvaluation] = useState<{
    message: string;
    winner: 'left' | 'right' | 'draw' | null;
  } | null>(null);

  // References
  const matchStartTimeRef = useRef<number>(Date.now());
  const questionStartTimeRef = useRef<number>(Date.now());
  const timerIntervalRef = useRef<number | null>(null);
  const evalTimeoutRef = useRef<number | null>(null);
  const botTimeoutRef = useRef<number | null>(null);

  // Format MM:SS for Total Match Time display
  const formatMatchTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate 10 Questions based on chosen mode from allQuestions
  const generateQuestions = useCallback((lvl: DifficultyLevel): Question[] => {
    const shuffle = (array: Question[]): Question[] => {
      const copy = [...array];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    const database: Question[] = allQuestions.length >= 4 ? allQuestions : QUESTIONS_DATABASE;

    if (lvl === 'progressive') {
      // 3 Nhanh + 3 Vừa + 2 Khó + 2 Chuyên Gia = 10
      const nhanhPool = shuffle(database.filter((q) => q.difficulty === 'nhanh')).slice(0, 3);
      const vuaPool = shuffle(database.filter((q) => q.difficulty === 'vua')).slice(0, 3);
      const khoPool = shuffle(database.filter((q) => q.difficulty === 'kho')).slice(0, 2);
      const chuyenGiaPool = shuffle(database.filter((q) => q.difficulty === 'chuyen_gia')).slice(0, 2);
      const combined: Question[] = [...nhanhPool, ...vuaPool, ...khoPool, ...chuyenGiaPool];

      if (combined.length >= 10) return combined.slice(0, 10);
      // If some pools were short, fill from remainder
      const usedIds = new Set(combined.map((q) => q.id));
      const remaining = shuffle(database.filter((q) => !usedIds.has(q.id)));
      return [...combined, ...remaining].slice(0, Math.min(10, database.length));
    } else {
      const filtered = database.filter((q) => q.difficulty === lvl);
      const shuffled = shuffle(filtered);
      // If pool is less than 10, fill from other categories
      if (shuffled.length >= 10) {
        return shuffled.slice(0, 10);
      } else {
        const remaining = shuffle(database.filter((q) => q.difficulty !== lvl));
        return [...shuffled, ...remaining].slice(0, Math.min(10, database.length));
      }
    }
  }, [allQuestions]);

  // Initialize a fresh new match
  const startNewMatch = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (evalTimeoutRef.current) clearTimeout(evalTimeoutRef.current);
    if (botTimeoutRef.current) clearTimeout(botTimeoutRef.current);

    const qs = generateQuestions(difficulty);
    setMatchQuestions(qs);
    setCurrentRoundIndex(0);
    setRopePosition(0);
    setLeftScore(0);
    setRightScore(0);
    setIsPulling(null);
    setIsEvaluating(false);
    setIsGameOver(false);
    setRoundHistory([]);
    setRoundEvaluation(null);

    setLeftAnswer({
      hasAnswered: false,
      selectedIndex: null,
      timeSpentMs: 0,
      isCorrect: null,
    });
    setRightAnswer({
      hasAnswered: false,
      selectedIndex: null,
      timeSpentMs: 0,
      isCorrect: null,
    });
    setTimeLeft(timePerQuestion);

    matchStartTimeRef.current = Date.now();
    setMatchElapsedSeconds(0);
    questionStartTimeRef.current = Date.now();
    soundManager.playWhistle();
  }, [difficulty, timePerQuestion, generateQuestions]);

  // Match Cumulative Elapsed Timer Loop (Stops when game is over or in other views)
  useEffect(() => {
    if (viewMode !== 'game' || isGameOver) return;

    const interval = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - matchStartTimeRef.current) / 1000);
      setMatchElapsedSeconds(elapsed);
    }, 500);

    return () => clearInterval(interval);
  }, [viewMode, isGameOver]);

  // Start match on mount
  useEffect(() => {
    startNewMatch();
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (evalTimeoutRef.current) clearTimeout(evalTimeoutRef.current);
      if (botTimeoutRef.current) clearTimeout(botTimeoutRef.current);
    };
  }, [startNewMatch]);

  // Sync sound manager enabled state
  useEffect(() => {
    soundManager.enabled = soundEnabled;
  }, [soundEnabled]);

  const currentQuestion = matchQuestions[currentRoundIndex];

  // Evaluate Round when time ends or both players locked in
  const evaluateRound = useCallback(
    (leftAns: PlayerAnswerState, rightAns: PlayerAnswerState) => {
      if (isEvaluating || isGameOver || !currentQuestion) return;

      setIsEvaluating(true);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (botTimeoutRef.current) clearTimeout(botTimeoutRef.current);

      const correctIdx = currentQuestion.correctIndex;
      const leftCorrect = leftAns.hasAnswered && leftAns.selectedIndex === correctIdx;
      const rightCorrect = rightAns.hasAnswered && rightAns.selectedIndex === correctIdx;

      let pullWinner: 'left' | 'right' | 'draw' = 'draw';
      let message = '';
      let force = 0;

      if (leftCorrect && rightCorrect) {
        // Both correct -> Speed determines winner!
        if (leftAns.timeSpentMs < rightAns.timeSpentMs) {
          pullWinner = 'left';
          const diffSec = ((rightAns.timeSpentMs - leftAns.timeSpentMs) / 1000).toFixed(1);
          force = 16;
          message = `Đội Đỏ nhanh hơn ${diffSec}s! Kéo dây +${force}m`;
        } else if (rightAns.timeSpentMs < leftAns.timeSpentMs) {
          pullWinner = 'right';
          const diffSec = ((leftAns.timeSpentMs - rightAns.timeSpentMs) / 1000).toFixed(1);
          force = 16;
          message = `Đội Xanh nhanh hơn ${diffSec}s! Kéo dây +${force}m`;
        } else {
          pullWinner = 'draw';
          message = 'Cả hai cùng trả lời đúng cùng thời gian!';
        }
      } else if (leftCorrect && !rightCorrect) {
        pullWinner = 'left';
        force = 22;
        message = `Chỉ Đội Đỏ đúng! Kéo mạnh +${force}m`;
      } else if (!leftCorrect && rightCorrect) {
        pullWinner = 'right';
        force = 22;
        message = `Chỉ Đội Xanh đúng! Kéo mạnh +${force}m`;
      } else {
        pullWinner = 'draw';
        message = 'Cả hai đội đều trả lời sai!';
      }

      // Sounds
      if (pullWinner === 'left' || pullWinner === 'right') {
        soundManager.playCorrect();
        soundManager.playPullSound(force > 18);
      } else {
        soundManager.playWrong();
      }

      // Update Rope Position
      let newPosition = ropePosition;
      if (pullWinner === 'left') {
        newPosition = Math.max(-100, ropePosition - force);
        setIsPulling('left');
        setLeftScore((prev) => prev + 1);
      } else if (pullWinner === 'right') {
        newPosition = Math.min(100, ropePosition + force);
        setIsPulling('right');
        setRightScore((prev) => prev + 1);
      } else {
        setIsPulling(null);
      }

      setRopePosition(newPosition);

      // Update answer states with correctness
      const finalLeft: PlayerAnswerState = {
        ...leftAns,
        isCorrect: leftCorrect,
      };
      const finalRight: PlayerAnswerState = {
        ...rightAns,
        isCorrect: rightCorrect,
      };

      setLeftAnswer(finalLeft);
      setRightAnswer(finalRight);

      setRoundEvaluation({
        message,
        winner: pullWinner,
      });

      // Save to history
      const roundRes: RoundResult = {
        roundNumber: currentRoundIndex + 1,
        question: currentQuestion,
        leftAnswer: finalLeft,
        rightAnswer: finalRight,
        pullWinner,
        pullForce: force,
        ropePositionAfter: newPosition,
        description: message,
      };
      setRoundHistory((prev) => [...prev, roundRes]);

      // Check if match ends (10 rounds reached or rope pulled past knockout limit ±65m)
      const isKnockout = Math.abs(newPosition) >= 65;
      const isLastRound = currentRoundIndex + 1 >= TOTAL_ROUNDS;

      evalTimeoutRef.current = window.setTimeout(() => {
        setIsPulling(null);
        if (isLastRound || isKnockout) {
          setIsGameOver(true);
          soundManager.playVictory();
        } else {
          // Advance to next question
          advanceToNextRound(currentRoundIndex + 1);
        }
      }, 3400);
    },
    [isEvaluating, isGameOver, currentQuestion, ropePosition, currentRoundIndex]
  );

  // Advance to next round
  const advanceToNextRound = useCallback(
    (nextIdx: number) => {
      setCurrentRoundIndex(nextIdx);
      setIsEvaluating(false);
      setRoundEvaluation(null);
      setIsPulling(null);
      setTimeLeft(timePerQuestion);

      setLeftAnswer({
        hasAnswered: false,
        selectedIndex: null,
        timeSpentMs: 0,
        isCorrect: null,
      });
      setRightAnswer({
        hasAnswered: false,
        selectedIndex: null,
        timeSpentMs: 0,
        isCorrect: null,
      });

      questionStartTimeRef.current = Date.now();
    },
    [timePerQuestion]
  );

  // Manual skip to next question during evaluation
  const handleNextQuestionNow = () => {
    if (!isEvaluating || isGameOver) return;
    if (evalTimeoutRef.current) clearTimeout(evalTimeoutRef.current);
    setIsPulling(null);
    const isKnockout = Math.abs(ropePosition) >= 65;
    const isLastRound = currentRoundIndex + 1 >= TOTAL_ROUNDS;
    if (isLastRound || isKnockout) {
      setIsGameOver(true);
      soundManager.playVictory();
    } else {
      advanceToNextRound(currentRoundIndex + 1);
    }
  };

  // Timer Tick Loop
  useEffect(() => {
    if (isEvaluating || isGameOver || !currentQuestion) return;

    timerIntervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.2) {
          clearInterval(timerIntervalRef.current!);
          // Auto evaluate with whatever answers are locked
          evaluateRound(leftAnswer, rightAnswer);
          return 0;
        }
        if (prev <= 3.2 && prev > 3.0) {
          soundManager.playTick();
        }
        return Math.max(0, +(prev - 0.1).toFixed(1));
      });
    }, 100);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isEvaluating, isGameOver, currentQuestion, leftAnswer, rightAnswer, evaluateRound]);

  // AI Bot logic if gameMode === 'vs_bot'
  useEffect(() => {
    if (gameMode !== 'vs_bot' || isEvaluating || isGameOver || !currentQuestion) return;
    if (rightAnswer.hasAnswered) return;

    // Simulate Bot response time (e.g. between 1.5s and 5.0s)
    const botReactionDelay = Math.floor(Math.random() * 2500) + 1600;

    botTimeoutRef.current = window.setTimeout(() => {
      // 80% chance of correct answer, 20% random error
      const willBeCorrect = Math.random() < 0.82;
      let chosen = currentQuestion.correctIndex;
      if (!willBeCorrect) {
        const wrongOpts = [0, 1, 2, 3].filter((i) => i !== currentQuestion.correctIndex);
        chosen = wrongOpts[Math.floor(Math.random() * wrongOpts.length)];
      }

      const elapsed = Date.now() - questionStartTimeRef.current;
      const botAns: PlayerAnswerState = {
        hasAnswered: true,
        selectedIndex: chosen,
        timeSpentMs: elapsed,
        isCorrect: null,
      };

      setRightAnswer(botAns);

      // If Left team already answered, evaluate immediately!
      if (leftAnswer.hasAnswered) {
        evaluateRound(leftAnswer, botAns);
      }
    }, botReactionDelay);

    return () => {
      if (botTimeoutRef.current) clearTimeout(botTimeoutRef.current);
    };
  }, [currentRoundIndex, gameMode, isEvaluating, isGameOver, currentQuestion, leftAnswer, rightAnswer.hasAnswered, evaluateRound]);

  // Handle Player Selection
  const handleSelectOption = useCallback(
    (side: 'left' | 'right', optionIndex: number) => {
      if (isEvaluating || isGameOver || !currentQuestion) return;

      const elapsed = Date.now() - questionStartTimeRef.current;

      if (side === 'left' && !leftAnswer.hasAnswered) {
        const newLeft: PlayerAnswerState = {
          hasAnswered: true,
          selectedIndex: optionIndex,
          timeSpentMs: elapsed,
          isCorrect: null,
        };
        setLeftAnswer(newLeft);

        // If right has already answered, evaluate immediately!
        if (rightAnswer.hasAnswered) {
          evaluateRound(newLeft, rightAnswer);
        }
      } else if (side === 'right' && !rightAnswer.hasAnswered) {
        const newRight: PlayerAnswerState = {
          hasAnswered: true,
          selectedIndex: optionIndex,
          timeSpentMs: elapsed,
          isCorrect: null,
        };
        setRightAnswer(newRight);

        // If left has already answered, evaluate immediately!
        if (leftAnswer.hasAnswered) {
          evaluateRound(leftAnswer, newRight);
        }
      }
    },
    [isEvaluating, isGameOver, currentQuestion, leftAnswer, rightAnswer, evaluateRound]
  );

  // Global Keyboard Listener for dual-player keyboard control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input or modal is open
      if (isSettingsOpen || isEvaluating || isGameOver) return;

      const key = e.key;

      // Đội Bên Trái: Bàn phím số 1, 2, 3, 4 (hoặc Numpad 1, 2, 3, 4)
      if (key === '1' || key === 'Numpad1') {
        handleSelectOption('left', 0);
      } else if (key === '2' || key === 'Numpad2') {
        handleSelectOption('left', 1);
      } else if (key === '3' || key === 'Numpad3') {
        handleSelectOption('left', 2);
      } else if (key === '4' || key === 'Numpad4') {
        handleSelectOption('left', 3);
      }

      // Đội Bên Phải: Phím mũi tên HOẶC phím chữ
      // Arrow keys: ↑ (0), ← (1), ↓ (2), → (3)
      if (key === 'ArrowUp' || key === 'w' || key === 'W' || key === 'i' || key === 'I') {
        e.preventDefault();
        handleSelectOption('right', 0);
      } else if (key === 'ArrowLeft' || key === 'a' || key === 'A' || key === 'j' || key === 'J') {
        e.preventDefault();
        handleSelectOption('right', 1);
      } else if (key === 'ArrowDown' || key === 's' || key === 'S' || key === 'k' || key === 'K') {
        e.preventDefault();
        handleSelectOption('right', 2);
      } else if (key === 'ArrowRight' || key === 'd' || key === 'D' || key === 'l' || key === 'L') {
        e.preventDefault();
        handleSelectOption('right', 3);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSettingsOpen, isEvaluating, isGameOver, handleSelectOption]);

  const leftTeamName = 'Đội Đỏ (Bên Trái)';
  const rightTeamName = gameMode === 'vs_bot' ? 'Máy (AI Bot)' : 'Đội Xanh (Bên Phải)';

  // RENDER VIEW: 1. MENU CHÍNH
  if (viewMode === 'menu') {
    return (
      <div className="h-screen max-h-screen w-full bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans transition-colors overflow-hidden">
        <MainMenu
          onStartPlay={() => {
            startNewMatch();
            setViewMode('game');
          }}
          onOpenQuestionManager={() => setViewMode('questions')}
          totalQuestions={allQuestions.length}
          difficulty={difficulty}
          onSelectDifficulty={setDifficulty}
          gameMode={gameMode}
          onSelectGameMode={setGameMode}
          timePerQuestion={timePerQuestion}
          onSelectTime={setTimePerQuestion}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((p) => !p)}
          onOpenKeyboardGuide={() => setShowKeyboardGuide(true)}
        />

        {/* Keyboard Guide Modal */}
        {showKeyboardGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-xs">
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 max-w-md w-full border border-stone-200 dark:border-stone-800 shadow-2xl">
              <h3 className="font-extrabold text-base mb-3 text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-amber-500" />
                <span>Hướng Dẫn Phím Bấm Kéo Co</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                  <strong className="text-rose-700 dark:text-rose-400 block mb-1">🔴 ĐỘI ĐỎ (Bên Trái):</strong>
                  Phím số <strong>1</strong> (A) • <strong>2</strong> (B) • <strong>3</strong> (C) • <strong>4</strong> (D)
                </div>
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                  <strong className="text-blue-700 dark:text-blue-400 block mb-1">🔵 ĐỘI XANH (Bên Phải):</strong>
                  Phím mũi tên <strong>↑</strong> / <strong>I</strong> (A) • <strong>←</strong> / <strong>J</strong> (B) • <strong>↓</strong> / <strong>K</strong> (C) • <strong>→</strong> / <strong>L</strong> (D)
                </div>
              </div>
              <button
                onClick={() => setShowKeyboardGuide(false)}
                className="mt-4 w-full py-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-900 rounded-xl font-bold text-xs cursor-pointer"
              >
                Đã Hiểu & Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // RENDER VIEW: 2. QUẢN LÝ CÂU HỎI
  if (viewMode === 'questions') {
    return (
      <div className="h-screen max-h-screen w-full bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans transition-colors overflow-hidden">
        <QuestionManager
          questions={allQuestions}
          onSaveQuestions={handleSaveQuestions}
          onBackToMenu={() => setViewMode('menu')}
          onPlayGame={() => {
            startNewMatch();
            setViewMode('game');
          }}
        />
      </div>
    );
  }

  // RENDER VIEW: 3. TRẬN ĐẤU KÉO CO (GAME)
  return (
    <div className="h-screen max-h-screen w-full bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans transition-colors selection:bg-amber-400 selection:text-stone-900 overflow-hidden">
      {/* Top App Bar */}
      <header className="w-full bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800 shrink-0 z-30 px-3 sm:px-4 py-1.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Menu Button */}
            <button
              id="back-menu-btn"
              type="button"
              onClick={() => setViewMode('menu')}
              className="p-1.5 px-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="Quay lại Menu chính"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Menu</span>
            </button>

            {/* Logo icon */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-xs font-black text-sm">
              🪢
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-extrabold tracking-tight flex items-center gap-1.5 leading-none">
                KÉO CO ĐẤU TRÍ
                <span className="hidden sm:inline-block text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300/80 dark:border-amber-800">
                  Tug of War
                </span>
              </h1>
              <p className="text-[10px] text-stone-500 font-medium hidden sm:block mt-0.5">Trắc nghiệm đối kháng 10 câu</p>
            </div>
          </div>

          {/* BẢNG TỔNG THỜI GIAN ĐÃ CHƠI (TRÊN ĐẦU MÀN HÌNH) */}
          <div
            id="match-elapsed-timer-board"
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 bg-amber-500/10 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/80 rounded-xl shadow-xs"
            title="Bảng tổng thời gian đã chơi trong trận này"
          >
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 dark:text-amber-400 animate-spin-slow shrink-0" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1.5 leading-none">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-amber-900 dark:text-amber-300 whitespace-nowrap">
                THỜI GIAN TRẬN
              </span>
              <span className="font-mono font-black text-xs sm:text-sm text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-900 px-1.5 sm:px-2 py-0.5 rounded-md border border-amber-200 dark:border-stone-700 shadow-inner tracking-wider">
                {formatMatchTime(matchElapsedSeconds)}
              </span>
            </div>
          </div>

          {/* Quick Mode Switcher: 2 Người (PvP) vs Đấu Với Máy (AI) */}
          <div
            id="header-mode-toggle-group"
            className="flex items-center p-0.5 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl shadow-2xs"
            title="Chọn đối thủ: Chơi 2 người hoặc Đấu với Máy"
          >
            <button
              id="header-mode-pvp-btn"
              type="button"
              onClick={() => {
                if (gameMode !== 'pvp') {
                  setGameMode('pvp');
                  startNewMatch();
                }
              }}
              className={`px-2 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1 transition cursor-pointer ${
                gameMode === 'pvp'
                  ? 'bg-white dark:bg-stone-900 text-rose-600 dark:text-rose-400 border border-stone-200 dark:border-stone-700 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-rose-500" />
              <span className="hidden sm:inline">2 Người (PvP)</span>
              <span className="sm:hidden">2 Người</span>
            </button>
            <button
              id="header-mode-bot-btn"
              type="button"
              onClick={() => {
                if (gameMode !== 'vs_bot') {
                  setGameMode('vs_bot');
                  startNewMatch();
                }
              }}
              className={`px-2 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1 transition cursor-pointer ${
                gameMode === 'vs_bot'
                  ? 'bg-white dark:bg-stone-900 text-blue-600 dark:text-blue-400 border border-stone-200 dark:border-stone-700 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-blue-500" />
              <span className="hidden sm:inline">Với Máy (AI)</span>
              <span className="sm:hidden">Với Máy</span>
            </button>
          </div>

          {/* Top Quick Actions */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Quick Time Setting Indicator & Modal Trigger */}
            <button
              id="header-time-setting-btn"
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-[11px] font-bold hover:bg-amber-100 dark:hover:bg-amber-950/60 transition cursor-pointer"
              title="Tùy chỉnh thời gian mỗi câu hỏi"
            >
              <span>⏱️ {timePerQuestion}s/câu</span>
              <Sliders className="w-2.5 h-2.5 opacity-70" />
            </button>

            {/* Question Manager Button */}
            <button
              id="header-questions-btn"
              type="button"
              onClick={() => setViewMode('questions')}
              className="p-1.5 px-2 rounded-lg bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
              title="Quản lý câu hỏi"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden md:inline text-[11px]">Câu Hỏi</span>
            </button>

            {/* Keyboard Guide Toggle */}
            <button
              id="guide-toggle-btn"
              type="button"
              onClick={() => setShowKeyboardGuide((p) => !p)}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer border ${
                showKeyboardGuide
                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-800'
                  : 'bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
              }`}
              title="Xem hướng dẫn phím bấm"
            >
              <Keyboard className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden md:inline text-[11px]">Phím Bấm</span>
            </button>

            {/* Sound Toggle */}
            <button
              id="sound-toggle-btn"
              type="button"
              onClick={() => setSoundEnabled((p) => !p)}
              className="p-1.5 rounded-lg bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700 transition cursor-pointer"
              title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              )}
            </button>

            {/* Restart Match */}
            <button
              id="restart-match-btn"
              type="button"
              onClick={startNewMatch}
              className="p-1.5 rounded-lg bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700 transition cursor-pointer"
              title="Bắt đầu lại trận mới"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Settings Modal */}
            <button
              id="open-settings-btn"
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              className="py-1 px-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-xs transition flex items-center gap-1 cursor-pointer"
            >
              <Sliders className="w-3 h-3" />
              <span className="text-[11px]">Cài Đặt</span>
            </button>
          </div>
        </div>
      </header>

      {/* Keyboard Quick Bar Notification if active */}
      {showKeyboardGuide && (
        <div className="bg-amber-50 dark:bg-stone-900 border-b border-amber-200 dark:border-stone-800 px-3 py-1 text-[11px] text-stone-700 dark:text-stone-300 shrink-0">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-rose-600 dark:text-rose-400">ĐỘI ĐỎ:</span>
              <span className="font-mono bg-white dark:bg-stone-800 px-1.5 py-0.2 rounded border font-semibold">
                Phím 1=A • 2=B • 3=C • 4=D
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-blue-600 dark:text-blue-400">ĐỘI XANH:</span>
              <span className="font-mono bg-white dark:bg-stone-800 px-1.5 py-0.2 rounded border font-semibold">
                Phím ↑/I=A • ←/J=B • ↓/K=C • →/L=D
              </span>
            </div>
            <button
              onClick={() => setShowKeyboardGuide(false)}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-[10px] underline cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Main Workspace: Single-screen competitive layout */}
      <main className="flex-1 min-h-0 max-w-6xl w-full mx-auto p-2 sm:p-2.5 flex flex-col gap-2 justify-between overflow-y-auto sm:overflow-hidden">
        {/* 1. Tug of War Dynamic Arena with Round, Timer & Tension Ribbon */}
        <TugOfWarArena
          ropePosition={ropePosition}
          isPulling={isPulling}
          leftScore={leftScore}
          rightScore={rightScore}
          leftTeamName={leftTeamName}
          rightTeamName={rightTeamName}
          roundNumber={currentRoundIndex + 1}
          totalRounds={TOTAL_ROUNDS}
          timeLeft={timeLeft}
          totalTime={timePerQuestion}
          isEvaluating={isEvaluating}
          roundEvaluation={roundEvaluation}
          onNextQuestionNow={handleNextQuestionNow}
          isGameOver={isGameOver}
        />

        {/* 2. Dual Team Stations: Question on both sides & Answers below */}
        {currentQuestion ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 flex-1 min-h-0">
            {/* Left Team Station (Đội Đỏ): Bảng câu hỏi ở trên, trả lời ở dưới */}
            <TeamControlPanel
              side="left"
              teamName={leftTeamName}
              question={currentQuestion}
              roundNumber={currentRoundIndex + 1}
              totalRounds={TOTAL_ROUNDS}
              answerState={leftAnswer}
              isEvaluating={isEvaluating}
              onSelectOption={(idx) => handleSelectOption('left', idx)}
              disabled={isEvaluating || isGameOver}
            />

            {/* Right Team Station (Đội Xanh / Máy): Bảng câu hỏi ở trên, trả lời ở dưới */}
            <TeamControlPanel
              side="right"
              teamName={rightTeamName}
              question={currentQuestion}
              roundNumber={currentRoundIndex + 1}
              totalRounds={TOTAL_ROUNDS}
              answerState={rightAnswer}
              isEvaluating={isEvaluating}
              onSelectOption={(idx) => handleSelectOption('right', idx)}
              disabled={isEvaluating || isGameOver || gameMode === 'vs_bot'}
              isBot={gameMode === 'vs_bot'}
            />
          </div>
        ) : (
          <div className="p-4 text-center bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800">
            <p className="text-xs">Đang chuẩn bị câu hỏi kéo co...</p>
          </div>
        )}
      </main>

      {/* Footer info & Rules summary */}
      <footer className="w-full border-t border-stone-200 dark:border-stone-800 py-1.5 px-3 text-center text-[10px] sm:text-[11px] text-stone-500 shrink-0">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <Info className="w-3 h-3 text-stone-400" />
            <span>
              Luật chơi: Trả lời đúng & nhanh hơn để kéo dây. Đội kéo xa hơn sau 10 câu sẽ thắng!
            </span>
          </div>
          <div className="font-mono text-[10px] text-stone-400">
            {difficulty.toUpperCase()} • {TOTAL_ROUNDS} Câu • {timePerQuestion}s/câu
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        difficulty={difficulty}
        onSelectDifficulty={setDifficulty}
        gameMode={gameMode}
        onSelectGameMode={setGameMode}
        timePerQuestion={timePerQuestion}
        onSelectTime={setTimePerQuestion}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((p) => !p)}
        onRestart={startNewMatch}
      />

      {/* Game Result Modal (After 10 Questions or Knockout) */}
      {isGameOver && (
        <GameResultModal
          ropePosition={ropePosition}
          leftScore={leftScore}
          rightScore={rightScore}
          leftTeamName={leftTeamName}
          rightTeamName={rightTeamName}
          history={roundHistory}
          totalMatchSeconds={matchElapsedSeconds}
          onPlayAgain={startNewMatch}
          onOpenSettings={() => {
            setIsSettingsOpen(true);
          }}
          onBackToMenu={() => {
            setViewMode('menu');
          }}
        />
      )}
    </div>
  );
}
