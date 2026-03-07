import { useLocation, useNavigate } from 'react-router-dom';
import KangarooMascot from '../components/KangarooMascot';
import BadgeCard from '../components/BadgeCard';
import { QuizSession } from '../types';
import { badges } from '../data/badges';
import { getCategoryLabel } from '../lib/storage';

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { session: QuizSession; newBadges: string[] } | null;

  if (!state?.session) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500">No results to show.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-3 bg-primary text-white rounded-xl font-bold"
        >
          Go Home
        </button>
      </div>
    );
  }

  const { session, newBadges } = state;
  const percentage = session.maxScore > 0 ? Math.round((session.score / session.maxScore) * 100) : 0;
  const isPerfect = session.answers.length > 0 && session.answers.every(a => a.correct);

  // Category breakdown
  const catBreakdown: Record<string, { correct: number; total: number }> = {};
  for (const ans of session.answers) {
    const q = session.questions.find(q => q.id === ans.questionId);
    if (!q) continue;
    if (!catBreakdown[q.category]) catBreakdown[q.category] = { correct: 0, total: 0 };
    catBreakdown[q.category].total++;
    if (ans.correct) catBreakdown[q.category].correct++;
  }

  const mood = isPerfect ? 'celebrating' : percentage >= 60 ? 'happy' : 'encouraging';
  const message = isPerfect
    ? 'PERFECT SCORE!'
    : percentage >= 80
      ? 'Amazing work!'
      : percentage >= 60
        ? 'Great job!'
        : "Good effort! Keep practicing!";

  return (
    <div className="space-y-6 animate-slide-up text-center">
      <KangarooMascot mood={mood} size={120} />

      <div>
        <h2 className="text-3xl font-extrabold text-gray-800">{message}</h2>
        <div className="mt-4 bg-white rounded-2xl p-6 shadow-md inline-block">
          <p className="text-5xl font-extrabold text-primary animate-bounce-in">
            {session.score}
          </p>
          <p className="text-gray-500 mt-1">
            out of {session.maxScore} points ({percentage}%)
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-correct-light rounded-xl p-3">
          <p className="text-2xl font-bold text-correct">
            {session.answers.filter(a => a.correct).length}
          </p>
          <p className="text-sm text-gray-600">Correct</p>
        </div>
        <div className="bg-wrong-light rounded-xl p-3">
          <p className="text-2xl font-bold text-wrong">
            {session.answers.filter(a => !a.correct).length}
          </p>
          <p className="text-sm text-gray-600">Incorrect</p>
        </div>
      </div>

      {/* Category breakdown */}
      {Object.keys(catBreakdown).length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm text-left">
          <h3 className="font-bold text-gray-700 mb-3">Category Breakdown</h3>
          {Object.entries(catBreakdown).map(([cat, stats]) => {
            const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
            return (
              <div key={cat} className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold">{getCategoryLabel(cat as import('../types').Category)}</span>
                  <span className="text-gray-500">{stats.correct}/{stats.total} ({pct}%)</span>
                </div>
                <div className="w-full h-2 bg-cream-dark rounded-full">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New badges */}
      {newBadges.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <h3 className="font-bold text-gray-700 mb-3">{'\u{1F389}'} New Badges Earned!</h3>
          <div className="grid grid-cols-3 gap-3">
            {newBadges.map(id => {
              const badge = badges.find(b => b.id === id);
              if (!badge) return null;
              return <BadgeCard key={id} badge={badge} earned />;
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={() => navigate('/practice')}
          className="w-full min-h-[56px] bg-primary hover:bg-primary-dark text-white text-lg font-bold
            rounded-2xl transition-all duration-200"
        >
          Try Again
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full min-h-[56px] bg-white border-2 border-cream-dark hover:border-primary text-gray-700
            text-lg font-bold rounded-2xl transition-all duration-200"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
