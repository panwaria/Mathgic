import { useProgress } from '../hooks/useProgress';
import ScoreChart from '../components/ScoreChart';
import KangarooMascot from '../components/KangarooMascot';
import { getLevelFromXP, getXPForNextLevel, LEVEL_THRESHOLDS } from '../lib/scoring';
import { getCategoryLabel } from '../lib/storage';
import { Category } from '../types';

const categories: Category[] = ['geometry', 'number-sense', 'logic'];

export default function ProgressPage() {
  const { progress } = useProgress();
  const { level, name } = getLevelFromXP(progress.xp);
  const xpInfo = getXPForNextLevel(progress.xp);

  // Find weakest category
  let weakest: Category | null = null;
  let lowestAcc = 101;
  for (const cat of categories) {
    const stats = progress.categoryStats[cat];
    if (stats.total >= 3) {
      const acc = (stats.correct / stats.total) * 100;
      if (acc < lowestAcc) {
        lowestAcc = acc;
        weakest = cat;
      }
    }
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center">
        <KangarooMascot mood="happy" size={80} />
        <h2 className="text-2xl font-extrabold text-gray-800 mt-2">Your Progress</h2>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-3xl font-extrabold text-primary">{progress.totalScore}</p>
          <p className="text-sm text-gray-500">Total Points</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-3xl font-extrabold text-secondary">{progress.quizzesCompleted}</p>
          <p className="text-sm text-gray-500">Quizzes Done</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-3xl font-extrabold text-correct">{progress.questionsAnswered}</p>
          <p className="text-sm text-gray-500">Questions</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-3xl font-extrabold text-wrong">{progress.longestStreak}</p>
          <p className="text-sm text-gray-500">Best Streak</p>
        </div>
      </div>

      {/* Level progress */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-gray-700">Level {level}: {name}</span>
          <span className="text-sm text-gray-500">{progress.xp} XP total</span>
        </div>
        <div className="w-full h-4 bg-cream-dark rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-500"
            style={{ width: `${xpInfo.progress * 100}%` }}
          />
        </div>
        {level < 10 && (
          <p className="text-xs text-gray-400 mt-1">
            {xpInfo.current} / {xpInfo.needed} XP to {LEVEL_THRESHOLDS[level]?.name ?? 'next level'}
          </p>
        )}
      </div>

      {/* Score history chart */}
      <ScoreChart history={progress.quizHistory} />

      {/* Category accuracy */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h3 className="font-bold text-gray-700 mb-3">Category Accuracy</h3>
        {categories.map(cat => {
          const stats = progress.categoryStats[cat];
          const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
          return (
            <div key={cat} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold">{getCategoryLabel(cat)}</span>
                <span className="text-gray-500">
                  {stats.total > 0 ? `${pct}% (${stats.correct}/${stats.total})` : 'No data'}
                </span>
              </div>
              <div className="w-full h-3 bg-cream-dark rounded-full">
                <div
                  className="h-full bg-secondary rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Difficulty accuracy */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h3 className="font-bold text-gray-700 mb-3">Difficulty Breakdown</h3>
        {([3, 4, 5] as const).map(diff => {
          const stats = progress.difficultyStats[diff];
          const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
          const label = diff === 3 ? 'Easy (3 pts)' : diff === 4 ? 'Medium (4 pts)' : 'Hard (5 pts)';
          return (
            <div key={diff} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold">{label}</span>
                <span className="text-gray-500">
                  {stats.total > 0 ? `${pct}% (${stats.correct}/${stats.total})` : 'No data'}
                </span>
              </div>
              <div className="w-full h-3 bg-cream-dark rounded-full">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Weakest area */}
      {weakest && (
        <div className="bg-wrong-light rounded-2xl p-4">
          <h3 className="font-bold text-gray-700 mb-1">{'\u{1F4A1}'} Focus Area</h3>
          <p className="text-gray-600">
            Practice more <strong>{getCategoryLabel(weakest)}</strong> — it's your weakest area at{' '}
            {Math.round(lowestAcc)}% accuracy.
          </p>
        </div>
      )}
    </div>
  );
}
