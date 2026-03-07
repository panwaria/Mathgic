interface Props {
  streak: number;
  className?: string;
}

export default function StreakCounter({ streak, className = '' }: Props) {
  if (streak === 0) return null;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className={`text-2xl ${streak >= 3 ? 'animate-fire' : ''}`}>
        {'\u{1F525}'}
      </span>
      <span className="text-lg font-bold text-primary">{streak} day{streak !== 1 ? 's' : ''}</span>
    </div>
  );
}
