import { QuizSession } from '../types';

interface Props {
  history: QuizSession[];
}

export default function ScoreChart({ history }: Props) {
  const recent = history.slice(-10);
  if (recent.length === 0) {
    return <p className="text-gray-400 text-center py-8">No quizzes yet. Start practicing!</p>;
  }

  const maxScore = Math.max(...recent.map(s => s.maxScore), 1);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h3 className="font-bold text-gray-700 mb-3">Recent Scores</h3>
      <div className="flex items-end gap-2 h-32">
        {recent.map((session, i) => {
          const pct = (session.score / session.maxScore) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-gray-600">{session.score}</span>
              <div className="w-full bg-cream-dark rounded-t-lg overflow-hidden" style={{ height: '100px' }}>
                <div
                  className="w-full bg-gradient-to-t from-primary to-primary-light rounded-t-lg transition-all duration-500"
                  style={{ height: `${pct}%`, marginTop: `${100 - pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
