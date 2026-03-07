import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { UserProgress, QuizSession, Category } from '../types';
import { loadProgress, saveProgress, defaultProgress, getTodayDate, isConsecutiveDay, isSameDay } from '../lib/storage';
import { getLevelFromXP, evaluateBadges, calculateQuizScore } from '../lib/scoring';

interface ProgressContextValue {
  progress: UserProgress;
  addQuizResult: (session: QuizSession) => string[];
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const addQuizResult = useCallback((session: QuizSession): string[] => {
    let updated = { ...progress };

    // Score
    const score = calculateQuizScore(session);
    updated.totalScore += score;
    updated.xp += score;
    updated.quizzesCompleted += 1;
    updated.questionsAnswered += session.answers.length;

    // Level
    const { level } = getLevelFromXP(updated.xp);
    updated.level = level;

    // Category stats
    const newCategoryStats = { ...updated.categoryStats };
    const newDifficultyStats = { ...updated.difficultyStats };
    const newCategories = [...updated.categoriesExplored];

    for (const ans of session.answers) {
      const q = session.questions.find(q => q.id === ans.questionId);
      if (!q) continue;

      newCategoryStats[q.category] = {
        correct: (newCategoryStats[q.category]?.correct ?? 0) + (ans.correct ? 1 : 0),
        total: (newCategoryStats[q.category]?.total ?? 0) + 1,
      };

      newDifficultyStats[q.difficulty] = {
        correct: (newDifficultyStats[q.difficulty]?.correct ?? 0) + (ans.correct ? 1 : 0),
        total: (newDifficultyStats[q.difficulty]?.total ?? 0) + 1,
      };

      if (!newCategories.includes(q.category)) {
        newCategories.push(q.category);
      }
    }

    updated.categoryStats = newCategoryStats;
    updated.difficultyStats = newDifficultyStats;
    updated.categoriesExplored = newCategories;

    // Streak
    const today = getTodayDate();
    if (!isSameDay(updated.lastPlayedDate)) {
      if (isConsecutiveDay(updated.lastPlayedDate)) {
        updated.currentStreak += 1;
      } else if (updated.lastPlayedDate === '') {
        updated.currentStreak = 1;
      } else {
        updated.currentStreak = 1;
      }
      updated.longestStreak = Math.max(updated.longestStreak, updated.currentStreak);
    }
    updated.lastPlayedDate = today;

    // Quiz history
    const completedSession = { ...session, score, maxScore: session.questions.reduce((t, q) => t + q.difficulty, 0) };
    updated.quizHistory = [...updated.quizHistory, completedSession].slice(-50);

    // Badges
    const newBadgeIds = evaluateBadges(updated, completedSession);
    updated.earnedBadgeIds = [...updated.earnedBadgeIds, ...newBadgeIds];

    setProgress(updated);
    return newBadgeIds;
  }, [progress]);

  const resetProgress = useCallback(() => {
    setProgress({ ...defaultProgress });
  }, []);

  return (
    <ProgressContext.Provider value={{ progress, addQuizResult, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
