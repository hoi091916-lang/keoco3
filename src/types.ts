export type DifficultyLevel = 'nhanh' | 'vua' | 'kho' | 'chuyen_gia' | 'progressive';

export interface Question {
  id: string;
  question: string;
  options: [string, string, string, string]; // 4 đáp án A, B, C, D
  correctIndex: number; // 0, 1, 2, 3
  explanation?: string;
  difficulty: 'nhanh' | 'vua' | 'kho' | 'chuyen_gia';
  category: string;
}

export type TeamSide = 'left' | 'right';

export interface TeamConfig {
  id: TeamSide;
  name: string;
  color: string;
  bgGradient: string;
  textColor: string;
  borderColor: string;
  badgeBg: string;
  avatarIcon: string;
  keysDescription: string;
  keys: {
    key: string;
    label: string;
    optionIndex: number;
  }[];
}

export interface PlayerAnswerState {
  hasAnswered: boolean;
  selectedIndex: number | null; // 0-3
  timeSpentMs: number; // thời gian từ khi hiện câu hỏi đến khi chốt
  isCorrect: boolean | null;
}

export interface RoundResult {
  roundNumber: number;
  question: Question;
  leftAnswer: PlayerAnswerState;
  rightAnswer: PlayerAnswerState;
  pullWinner: 'left' | 'right' | 'draw';
  pullForce: number; // bao nhiêu pixel / phần trăm kéo
  ropePositionAfter: number; // -100 (left win max) to +100 (right win max)
  description: string;
}

export type GameMode = 'pvp' | 'vs_bot';
export type BotDifficulty = 'easy' | 'medium' | 'hard';
