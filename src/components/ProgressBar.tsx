import { useProgress } from '../hooks/useProgress';
import { getXPForNextLevel, getLevelFromXP } from '../lib/scoring';

export default function ProgressBar() {
  const { progress } = useProgress();
  const { level, name } = getLevelFromXP(progress.xp);
  const { current, needed, progress: pct } = getXPForNextLevel(progress.xp);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-bold text-primary">
          Lv.{level} {name}
        </span>
        <span className="text-xs font-semibold text-gray-500">
          {current}/{needed} XP
        </span>
      </div>
      <div className="w-full h-3 bg-cream-dark rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-500"
          style={{ width: `${Math.min(pct * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}
