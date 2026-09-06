import { useState } from 'react';
import '../styles/dashboard.css';
import TasksSection from '../components/TasksSection';
import NotesSection from '../components/NotesSection';
import Settings from '../components/Settings';

function DashboardPage({ username, onUsernameChange, theme, onThemeChange }) {
    const [activeTab, setActiveTab] = useState('tasks');
    const [showSettings, setShowSettings] = useState(false);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-left">
                    <span className="brand-kicker">A quieter place to get things done</span>
                    <h1>TaskNote</h1>
                </div>
                <div className="header-right">
                    {username && <span className="user-name">Welcome, {username}</span>}
                    <button onClick={() => setShowSettings(true)} className="settings-btn" title="Settings">⚙️</button>
                </div>
            </header>

            {showSettings && (
                <Settings
                    username={username}
                    onUsernameChange={onUsernameChange}
                    onClose={() => setShowSettings(false)}
                    theme={theme}
                    onThemeChange={onThemeChange}
                />
            )}

            <div className="dashboard-tabs">
                <button
                    className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tasks')}
                >
                    📋 Tasks
                </button>
                <button
                    className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
                    onClick={() => setActiveTab('notes')}
                >
                    📝 Notes
                </button>
            </div>

            <div className="dashboard-content">
                {activeTab === 'tasks' && <TasksSection />}
                {activeTab === 'notes' && <NotesSection />}
            </div>
        </div>
    );
}

export default DashboardPage;
