import { useEffect, useState } from 'react';
import './App.css';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const updateUsername = (value) => {
    const nextUsername = value.trim();
    setUsername(nextUsername);
    localStorage.setItem('username', nextUsername);
  };

  return (
    <div className="app">
      <DashboardPage
        username={username}
        onUsernameChange={updateUsername}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
    </div>
  );
}

export default App;