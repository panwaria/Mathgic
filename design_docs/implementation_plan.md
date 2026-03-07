# Implementation Plan: Math Kangaroo Prep

## Context

A parent wants an interactive, gamified web app to help their 7-year-old (2nd grader) prepare for the Math Kangaroo USA competition (Levels 1-2). The app needs practice quizzes, a mock exam mode, progress tracking, gamification (points/badges/levels/streaks), and AI-generated questions via Claude API. A full PRD has been written to `PRD.md` in the project root.

## Tech Stack

React 18 + TypeScript + Vite, TailwindCSS, React Router v6, React Context + localStorage, Express proxy for Claude API.

## Implementation Steps

### Step 1: Project Scaffolding
- `npm create vite@latest` with React + TypeScript template
- Install dependencies: `tailwindcss`, `react-router-dom`, `@anthropic-ai/sdk`, `express`, `cors`
- Configure Tailwind with custom color palette (orange #FF6B35, sky blue, cream)
- Set up folder structure: `src/{types,data,hooks,lib,components,pages}`

### Step 2: TypeScript Types (`src/types/index.ts`)
- Define all interfaces: `Question`, `QuizConfig`, `QuizAnswer`, `QuizSession`, `UserProgress`, `Badge`, `BadgeCondition`
- Define type aliases: `Category`, `Difficulty`, `QuestionSource`

### Step 3: Hardcoded Question Bank (`src/data/questions.ts`)
- Write 51+ questions across 3 categories × 3 difficulties
- Distribution: Geometry (18), Number Sense (18), Logic (15)
- Each with 5 choices, correct index, and kid-friendly explanation
- Questions styled after real Math Kangaroo format

### Step 4: Badge Definitions (`src/data/badges.ts`)
- Define 18 badges with emoji icons, names, descriptions, and unlock conditions

### Step 5: Core Logic (`src/lib/`)
- `storage.ts`: localStorage get/set/clear with JSON serialization and default state
- `scoring.ts`: XP calculation, level determination (10 tiers), badge evaluation function
- `ai.ts`: API client that POSTs to `/api/generate-questions` with timeout + error handling

### Step 6: Custom Hooks (`src/hooks/`)
- `useProgress.ts`: Context provider wrapping `UserProgress` state with localStorage persistence. Functions: `addQuizResult()`, `updateStreak()`, `checkNewBadges()`
- `useQuiz.ts`: Quiz session management — question selection, answer recording, scoring, timer
- `useAIQuestions.ts`: Fetch AI questions with loading/error states, 5s timeout, fallback to bank

### Step 7: Layout & Navigation (`src/components/Layout.tsx`, `src/App.tsx`)
- App shell with bottom navigation bar (Home, Practice, Progress, Badges)
- React Router with 6 routes
- Kangaroo-themed header with level + streak display

### Step 8: Kangaroo Mascot (`src/components/KangarooMascot.tsx`)
- Inline SVG kangaroo with 4 mood states: thinking, happy, encouraging, celebrating
- CSS animations: idle bounce, jump on correct, confetti on milestones

### Step 9: Core Components
- `QuestionCard.tsx`: Question text + 5 large answer buttons (A-E)
- `AnswerFeedback.tsx`: Correct/wrong overlay with explanation and mascot reaction
- `ProgressBar.tsx`: XP bar showing current level progress
- `BadgeCard.tsx`: Badge display (earned = colorful, locked = grayscale)
- `StreakCounter.tsx`: Fire emoji + streak count with animation
- `ScoreChart.tsx`: Simple bar chart of last 10 quiz scores (pure CSS, no library)
- `StarRating.tsx`: Difficulty indicator using star emojis
- `CategoryPicker.tsx`: Category + difficulty selector with large tap targets

### Step 10: Pages
- **HomePage**: Welcome message, mascot, current streak, level, quick-start buttons ("Quick Practice", "Mock Exam"), recent badges
- **PracticePage**: Category picker, difficulty picker, question count (5/10), "Start" button, "Generate AI Questions" toggle
- **QuizPage**: Question counter, optional timer, QuestionCard, AnswerFeedback, progress dots
- **ResultsPage**: Score with star animation, category breakdown, new badges earned, "Try Again" / "Go Home"
- **ProgressPage**: Total stats, score chart, category accuracy bars, difficulty breakdown, streak calendar
- **BadgesPage**: Grid of all 18 badges (earned + locked with hints)

### Step 11: Express Proxy Server (`server/proxy.ts`)
- ~40 lines: Express server on port 3001
- Single endpoint: `POST /api/generate-questions`
- Reads `ANTHROPIC_API_KEY` from `.env`
- Sends structured prompt to Claude Sonnet requesting JSON array of questions
- Validates response matches `Question[]` shape
- Vite dev config proxies `/api` → `localhost:3001`

### Step 12: Styling & Animations
- TailwindCSS custom theme: colors, fonts, spacing for child-friendly UI
- CSS keyframe animations: `@keyframes bounce`, `hop`, `slide-up`, `confetti`, `pulse`
- Large minimum touch targets (56px), rounded corners everywhere
- Encouraging color scheme: green for correct, soft orange for wrong (never red)

### Step 13: Integration & Polish
- Wire up all pages with real data flow
- Test quiz flow end-to-end: start → answer → feedback → results → badges
- Verify localStorage persistence across page reloads
- Test AI question generation with fallback
- Ensure responsive layout on tablet (768px+)

### Step 14: Testing & Verification
- Manual walkthrough of full quiz flow
- Verify scoring matches Math Kangaroo rules (3/4/5 pts)
- Test streak logic across day boundaries
- Test badge unlock conditions
- Verify AI fallback when proxy is not running
- Check all 6 routes render correctly

## Key Files to Create (~25 files)

| File | Purpose |
|------|---------|
| `src/types/index.ts` | All TypeScript interfaces |
| `src/data/questions.ts` | 51+ hardcoded questions |
| `src/data/badges.ts` | 18 badge definitions |
| `src/lib/storage.ts` | localStorage helpers |
| `src/lib/scoring.ts` | XP, levels, badge logic |
| `src/lib/ai.ts` | Claude API client |
| `src/hooks/useProgress.ts` | Progress state + context |
| `src/hooks/useQuiz.ts` | Quiz session management |
| `src/hooks/useAIQuestions.ts` | AI question fetching |
| `src/components/*.tsx` | 10 UI components |
| `src/pages/*.tsx` | 6 pages |
| `server/proxy.ts` | Express API proxy |

## Verification

1. `npm run dev` — app loads at localhost:5173 with home page
2. Start a practice quiz — questions display, answers work, feedback shows
3. Complete a quiz — results page shows score, badges unlock
4. Check progress page — stats update correctly
5. Reload browser — all progress persists from localStorage
6. Run `npx tsx server/proxy.ts` — AI questions generate successfully
7. Kill proxy — app gracefully falls back to hardcoded questions
