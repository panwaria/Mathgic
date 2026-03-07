import { useState, useCallback, useRef } from 'react';
import { Question, QuizConfig, QuizAnswer, QuizSession } from '../types';
import { questionBank } from '../data/questions';
import { selectQuestions, selectMockExamQuestions } from '../lib/scoring';

interface UseQuizReturn {
  questions: Question[];
  currentIndex: number;
  currentQuestion: Question | null;
  answers: QuizAnswer[];
  isComplete: boolean;
  timeElapsed: number;
  startQuiz: (config: QuizConfig, aiQuestions?: Question[]) => void;
  submitAnswer: (selectedIndex: number) => boolean;
  nextQuestion: () => void;
  getSession: () => QuizSession;
}

export function useQuiz(): UseQuizReturn {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const questionStartTime = useRef(Date.now());
  const quizStartTime = useRef('');
  const configRef = useRef<QuizConfig | null>(null);

  const startQuiz = useCallback((config: QuizConfig, aiQuestions: Question[] = []) => {
    configRef.current = config;
    let selected: Question[];

    if (config.mode === 'mock-exam') {
      selected = selectMockExamQuestions([...questionBank, ...aiQuestions]);
    } else {
      const pool = [...questionBank, ...aiQuestions];
      selected = selectQuestions(pool, config.category, config.difficulty, config.questionCount);
    }

    setQuestions(selected);
    setCurrentIndex(0);
    setAnswers([]);
    setIsComplete(false);
    setTimeElapsed(0);
    questionStartTime.current = Date.now();
    quizStartTime.current = new Date().toISOString();
  }, []);

  const submitAnswer = useCallback((selectedIndex: number): boolean => {
    const q = questions[currentIndex];
    if (!q) return false;

    const timeSpent = (Date.now() - questionStartTime.current) / 1000;
    const correct = selectedIndex === q.correctIndex;

    const answer: QuizAnswer = {
      questionId: q.id,
      selectedIndex,
      correct,
      timeSpentSeconds: Math.round(timeSpent),
    };

    setAnswers(prev => [...prev, answer]);
    setTimeElapsed(prev => prev + Math.round(timeSpent));
    return correct;
  }, [questions, currentIndex]);

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setIsComplete(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      questionStartTime.current = Date.now();
    }
  }, [currentIndex, questions.length]);

  const getSession = useCallback((): QuizSession => {
    const score = answers.reduce((total, ans) => {
      if (!ans.correct) return total;
      const q = questions.find(q => q.id === ans.questionId);
      return total + (q?.difficulty ?? 3);
    }, 0);

    const maxScore = questions.reduce((t, q) => t + q.difficulty, 0);

    return {
      id: `quiz-${Date.now()}`,
      config: configRef.current!,
      questions,
      answers,
      score,
      maxScore,
      startedAt: quizStartTime.current,
      completedAt: new Date().toISOString(),
    };
  }, [questions, answers]);

  return {
    questions,
    currentIndex,
    currentQuestion: questions[currentIndex] ?? null,
    answers,
    isComplete,
    timeElapsed,
    startQuiz,
    submitAnswer,
    nextQuestion,
    getSession,
  };
}
