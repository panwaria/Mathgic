import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

const client = new Anthropic();

app.post('/api/generate-questions', async (req, res) => {
  const { category, difficulty, count = 3 } = req.body;

  const diffLabel = difficulty === 3 ? 'easy' : difficulty === 4 ? 'medium' : 'hard';

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: `Generate ${count} Math Kangaroo practice questions for grades 1-2.
Category: ${category}
Difficulty: ${diffLabel} (${difficulty} points)

Rules:
- Simple vocabulary for 7-year-olds
- Each question under 3 sentences
- Exactly 5 choices (A-E), each under 10 words
- Include a kid-friendly explanation

Return ONLY a JSON array. Each object must have:
{"text": "...", "choices": ["A","B","C","D","E"], "correctIndex": 0-4, "explanation": "..."}`,
      }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('No JSON array found');

    const questions = JSON.parse(match[0]);
    res.json(questions);
  } catch (err) {
    console.error('AI generation error:', err);
    res.status(500).json({ error: 'Failed to generate questions' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
