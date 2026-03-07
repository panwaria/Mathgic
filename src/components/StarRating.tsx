import { Difficulty } from '../types';

interface Props {
  difficulty: Difficulty;
  className?: string;
}

export default function StarRating({ difficulty, className = '' }: Props) {
  const stars = difficulty === 3 ? 1 : difficulty === 4 ? 2 : 3;
  const label = difficulty === 3 ? 'Easy' : difficulty === 4 ? 'Medium' : 'Hard';
  const color = difficulty === 3 ? 'text-correct' : difficulty === 4 ? 'text-wrong' : 'text-primary';

  return (
    <span className={`inline-flex items-center gap-1 ${className}`} title={`${label} (${difficulty} pts)`}>
      {Array.from({ length: stars }).map((_, i) => (
        <span key={i} className={`text-sm ${color}`}>{'\u2B50'}</span>
      ))}
      <span className={`text-xs font-semibold ${color} ml-1`}>{label}</span>
    </span>
  );
}
