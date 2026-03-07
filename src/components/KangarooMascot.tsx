import { MascotMood } from '../types';

const moodColors: Record<MascotMood, string> = {
  thinking: '#4DACF7',
  happy: '#FF6B35',
  encouraging: '#FF9800',
  celebrating: '#4CAF50',
};

const moodExpressions: Record<MascotMood, string> = {
  thinking: 'M35,32 Q38,30 41,32',
  happy: 'M33,34 Q38,38 43,34',
  encouraging: 'M33,33 Q38,36 43,33',
  celebrating: 'M32,35 Q38,40 44,35',
};

interface Props {
  mood?: MascotMood;
  size?: number;
  className?: string;
}

export default function KangarooMascot({ mood = 'happy', size = 120, className = '' }: Props) {
  const color = moodColors[mood];
  const mouthPath = moodExpressions[mood];
  const animClass = mood === 'celebrating' ? 'animate-hop' : mood === 'thinking' ? 'animate-wiggle' : '';

  return (
    <div className={`inline-block ${animClass} ${className}`}>
      <svg width={size} height={size} viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <ellipse cx="38" cy="48" rx="18" ry="22" fill={color} />
        {/* Head */}
        <circle cx="38" cy="24" r="14" fill={color} />
        {/* Ears */}
        <ellipse cx="30" cy="10" rx="4" ry="8" fill={color} />
        <ellipse cx="30" cy="10" rx="2.5" ry="6" fill="#FFD4BC" />
        <ellipse cx="46" cy="10" rx="4" ry="8" fill={color} />
        <ellipse cx="46" cy="10" rx="2.5" ry="6" fill="#FFD4BC" />
        {/* Belly */}
        <ellipse cx="38" cy="50" rx="12" ry="16" fill="#FFD4BC" />
        {/* Eyes */}
        <circle cx="33" cy="22" r="2.5" fill="white" />
        <circle cx="43" cy="22" r="2.5" fill="white" />
        <circle cx={mood === 'thinking' ? "34" : "33.5"} cy="22" r="1.2" fill="#1a1a2e" />
        <circle cx={mood === 'thinking' ? "44" : "43.5"} cy="22" r="1.2" fill="#1a1a2e" />
        {/* Mouth */}
        <path d={mouthPath} stroke="#1a1a2e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Nose */}
        <circle cx="38" cy="28" r="1.5" fill="#1a1a2e" />
        {/* Arms */}
        <ellipse cx="22" cy="42" rx="4" ry="8" fill={color} transform="rotate(-15 22 42)" />
        <ellipse cx="54" cy="42" rx="4" ry="8" fill={color} transform="rotate(15 54 42)" />
        {/* Feet */}
        <ellipse cx="30" cy="68" rx="7" ry="4" fill={color} />
        <ellipse cx="46" cy="68" rx="7" ry="4" fill={color} />
        {/* Tail */}
        <path d="M56,55 Q65,50 62,42" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* Blush for happy/celebrating */}
        {(mood === 'happy' || mood === 'celebrating') && (
          <>
            <circle cx="28" cy="28" r="3" fill="#FFB6C1" opacity="0.4" />
            <circle cx="48" cy="28" r="3" fill="#FFB6C1" opacity="0.4" />
          </>
        )}
        {/* Stars for celebrating */}
        {mood === 'celebrating' && (
          <>
            <text x="8" y="18" fontSize="8" className="animate-confetti">&#x2B50;</text>
            <text x="60" y="14" fontSize="8" className="animate-confetti" style={{ animationDelay: '0.2s' }}>&#x2B50;</text>
            <text x="14" y="38" fontSize="6" className="animate-confetti" style={{ animationDelay: '0.4s' }}>&#x2B50;</text>
          </>
        )}
      </svg>
    </div>
  );
}
