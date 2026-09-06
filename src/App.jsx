import { useEffect, useState } from 'react';
import './App.css';
import DashboardPage from './pages/DashboardPage';
import UsernamePage from './pages/UsernamePage';

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

  const updateUsername = (value) => {
    const nextUsername = value.trim();
    setUsername(nextUsername);
    localStorage.setItem('username', nextUsername);
  };

  return (
    <div className="app">
      {username ? (
        <DashboardPage
          username={username}
          onUsernameChange={updateUsername}
          theme={theme}
          onThemeChange={setTheme}
        />
      ) : (
        <UsernamePage
          onContinue={updateUsername}
          theme={theme}
          onThemeToggle={() => setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')}
        />
      )}
    </div>
  );
}

export default App;