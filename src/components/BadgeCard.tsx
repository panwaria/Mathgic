import { Badge } from '../types';

interface Props {
  badge: Badge;
  earned: boolean;
}

export default function BadgeCard({ badge, earned }: Props) {
  return (
    <div
      className={`rounded-2xl p-4 text-center transition-all duration-300
        ${earned
          ? 'bg-white shadow-md hover:shadow-lg hover:scale-105'
          : 'bg-gray-100 opacity-60'
        }`}
    >
      <div className={`text-4xl mb-2 ${earned ? 'animate-bounce-in' : 'grayscale'}`}>
        {badge.emoji}
      </div>
      <p className={`font-bold text-sm ${earned ? 'text-gray-800' : 'text-gray-400'}`}>
        {badge.name}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        {earned ? badge.description : '???'}
      </p>
    </div>
  );
}
