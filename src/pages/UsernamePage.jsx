import { useState } from 'react';
import '../styles/username.css';

function UsernamePage({ onContinue, theme, onThemeToggle }) {
    const [username, setUsername] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmedUsername = username.trim();
        if (trimmedUsername) {
            onContinue(trimmedUsername);
        }
    };

    return (
        <main className="username-page">
            <button
                className="username-theme-toggle"
                onClick={onThemeToggle}
                title="Toggle dark/light mode"
                type="button"
            >
                {theme === 'light' ? 'Moon' : 'Sun'}
            </button>

            <section className="username-card">
                <p className="username-kicker">Your personal workspace</p>
                <h1>Welcome to TaskNote</h1>
                <p className="username-description">
                    Choose a username to personalize your task and notes workspace.
                </p>

                <form onSubmit={handleSubmit} className="username-form">
                    <label htmlFor="welcome-username">Username</label>
                    <input
                        id="welcome-username"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Enter your username"
                        maxLength="30"
                        autoFocus
                        required
                    />
                    <button type="submit">Enter TaskNote</button>
                </form>
            </section>
        </main>
    );
}

export default UsernamePage;
