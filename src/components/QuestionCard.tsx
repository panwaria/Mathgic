import { Question } from '../types';
import { illustrationMap } from '../data/illustrations';

const labels = ['A', 'B', 'C', 'D', 'E'];

interface Props {
  question: Question;
  selectedIndex: number | null;
  correctIndex?: number | null;
  showResult: boolean;
  onSelect: (index: number) => void;
  disabled: boolean;
}

export default function QuestionCard({
  question,
  selectedIndex,
  correctIndex,
  showResult,
  onSelect,
  disabled,
}: Props) {
  const getButtonStyle = (index: number) => {
    if (!showResult) {
      if (index === selectedIndex) {
        return 'bg-secondary text-white border-secondary';
      }
      return 'bg-white border-cream-dark hover:border-primary hover:bg-orange-50';
    }

    if (index === question.correctIndex) {
      return 'bg-correct-light border-correct text-correct ring-2 ring-correct';
    }
    if (index === selectedIndex && !question.correctIndex) {
      return 'bg-wrong-light border-wrong text-wrong';
    }
    if (index === selectedIndex && index !== question.correctIndex) {
      return 'bg-wrong-light border-wrong text-wrong';
    }
    return 'bg-white border-cream-dark opacity-50';
  };

  const Illustration = illustrationMap[question.id];

  return (
    <div className="animate-slide-up">
      <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
        {Illustration && (
          <div className="mb-4 flex justify-center">
            <Illustration />
          </div>
        )}
        <p className="text-xl md:text-2xl font-bold text-center leading-relaxed mb-2">
          {question.text}
        </p>
      </div>

      <div className="space-y-3">
        {question.choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => !disabled && onSelect(i)}
            disabled={disabled}
            className={`w-full min-h-[56px] px-5 py-3 rounded-xl border-2 text-lg font-semibold
              transition-all duration-200 flex items-center gap-3
              ${disabled ? 'cursor-default' : 'cursor-pointer active:scale-[0.98]'}
              ${getButtonStyle(i)}`}
          >
            <span className="w-8 h-8 rounded-full bg-cream-dark flex items-center justify-center text-sm font-bold shrink-0">
              {labels[i]}
            </span>
            <span className="text-left">{choice}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
