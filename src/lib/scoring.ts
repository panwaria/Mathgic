import { UserProgress, QuizSession, Badge, BadgeCondition, Category, Difficulty } from '../types';
import { badges } from '../data/badges';

export const LEVEL_THRESHOLDS = [
  { level: 1, name: 'Joey', xp: 0 },
  { level: 2, name: 'Hopper', xp: 50 },
  { level: 3, name: 'Bounder', xp: 120 },
  { level: 4, name: 'Sprinter', xp: 220 },
  { level: 5, name: 'Leaper', xp: 350 },
  { level: 6, name: 'Jumper', xp: 520 },
  { level: 7, name: 'Dasher', xp: 730 },
  { level: 8, name: 'Soarer', xp: 1000 },
  { level: 9, name: 'Champion', xp: 1300 },
  { level: 10, name: 'Math Kangaroo Master', xp: 1600 },
] as const;

export function getLevelFromXP(xp: number): { level: number; name: string } {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i].xp) {
      return { level: LEVEL_THRESHOLDS[i].level, name: LEVEL_THRESHOLDS[i].name };
    }
  }
  return { level: 1, name: 'Joey' };
}

export function getXPForNextLevel(xp: number): { current: number; needed: number; progress: number } {
  const currentLevel = getLevelFromXP(xp);
  const nextThreshold = LEVEL_THRESHOLDS.find(t => t.level === currentLevel.level + 1);
  if (!nextThreshold) {
    return { current: xp, needed: xp, progress: 1 };
  }
  const currentThreshold = LEVEL_THRESHOLDS.find(t => t.level === currentLevel.level)!;
  const xpInLevel = xp - currentThreshold.xp;
  const xpNeeded = nextThreshold.xp - currentThreshold.xp;
  return {
    current: xpInLevel,
    needed: xpNeeded,
    progress: xpInLevel / xpNeeded,
  };
}

export function calculateQuizScore(session: QuizSession): number {
  return session.answers.reduce((total, ans) => {
    if (!ans.correct) return total;
    const q = session.questions.find(q => q.id === ans.questionId);
    return total + (q?.difficulty ?? 3);
  }, 0);
}

function checkBadgeCondition(condition: BadgeCondition, progress: UserProgress, latestSession?: QuizSession): boolean {
  switch (condition.type) {
    case 'quizzes_completed':
      return progress.quizzesCompleted >= (condition.value ?? 0);

    case 'total_points':
      return progress.totalScore >= (condition.value ?? 0);

    case 'perfect_score':
      if (!latestSession) return false;
      return latestSession.answers.length > 0 && latestSession.answers.every(a => a.correct);

    case 'category_accuracy': {
      const cat = condition.category as Category;
      const stats = progress.categoryStats[cat];
      if (!stats || stats.total < (condition.minQuestions ?? 0)) return false;
      return (stats.correct / stats.total) * 100 >= (condition.value ?? 80);
    }

    case 'streak':
      return progress.currentStreak >= (condition.value ?? 0) ||
             progress.longestStreak >= (condition.value ?? 0);

    case 'speed':
      if (!latestSession) return false;
      const totalTime = latestSession.answers.reduce((t, a) => t + a.timeSpentSeconds, 0);
      const avgTime = totalTime / latestSession.answers.length;
      return avgTime < (condition.value ?? 30);

    case 'categories_explored':
      return progress.categoriesExplored.length >= (condition.value ?? 3);

    case 'hard_attempted':
      if (!latestSession) return false;
      return latestSession.questions.some(q => q.difficulty === 5);

    default:
      return false;
  }
}

export function evaluateBadges(progress: UserProgress, latestSession?: QuizSession): string[] {
  const newBadges: string[] = [];
  for (const badge of badges) {
    if (progress.earnedBadgeIds.includes(badge.id)) continue;
    if (checkBadgeCondition(badge.condition, progress, latestSession)) {
      newBadges.push(badge.id);
    }
  }
  return newBadges;
}

export function selectQuestions(
  bank: import('../types').Question[],
  category: import('../types').Category | 'mixed',
  difficulty: Difficulty | 'mixed',
  count: number,
): import('../types').Question[] {
  let filtered = [...bank];

  if (category !== 'mixed') {
    filtered = filtered.filter(q => q.category === category);
  }
  if (difficulty !== 'mixed') {
    filtered = filtered.filter(q => q.difficulty === difficulty);
  }

  // Shuffle
  for (let i = filtered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
  }

  return filtered.slice(0, count);
}

export function selectMockExamQuestions(
  bank: import('../types').Question[],
): import('../types').Question[] {
  const easy = bank.filter(q => q.difficulty === 3);
  const medium = bank.filter(q => q.difficulty === 4);
  const hard = bank.filter(q => q.difficulty === 5);

  const shuffle = <T>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  return [
    ...shuffle(easy).slice(0, 8),
    ...shuffle(medium).slice(0, 8),
    ...shuffle(hard).slice(0, 8),
  ];
}
