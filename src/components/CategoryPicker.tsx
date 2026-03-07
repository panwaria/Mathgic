import { Category, Difficulty } from '../types';
import { getCategoryLabel } from '../lib/storage';

interface Props {
  category: Category | 'mixed';
  difficulty: Difficulty | 'mixed';
  questionCount: number;
  onCategoryChange: (cat: Category | 'mixed') => void;
  onDifficultyChange: (diff: Difficulty | 'mixed') => void;
  onCountChange: (count: number) => void;
}

const categories: (Category | 'mixed')[] = ['mixed', 'geometry', 'number-sense', 'logic'];
const difficulties: (Difficulty | 'mixed')[] = ['mixed', 3, 4, 5];
const counts = [5, 10];

const categoryEmojis: Record<string, string> = {
  mixed: '\u{1F500}',
  geometry: '\u{1F4D0}',
  'number-sense': '\u{1F522}',
  logic: '\u{1F9E0}',
};

const diffLabels: Record<string, string> = {
  mixed: 'All',
  '3': 'Easy (3 pts)',
  '4': 'Medium (4 pts)',
  '5': 'Hard (5 pts)',
};

export default function CategoryPicker({
  category,
  difficulty,
  questionCount,
  onCategoryChange,
  onDifficultyChange,
  onCountChange,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="font-bold text-gray-700 mb-3 text-lg">Category</h3>
        <div className="grid grid-cols-2 gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`min-h-[56px] rounded-xl border-2 font-semibold text-base transition-all duration-200
                ${category === cat
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white border-cream-dark hover:border-primary'
                }`}
            >
              <span className="mr-2">{categoryEmojis[cat]}</span>
              {cat === 'mixed' ? 'All Topics' : getCategoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <h3 className="font-bold text-gray-700 mb-3 text-lg">Difficulty</h3>
        <div className="grid grid-cols-2 gap-3">
          {difficulties.map(diff => (
            <button
              key={String(diff)}
              onClick={() => onDifficultyChange(diff)}
              className={`min-h-[56px] rounded-xl border-2 font-semibold text-base transition-all duration-200
                ${difficulty === diff
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white border-cream-dark hover:border-primary'
                }`}
            >
              {diffLabels[String(diff)]}
            </button>
          ))}
        </div>
      </div>

      {/* Question Count */}
      <div>
        <h3 className="font-bold text-gray-700 mb-3 text-lg">Questions</h3>
        <div className="grid grid-cols-2 gap-3">
          {counts.map(c => (
            <button
              key={c}
              onClick={() => onCountChange(c)}
              className={`min-h-[56px] rounded-xl border-2 font-semibold text-lg transition-all duration-200
                ${questionCount === c
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white border-cream-dark hover:border-primary'
                }`}
            >
              {c} Questions
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
