import { Question, Category, Difficulty } from '../types';

interface GenerateParams {
  category: Category;
  difficulty: Difficulty;
  count: number;
}

export async function generateAIQuestions(params: GenerateParams): Promise<Question[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch('/api/generate-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Invalid response format');

    return data.map((q: Record<string, unknown>, i: number) => ({
      id: `ai-${Date.now()}-${i}`,
      text: String(q.text || ''),
      choices: Array.isArray(q.choices) ? q.choices.map(String) : [],
      correctIndex: Number(q.correctIndex ?? 0),
      explanation: String(q.explanation || ''),
      category: params.category,
      difficulty: params.difficulty,
      source: 'ai' as const,
    }));
  } catch {
    clearTimeout(timeoutId);
    return [];
  }
}
