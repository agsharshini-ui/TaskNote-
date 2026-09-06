import { useState, useEffect } from 'react';
import '../styles/tasks.css';
import API_BASE_URL from '../config/api';

function TasksSection() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const getResponseMessage = async (response, fallback) => {
        try {
            const data = await response.json();
            return data.message || data.errors?.map(item => item.msg).join(', ') || fallback;
        } catch {
            return fallback;
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/tasks`);
            if (response.ok) {
                const data = await response.json();
                setTasks(data.tasks || []);
            } else {
                setError(await getResponseMessage(response, 'Failed to load tasks'));
            }
        } catch (err) {
            setError(err.message || 'Error loading tasks');
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        try {
            const response = await fetch(`${API_BASE_URL}/api/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTask })
            });

            if (response.ok) {
                setNewTask('');
                await fetchTasks();
            } else {
                setError(await getResponseMessage(response, 'Failed to add task'));
            }
        } catch (err) {
            setError(err.message || 'Error adding task');
        }
    };

    const toggleTask = async (taskId, completed) => {
        setTasks(currentTasks => currentTasks.map(task => (
            task._id === taskId ? { ...task, completed: !completed } : task
        )));

        try {
            const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !completed })
            });

            if (response.ok) {
                await fetchTasks();
            } else {
                setTasks(currentTasks => currentTasks.map(task => (
                    task._id === taskId ? { ...task, completed } : task
                )));
                setError(await getResponseMessage(response, 'Failed to update task'));
            }
        } catch (err) {
            setTasks(currentTasks => currentTasks.map(task => (
                task._id === taskId ? { ...task, completed } : task
            )));
            setError(err.message || 'Error updating task');
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await fetchTasks();
            } else {
                setError(await getResponseMessage(response, 'Failed to delete task'));
            }
        } catch (err) {
            setError(err.message || 'Error deleting task');
        }
    };

    return (
        <div className="tasks-section">
            <div className="section-heading">
                <div>
                    <p className="section-kicker">Today</p>
                    <h2>My Tasks</h2>
                    <p className="section-description">Keep the next important thing within reach.</p>
                </div>
                <span className="section-count">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span>
            </div>

            <form onSubmit={addTask} className="task-form">
                <span className="form-mark">+</span>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="task-input"
                />
                <button type="submit" className="add-btn">Add task</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <p>Loading tasks...</p>
            ) : tasks.length === 0 ? (
                <p className="empty-state">No tasks yet. Create one to get started!</p>
            ) : (
                <ul className="tasks-list">
                    {tasks.map(task => (
                        <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                            <button
                                type="button"
                                className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                                aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
                                aria-pressed={Boolean(task.completed)}
                                onClick={() => toggleTask(task._id, Boolean(task.completed))}
                            >
                                {task.completed ? '✓' : ''}
                            </button>
                            <span className="task-title">{task.title}</span>
                            <button
                                onClick={() => deleteTask(task._id)}
                                className="delete-btn"
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TasksSection;
