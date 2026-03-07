import { useState, useCallback } from 'react';
import { Question, Category, Difficulty } from '../types';
import { generateAIQuestions } from '../lib/ai';
import { loadAICache, saveAICache } from '../lib/storage';

interface UseAIQuestionsReturn {
  aiQuestions: Question[];
  loading: boolean;
  error: string | null;
  fetchAIQuestions: (category: Category, difficulty: Difficulty, count?: number) => Promise<Question[]>;
}

export function useAIQuestions(): UseAIQuestionsReturn {
  const [aiQuestions, setAIQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAIQuestions = useCallback(async (
    category: Category,
    difficulty: Difficulty,
    count: number = 3,
  ): Promise<Question[]> => {
    setLoading(true);
    setError(null);

    try {
      const questions = await generateAIQuestions({ category, difficulty, count });

      if (questions.length > 0) {
        setAIQuestions(prev => [...prev, ...questions]);
        // Cache for offline reuse
        const cache = loadAICache() as Question[];
        saveAICache([...cache, ...questions]);
        setLoading(false);
        return questions;
      }

      // Fallback to cache
      const cached = loadAICache() as Question[];
      const matching = cached.filter(
        (q: Question) => q.category === category && q.difficulty === difficulty,
      );
      if (matching.length > 0) {
        const selected = matching.slice(0, count);
        setAIQuestions(prev => [...prev, ...selected]);
        setLoading(false);
        return selected;
      }

      setError('AI questions unavailable. Using practice bank.');
      setLoading(false);
      return [];
    } catch {
      setError('AI questions unavailable. Using practice bank.');
      setLoading(false);
      return [];
    }
  }, []);

  return { aiQuestions, loading, error, fetchAIQuestions };
}
