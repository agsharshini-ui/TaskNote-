import { useEffect, useState } from 'react';
import './App.css';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app">
      <DashboardPage theme={theme} onThemeToggle={toggleTheme} />
    </div>
  );
}

export default App;