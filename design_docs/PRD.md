# Product Requirements Document: Math Kangaroo Prep

## 1. Overview

**Product Name:** Math Kangaroo Prep
**Target User:** 7-year-old (2nd grader) preparing for the Math Kangaroo USA competition (Levels 1-2)
**Platform:** Web application (React)
**Tagline:** "Hop your way to math mastery!"

## 2. Problem Statement

The Math Kangaroo USA competition is a popular international math contest for grades 1-12. For a 2nd grader, preparation requires engaging, age-appropriate practice that covers the exam's unique question style — a blend of geometry, number sense, and logic puzzles. Existing resources are static PDFs and expensive prep courses. There is no free, interactive, gamified tool specifically designed to make Math Kangaroo prep fun for young children.

## 3. Goals

1. **Exam Readiness** — Familiarize the child with Math Kangaroo question formats, timing, and difficulty progression
2. **Engagement** — Keep a 7-year-old motivated through gamification (points, badges, streaks, levels)
3. **Adaptive Practice** — Combine a curated question bank with AI-generated questions for unlimited fresh practice
4. **Progress Visibility** — Give parents a clear view of their child's strengths, weaknesses, and improvement over time

## 4. Math Kangaroo Exam Context

| Attribute | Detail |
|---|---|
| **Grade Level** | 1-2 (Level 1) |
| **Questions** | 24 multiple-choice (A-E) |
| **Duration** | 75 minutes |
| **Scoring** | 8 questions × 3 pts, 8 × 4 pts, 8 × 5 pts (max 96) |
| **Penalty** | None for wrong answers |
| **Topics** | Geometry & Spatial Reasoning (~50%), Number Sense & Arithmetic, Logical Reasoning |
| **Format** | Questions progress from easy → medium → hard |
| **2026 Date** | March 19, 2026 |

## 5. Target Audience

### Primary: The Child (Age 7, 2nd Grader)
- Short attention span — needs constant positive reinforcement
- Motivated by visual rewards (stars, badges, animations)
- May not read complex sentences fluently — questions must be concise
- Needs large tap targets (may use tablet)

### Secondary: The Parent
- Wants to see progress and identify weak areas
- May help read questions initially
- Wants confidence the content is aligned with the real exam

## 6. Features

### 6.1 Practice Mode
- **Quick Practice**: 5-10 questions, pick a category or mix all
- **Category Focus**: Filter by Geometry, Number Sense, or Logic
- **Difficulty Selection**: Easy (3-pt), Medium (4-pt), Hard (5-pt), or Mixed
- Immediate feedback after each answer with a kid-friendly explanation
- "Try Another" flow — no pressure, no timer

### 6.2 Mock Exam Mode
- Full 24-question simulated exam matching real format
- Optional 75-minute countdown timer (can be disabled)
- Questions ordered easy → medium → hard (matching real exam)
- Score report at the end with breakdown by category and difficulty
- Comparison to previous mock exam scores

### 6.3 AI-Generated Questions
- Generate fresh questions on demand via Claude API
- Match Math Kangaroo style: visual/spatial, multi-step logic, creative arithmetic
- Parameters: category, difficulty, count
- Fallback to hardcoded bank if AI is slow (>5s) or unavailable
- Cache AI questions locally for offline reuse
- ~30% of quiz questions sourced from AI in mixed mode

### 6.4 Gamification System

#### Points & Scoring
- Mirrors real exam: 3 pts (easy), 4 pts (medium), 5 pts (hard) per correct answer
- No penalty for wrong answers (matches real exam rules)
- Cumulative lifetime score displayed prominently

#### Levels (10 Tiers)
| Level | Name | XP Required |
|-------|------|-------------|
| 1 | Joey | 0 |
| 2 | Hopper | 50 |
| 3 | Bounder | 120 |
| 4 | Sprinter | 220 |
| 5 | Leaper | 350 |
| 6 | Jumper | 520 |
| 7 | Dasher | 730 |
| 8 | Soarer | 1000 |
| 9 | Champion | 1300 |
| 10 | Math Kangaroo Master | 1600 |

#### Badges (18 Total)
| Badge | Condition |
|-------|-----------|
| First Hop | Complete first quiz |
| High Five | Complete 5 quizzes |
| Perfect 10 | Complete 10 quizzes |
| Quiz Machine | Complete 20 quizzes |
| Half Century | Earn 50 total points |
| Score Star | Earn 200 total points |
| Point Master | Earn 500 total points |
| Flawless | Get 100% on any quiz |
| Geometry Guru | 80%+ accuracy in Geometry (min 10 questions) |
| Number Ninja | 80%+ accuracy in Number Sense (min 10 questions) |
| Logic Legend | 80%+ accuracy in Logic (min 10 questions) |
| On Fire (3) | 3-day streak |
| Week Warrior | 7-day streak |
| Fortnight Hero | 14-day streak |
| Monthly Master | 30-day streak |
| Speed Demon | Average < 30s per question in a quiz |
| Explorer | Try all 3 categories |
| Brave Heart | Attempt a 5-point (hard) question |

#### Daily Streaks
- Tracked by calendar date
- Streak increments if played on consecutive days
- Visual streak counter with fire animation
- Streak badges as milestones

### 6.5 Progress Dashboard
- **Score History**: Bar/line chart of recent quiz scores
- **Category Breakdown**: Accuracy percentage per category (Geometry, Number Sense, Logic)
- **Difficulty Breakdown**: Accuracy by tier (3-pt, 4-pt, 5-pt)
- **Streak Calendar**: Visual grid showing practice days
- **Total Stats**: Quizzes completed, questions answered, total points, current level
- **Weakest Area**: Highlight the category needing most practice

### 6.6 Child-Friendly UI/UX
- **Kangaroo Mascot**: Animated SVG with expressions (thinking, happy, encouraging, celebrating)
- **Color Palette**: Warm orange (#FF6B35) primary, sky blue secondary, cream background
- **Typography**: Minimum 18px, questions at 24px+
- **Buttons**: 56px minimum height, rounded, scale-on-hover
- **Feedback Colors**: Green for correct (with bounce), soft orange for incorrect (never red)
- **Animations**: CSS keyframe animations — bounce, slide-up, hop, confetti on milestones
- **Sound**: Optional (stretch goal) — cheerful dings for correct answers
- **Encouraging Language**: "Great try!", "You're getting better!", "Amazing job!"

## 7. Technical Architecture

### 7.1 Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | TailwindCSS |
| Routing | React Router v6 |
| State | React Context + localStorage |
| AI Backend | Express proxy server (~40 lines) |
| AI Model | Claude Sonnet (via Anthropic API) |
| Hosting | Local dev (deployable to Vercel/Netlify) |

### 7.2 Project Structure
```
math-kangaroo-prep/
├── server/
│   └── proxy.ts                 # Express proxy for Claude API
├── src/
│   ├── main.tsx                 # App entry point
│   ├── App.tsx                  # Router setup
│   ├── types/index.ts           # TypeScript interfaces
│   ├── data/
│   │   ├── questions.ts         # 51+ hardcoded questions
│   │   └── badges.ts            # 18 badge definitions
│   ├── hooks/
│   │   ├── useProgress.ts       # Progress state + localStorage
│   │   ├── useQuiz.ts           # Quiz session logic
│   │   └── useAIQuestions.ts    # Claude API integration
│   ├── lib/
│   │   ├── storage.ts           # localStorage helpers
│   │   ├── scoring.ts           # XP, levels, badge evaluation
│   │   └── ai.ts                # API client for question generation
│   ├── components/
│   │   ├── Layout.tsx           # App shell with nav
│   │   ├── KangarooMascot.tsx   # Animated mascot SVG
│   │   ├── QuestionCard.tsx     # Question display + choices
│   │   ├── AnswerFeedback.tsx   # Correct/wrong feedback
│   │   ├── ProgressBar.tsx      # XP/level progress bar
│   │   ├── BadgeCard.tsx        # Individual badge display
│   │   ├── ScoreChart.tsx       # Score history visualization
│   │   ├── StreakCounter.tsx     # Streak display with fire
│   │   ├── StarRating.tsx       # Difficulty star indicator
│   │   └── CategoryPicker.tsx   # Category/difficulty selector
│   └── pages/
│       ├── HomePage.tsx         # Welcome + quick actions
│       ├── PracticePage.tsx     # Practice setup (category/difficulty)
│       ├── QuizPage.tsx         # Active quiz experience
│       ├── ResultsPage.tsx      # Post-quiz results + badges earned
│       ├── ProgressPage.tsx     # Dashboard with charts
│       └── BadgesPage.tsx       # Badge collection display
├── index.html
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── package.json
```

### 7.3 Data Models

```typescript
type Category = 'geometry' | 'number-sense' | 'logic';
type Difficulty = 3 | 4 | 5;
type QuestionSource = 'bank' | 'ai';

interface Question {
  id: string;
  text: string;
  choices: string[];          // 5 options (A-E)
  correctIndex: number;       // 0-4
  explanation: string;        // Kid-friendly explanation
  category: Category;
  difficulty: Difficulty;
  imageUrl?: string;          // Optional illustration
  source: QuestionSource;
}

interface QuizConfig {
  mode: 'practice' | 'mock-exam';
  category: Category | 'mixed';
  difficulty: Difficulty | 'mixed';
  questionCount: number;      // 5, 10, or 24 (mock)
  timed: boolean;
  timeLimitSeconds?: number;
}

interface QuizAnswer {
  questionId: string;
  selectedIndex: number | null;
  correct: boolean;
  timeSpentSeconds: number;
}

interface QuizSession {
  id: string;
  config: QuizConfig;
  questions: Question[];
  answers: QuizAnswer[];
  score: number;
  maxScore: number;
  startedAt: string;
  completedAt: string;
}

interface UserProgress {
  totalScore: number;
  level: number;
  xp: number;
  currentStreak: number;
  longestStreak: number;
  lastPlayedDate: string;     // 'YYYY-MM-DD'
  quizzesCompleted: number;
  questionsAnswered: number;
  categoryStats: Record<Category, { correct: number; total: number }>;
  difficultyStats: Record<Difficulty, { correct: number; total: number }>;
  earnedBadgeIds: string[];
  quizHistory: QuizSession[]; // Last 50
  categoriesExplored: Category[];
}

interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  condition: BadgeCondition;
}
```

### 7.4 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Welcome screen, mascot, streak, quick-start buttons |
| `/practice` | PracticePage | Choose category, difficulty, question count |
| `/quiz` | QuizPage | Active quiz with question cards and timer |
| `/results` | ResultsPage | Score breakdown, new badges, encouragement |
| `/progress` | ProgressPage | Dashboard with charts and stats |
| `/badges` | BadgesPage | Badge collection (earned + locked) |

### 7.5 Claude API Integration

**Proxy Server** (required to keep API key server-side):
- `POST /api/generate-questions` accepts `{ category, difficulty, count }`
- Calls Claude Sonnet with a structured prompt requesting JSON output
- Returns `Question[]` matching the app's interface
- API key stored in `.env` on server

**Client-Side Behavior**:
- 5-second timeout — falls back to hardcoded bank if AI is slow
- Caches AI-generated questions in localStorage for offline reuse
- In mixed quizzes, ~30% questions come from AI, ~70% from bank
- User can explicitly request "Generate New Questions" on practice page

## 8. Question Content Guidelines

All questions (hardcoded and AI-generated) must follow these rules:

1. **Language**: Simple vocabulary appropriate for a 7-year-old
2. **Length**: Question text under 3 sentences; each choice under 10 words
3. **Format**: Always 5 choices (A-E) matching real Math Kangaroo format
4. **Visuals**: Describe visual elements in text (shapes, patterns, arrangements)
5. **Topics by Difficulty**:
   - **3-point (Easy)**: Counting, basic shapes, simple addition/subtraction, color patterns
   - **4-point (Medium)**: Multi-step arithmetic, shape combinations, sequence completion, spatial rotation
   - **5-point (Hard)**: Logic puzzles, overlapping shapes, complex patterns, deductive reasoning
6. **Explanations**: Every question must have a kid-friendly explanation of the correct answer

## 9. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Initial Load | < 2 seconds |
| Quiz Response | < 100ms (local), < 5s (AI generation) |
| Offline Support | Full functionality with hardcoded bank (no AI) |
| Browser Support | Chrome, Safari, Edge (latest) |
| Responsive | Desktop + tablet (min 768px width) |
| Accessibility | Large text, high contrast, keyboard navigable |
| Data Persistence | localStorage (no account required) |

## 10. Future Enhancements (Out of Scope for V1)

- [ ] User accounts with cloud sync (Supabase)
- [ ] Parent dashboard with email reports
- [ ] Sound effects and voice reading of questions
- [ ] Image-based questions (actual geometric figures)
- [ ] Multiplayer/challenge mode with friends
- [ ] Support for other Math Kangaroo grade levels (3-4, 5-6)
- [ ] Print-friendly practice sheets
- [ ] Mobile native app (React Native)
- [ ] Spaced repetition for missed questions
- [ ] Timed challenge mode with leaderboards

## 11. Success Metrics

| Metric | Target |
|--------|--------|
| Daily Practice Sessions | 1+ per day |
| Questions Answered/Week | 50+ |
| Category Coverage | All 3 categories attempted within first week |
| Mock Exam Score Trend | Upward trend over 4 weeks |
| Streak Maintenance | 5+ day average streak |

## 12. References

- [Math Kangaroo USA Official Site](https://mathkangaroo.org/mks/)
- [Math Kangaroo Grades 1-2 Practice](https://mathkangaroo.org/mks/practice/grades-1-2/)
- [2025 Sample Questions](https://mathkangaroo.org/mks/wp-content/uploads/2025/04/2025-MK-Sample-Questions.pdf)
- [2024 Sample Questions](https://mathkangaroo.org/mks/wp-content/uploads/2024/04/2024-MK-Sample-Questions.pdf)
- [Math Kangaroo 2026 Guide](https://www.wukongsch.com/blog/math-kangaroo-2026-comprehensive-guide-date-rules-registration-sample-post-17195/)
