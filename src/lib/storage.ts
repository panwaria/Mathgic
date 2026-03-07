import { UserProgress, Category } from '../types';

const STORAGE_KEY = 'math-kangaroo-progress';

export const defaultProgress: UserProgress = {
  totalScore: 0,
  level: 1,
  xp: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastPlayedDate: '',
  quizzesCompleted: 0,
  questionsAnswered: 0,
  categoryStats: {
    geometry: { correct: 0, total: 0 },
    'number-sense': { correct: 0, total: 0 },
    logic: { correct: 0, total: 0 },
  },
  difficultyStats: {
    3: { correct: 0, total: 0 },
    4: { correct: 0, total: 0 },
    5: { correct: 0, total: 0 },
  },
  earnedBadgeIds: [],
  quizHistory: [],
  categoriesExplored: [],
};

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultProgress };
    const parsed = JSON.parse(raw);
    return { ...defaultProgress, ...parsed };
  } catch {
    return { ...defaultProgress };
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    const trimmed = {
      ...progress,
      quizHistory: progress.quizHistory.slice(-50),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // localStorage full or unavailable
  }
}

export function clearProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}

const AI_CACHE_KEY = 'math-kangaroo-ai-cache';

export function loadAICache(): unknown[] {
  try {
    const raw = localStorage.getItem(AI_CACHE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAICache(questions: unknown[]): void {
  try {
    const trimmed = questions.slice(-100);
    localStorage.setItem(AI_CACHE_KEY, JSON.stringify(trimmed));
  } catch {
    // ignore
  }
}

export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function isConsecutiveDay(dateStr: string): boolean {
  if (!dateStr) return false;
  const last = new Date(dateStr);
  const today = new Date(getTodayDate());
  const diff = today.getTime() - last.getTime();
  const daysDiff = diff / (1000 * 60 * 60 * 24);
  return daysDiff === 1;
}

export function isSameDay(dateStr: string): boolean {
  return dateStr === getTodayDate();
}

export function getCategoryLabel(cat: Category): string {
  switch (cat) {
    case 'geometry': return 'Geometry';
    case 'number-sense': return 'Number Sense';
    case 'logic': return 'Logic';
  }
}
