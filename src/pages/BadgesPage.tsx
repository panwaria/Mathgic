import { useProgress } from '../hooks/useProgress';
import BadgeCard from '../components/BadgeCard';
import KangarooMascot from '../components/KangarooMascot';
import { badges } from '../data/badges';

export default function BadgesPage() {
  const { progress } = useProgress();
  const earned = progress.earnedBadgeIds;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center">
        <KangarooMascot mood={earned.length >= 10 ? 'celebrating' : 'happy'} size={80} />
        <h2 className="text-2xl font-extrabold text-gray-800 mt-2">Badge Collection</h2>
        <p className="text-gray-500">
          {earned.length} / {badges.length} earned
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {badges.map(badge => (
          <BadgeCard key={badge.id} badge={badge} earned={earned.includes(badge.id)} />
        ))}
      </div>
    </div>
  );
}
