import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './hooks/useProgress';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PracticePage from './pages/PracticePage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import ProgressPage from './pages/ProgressPage';
import BadgesPage from './pages/BadgesPage';

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/badges" element={<BadgesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  );
}
