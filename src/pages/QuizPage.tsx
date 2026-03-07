import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import AnswerFeedback from '../components/AnswerFeedback';
import StarRating from '../components/StarRating';
import { useQuiz } from '../hooks/useQuiz';
import { useAIQuestions } from '../hooks/useAIQuestions';
import { useProgress } from '../hooks/useProgress';
import { QuizConfig } from '../types';

export default function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as Record<string, unknown> | null;

  const { questions, currentIndex, currentQuestion, answers, isComplete, startQuiz, submitAnswer, nextQuestion, getSession } = useQuiz();
  const { fetchAIQuestions } = useAIQuestions();
  const { addQuizResult } = useProgress();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const initialized = useRef(false);

  // Timer state for mock exam
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const isMockExam = state?.mode === 'mock-exam';

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const init = async () => {
      const config: QuizConfig = isMockExam
        ? { mode: 'mock-exam', category: 'mixed', difficulty: 'mixed', questionCount: 24, timed: true, timeLimitSeconds: 75 * 60 }
        : {
            mode: 'practice',
            category: (state?.category as QuizConfig['category']) ?? 'mixed',
            difficulty: (state?.difficulty as QuizConfig['difficulty']) ?? 'mixed',
            questionCount: (state?.questionCount as number) ?? 5,
            timed: false,
          };

      let aiQ: import('../types').Question[] = [];
      if (state?.useAI && config.category !== 'mixed' && config.difficulty !== 'mixed') {
        aiQ = await fetchAIQuestions(config.category as import('../types').Category, config.difficulty as import('../types').Difficulty, 3);
      }

      startQuiz(config, aiQ);
      if (config.timed && config.timeLimitSeconds) {
        setTimeLeft(config.timeLimitSeconds);
      }
    };

    init();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft(t => (t ?? 1) - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  // Auto-finish on timer expire
  useEffect(() => {
    if (timeLeft === 0 && !isComplete) {
      handleFinish();
    }
  }, [timeLeft, isComplete]);

  // Navigate to results when complete
  useEffect(() => {
    if (isComplete && questions.length > 0) {
      handleFinish();
    }
  }, [isComplete]);

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedIndex(index);
    const correct = submitAnswer(index);
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setSelectedIndex(null);
    setShowFeedback(false);
    nextQuestion();
  };

  const handleFinish = () => {
    const session = getSession();
    const newBadges = addQuizResult(session);
    navigate('/results', { state: { session, newBadges }, replace: true });
  };

  if (!currentQuestion) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500">Loading questions...</p>
      </div>
    );
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-500">
            {currentIndex + 1} / {questions.length}
          </span>
          <StarRating difficulty={currentQuestion.difficulty} />
        </div>
        {timeLeft !== null && (
          <span className={`text-lg font-bold ${timeLeft < 300 ? 'text-primary' : 'text-gray-600'}`}>
            {'\u{23F0}'} {formatTime(timeLeft)}
          </span>
        )}
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 flex-wrap">
        {questions.map((_, i) => {
          const ans = answers[i];
          let color = 'bg-cream-dark';
          if (ans) color = ans.correct ? 'bg-correct' : 'bg-wrong';
          if (i === currentIndex && !ans) color = 'bg-primary';
          return <div key={i} className={`w-3 h-3 rounded-full ${color} transition-colors`} />;
        })}
      </div>

      {/* Question */}
      <QuestionCard
        question={currentQuestion}
        selectedIndex={selectedIndex}
        showResult={showFeedback}
        onSelect={handleSelect}
        disabled={showFeedback}
      />

      {/* Feedback */}
      {showFeedback && (
        <AnswerFeedback
          correct={isCorrect}
          explanation={currentQuestion.explanation}
          onNext={currentIndex + 1 >= questions.length ? handleFinish : handleNext}
        />
      )}
    </div>
  );
}
