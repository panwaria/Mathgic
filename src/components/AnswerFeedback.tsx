import KangarooMascot from './KangarooMascot';

interface Props {
  correct: boolean;
  explanation: string;
  onNext: () => void;
}

const encouragements = {
  correct: ['Amazing job!', 'You got it!', 'Super smart!', 'Way to go!', 'Brilliant!'],
  wrong: ['Great try!', 'Almost there!', 'Keep going!', "You're learning!", 'Nice effort!'],
};

export default function AnswerFeedback({ correct, explanation, onNext }: Props) {
  const messages = correct ? encouragements.correct : encouragements.wrong;
  const message = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className={`rounded-2xl p-6 mt-4 animate-bounce-in ${correct ? 'bg-correct-light' : 'bg-wrong-light'}`}>
      <div className="flex items-center gap-4 mb-3">
        <KangarooMascot mood={correct ? 'celebrating' : 'encouraging'} size={64} />
        <div>
          <p className={`text-2xl font-bold ${correct ? 'text-correct' : 'text-wrong'}`}>
            {correct ? 'Correct!' : 'Not quite!'}
          </p>
          <p className="text-lg font-semibold text-gray-700">{message}</p>
        </div>
      </div>

      <p className="text-base text-gray-600 mb-4 leading-relaxed">{explanation}</p>

      <button
        onClick={onNext}
        className="w-full min-h-[56px] bg-primary hover:bg-primary-dark text-white text-lg font-bold rounded-xl
          transition-all duration-200 active:scale-[0.98]"
      >
        Next Question
      </button>
    </div>
  );
}
