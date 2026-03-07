import { useNavigate } from 'react-router-dom';
import KangarooMascot from '../components/KangarooMascot';
import StreakCounter from '../components/StreakCounter';
import { useProgress } from '../hooks/useProgress';
import { getLevelFromXP } from '../lib/scoring';
import { badges } from '../data/badges';

export default function HomePage() {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const { level, name } = getLevelFromXP(progress.xp);

  const recentBadges = badges.filter(b => progress.earnedBadgeIds.includes(b.id)).slice(-3);

  const daysUntilExam = Math.max(
    0,
    Math.ceil((new Date('2026-03-19').getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
  );

  return (
    <div className="text-center space-y-6 animate-slide-up">
      <KangarooMascot mood="happy" size={140} />

      <div>
        <h2 className="text-3xl font-extrabold text-gray-800">
          Hop your way to math mastery!
        </h2>
        <p className="text-lg text-gray-500 mt-1">
          {daysUntilExam > 0
            ? `${daysUntilExam} days until Math Kangaroo!`
            : 'Math Kangaroo day is here!'}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-3 shadow-sm">
          <p className="text-2xl font-bold text-primary">{progress.totalScore}</p>
          <p className="text-xs text-gray-500">Total Points</p>
        </div>
        <div className="bg-white rounded-2xl p-3 shadow-sm">
          <p className="text-2xl font-bold text-secondary">Lv.{level}</p>
          <p className="text-xs text-gray-500">{name}</p>
        </div>
        <div className="bg-white rounded-2xl p-3 shadow-sm">
          <StreakCounter streak={progress.currentStreak} className="justify-center" />
          <p className="text-xs text-gray-500">Streak</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="space-y-3">
        <button
          onClick={() => navigate('/practice')}
          className="w-full min-h-[64px] bg-primary hover:bg-primary-dark text-white text-xl font-bold
            rounded-2xl shadow-md transition-all duration-200 active:scale-[0.98] animate-pulse-glow"
        >
          {'\u{270F}\u{FE0F}'} Quick Practice
        </button>

        <button
          onClick={() => navigate('/quiz', { state: { mode: 'mock-exam' } })}
          className="w-full min-h-[64px] bg-secondary hover:bg-blue-500 text-white text-xl font-bold
            rounded-2xl shadow-md transition-all duration-200 active:scale-[0.98]"
        >
          {'\u{1F4DD}'} Mock Exam (24 Questions)
        </button>
      </div>

      {/* Recent badges */}
      {recentBadges.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-700 mb-2">Recent Badges</h3>
          <div className="flex justify-center gap-4">
            {recentBadges.map(b => (
              <div key={b.id} className="text-center">
                <span className="text-3xl">{b.emoji}</span>
                <p className="text-xs font-semibold text-gray-600 mt-1">{b.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats summary */}
      <div className="bg-white rounded-2xl p-4 shadow-sm text-left">
        <h3 className="font-bold text-gray-700 mb-2">Your Stats</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p className="text-gray-500">Quizzes completed:</p>
          <p className="font-bold text-right">{progress.quizzesCompleted}</p>
          <p className="text-gray-500">Questions answered:</p>
          <p className="font-bold text-right">{progress.questionsAnswered}</p>
          <p className="text-gray-500">Badges earned:</p>
          <p className="font-bold text-right">{progress.earnedBadgeIds.length} / 18</p>
        </div>
      </div>
    </div>
  );
}
