export type Category = 'geometry' | 'number-sense' | 'logic';
export type Difficulty = 3 | 4 | 5;
export type QuestionSource = 'bank' | 'ai';

export interface Question {
  id: string;
  text: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  category: Category;
  difficulty: Difficulty;
  source: QuestionSource;
}

export interface QuizConfig {
  mode: 'practice' | 'mock-exam';
  category: Category | 'mixed';
  difficulty: Difficulty | 'mixed';
  questionCount: number;
  timed: boolean;
  timeLimitSeconds?: number;
}

export interface QuizAnswer {
  questionId: string;
  selectedIndex: number | null;
  correct: boolean;
  timeSpentSeconds: number;
}

export interface QuizSession {
  id: string;
  config: QuizConfig;
  questions: Question[];
  answers: QuizAnswer[];
  score: number;
  maxScore: number;
  startedAt: string;
  completedAt: string;
}

export interface CategoryStats {
  correct: number;
  total: number;
}

export interface UserProgress {
  totalScore: number;
  level: number;
  xp: number;
  currentStreak: number;
  longestStreak: number;
  lastPlayedDate: string;
  quizzesCompleted: number;
  questionsAnswered: number;
  categoryStats: Record<Category, CategoryStats>;
  difficultyStats: Record<Difficulty, CategoryStats>;
  earnedBadgeIds: string[];
  quizHistory: QuizSession[];
  categoriesExplored: Category[];
}

export type BadgeConditionType =
  | 'quizzes_completed'
  | 'total_points'
  | 'perfect_score'
  | 'category_accuracy'
  | 'streak'
  | 'speed'
  | 'categories_explored'
  | 'hard_attempted';

export interface BadgeCondition {
  type: BadgeConditionType;
  value?: number;
  category?: Category;
  minQuestions?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  condition: BadgeCondition;
}

export type MascotMood = 'thinking' | 'happy' | 'encouraging' | 'celebrating';
