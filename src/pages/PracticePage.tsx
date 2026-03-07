import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryPicker from '../components/CategoryPicker';
import KangarooMascot from '../components/KangarooMascot';
import { Category, Difficulty } from '../types';

export default function PracticePage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | 'mixed'>('mixed');
  const [difficulty, setDifficulty] = useState<Difficulty | 'mixed'>('mixed');
  const [questionCount, setQuestionCount] = useState(5);
  const [useAI, setUseAI] = useState(false);

  const handleStart = () => {
    navigate('/quiz', {
      state: {
        mode: 'practice',
        category,
        difficulty,
        questionCount,
        timed: false,
        useAI,
      },
    });
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center">
        <KangarooMascot mood="thinking" size={80} />
        <h2 className="text-2xl font-extrabold text-gray-800 mt-2">Practice Setup</h2>
        <p className="text-gray-500">Choose what you want to practice!</p>
      </div>

      <CategoryPicker
        category={category}
        difficulty={difficulty}
        questionCount={questionCount}
        onCategoryChange={setCategory}
        onDifficultyChange={setDifficulty}
        onCountChange={setQuestionCount}
      />

      {/* AI toggle */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <label className="flex items-center justify-between cursor-pointer">
          <div>
            <p className="font-bold text-gray-700">{'\u{2728}'} AI-Generated Questions</p>
            <p className="text-sm text-gray-500">Mix in fresh questions from AI</p>
          </div>
          <div
            onClick={() => setUseAI(!useAI)}
            className={`w-14 h-8 rounded-full transition-colors duration-200 flex items-center px-1
              ${useAI ? 'bg-primary' : 'bg-gray-300'}`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200
                ${useAI ? 'translate-x-6' : 'translate-x-0'}`}
            />
          </div>
        </label>
      </div>

      <button
        onClick={handleStart}
        className="w-full min-h-[64px] bg-primary hover:bg-primary-dark text-white text-xl font-bold
          rounded-2xl shadow-md transition-all duration-200 active:scale-[0.98]"
      >
        Start Practice!
      </button>
    </div>
  );
}
