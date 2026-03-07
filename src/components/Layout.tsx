import { NavLink, Outlet } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import StreakCounter from './StreakCounter';
import { useProgress } from '../hooks/useProgress';

const navItems = [
  { to: '/', label: 'Home', emoji: '\u{1F3E0}' },
  { to: '/practice', label: 'Practice', emoji: '\u{270F}\u{FE0F}' },
  { to: '/progress', label: 'Progress', emoji: '\u{1F4CA}' },
  { to: '/badges', label: 'Badges', emoji: '\u{1F3C5}' },
];

export default function Layout() {
  const { progress } = useProgress();

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{'\u{1F998}'}</span>
            <h1 className="text-lg font-bold text-primary">Math Kangaroo Prep</h1>
          </div>
          <div className="flex items-center gap-4">
            <StreakCounter streak={progress.currentStreak} />
            <div className="w-32">
              <ProgressBar />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Bottom navigation */}
      <nav className="bg-white border-t border-cream-dark shadow-lg">
        <div className="max-w-2xl mx-auto flex">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center py-3 text-xs font-semibold transition-colors
                ${isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`
              }
            >
              <span className="text-xl mb-0.5">{item.emoji}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
