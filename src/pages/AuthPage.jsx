import { useState } from 'react';
import '../styles/auth.css';
import API_BASE_URL from '../config/api';

function AuthPage({ onLogin, theme, onThemeToggle }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const endpoint = isLogin ? 'login' : 'register';
            const payload = isLogin
                ? { email: formData.email.trim().toLowerCase(), password: formData.password }
                : { ...formData, email: formData.email.trim().toLowerCase() };

            const response = await fetch(`${API_BASE_URL}/api/auth/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                onLogin(data.token, data.user);
            } else {
                const validationMessage = data.errors?.map(item => item.msg).join(', ');
                setError(data.message || validationMessage || 'Authentication failed');
            }
        } catch (err) {
            setError(err.message || 'Network error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <button className="theme-toggle" onClick={onThemeToggle} title="Toggle dark/light mode">
                {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <div className="auth-card">
                <h1>TaskNote</h1>
                <p className="subtitle">Notes & Task Manager</p>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required={!isLogin}
                        />
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                <p className="toggle-text">
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setFormData({ email: '', password: '', name: '' });
                            setError('');
                        }}
                        className="toggle-btn"
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default AuthPage;
