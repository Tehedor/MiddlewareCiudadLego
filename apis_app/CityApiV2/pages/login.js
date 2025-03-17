import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../utils/axiosConfig';

import NavBar from '../components/NavBar';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/dashboard');
        }
    }, []);

    useEffect(() => {
        const queryEmail = router.query.email;
        if (queryEmail) {
            setEmail(queryEmail);
        }
    }, [router.query]);

    const handleSubmit = async (e) => {
        setErrorMessage('');
        setIsLoading(true);
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', { email, password });

            localStorage.setItem('token', res.data.token);
            router.push('/dashboard');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage('Invalid credentials. Please try again.');
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                handleSubmit(event);
            }
        };

        window.addEventListener('keypress', handleKeyPress);
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, [email, password]);

    return (
        <div className="auth-container">
            <NavBar />
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Login'}
                    </button>
                </form>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
            <style jsx>
            {`
                .auth-container {
                    font-family: Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    background-color: #f4f4f9;
                }
                .form-container {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    width: 300px;
                    text-align: center;
                }
                form input {
                    width: 95%;
                    height: 40px;
                    margin-bottom: 15px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }
                form button {
                    font-weight: bold;
                    background-color: #0070f3;
                    color: white;
                    padding: 10px;
                    border: none;
                    border-radius: 4px;
                    width: 100%;
                    cursor: pointer;
                }
                form button:hover {
                    background-color: #005bb5;
                }
                form button:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }
                .error-message {
                    color: red;
                    margin-top: 10px;
                }
            `}
            </style>
        </div>
    );
}