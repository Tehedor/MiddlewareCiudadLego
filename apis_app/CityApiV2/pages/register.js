import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../utils/axiosConfig';

import NavBar from '../components/NavBar';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        setErrorMessage(''); 
        setIsLoading(true);
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/register', { email, password });
            router.push(`/login?email=${encodeURIComponent(email)}`);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <NavBar />
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Register'}
                    </button>
                </form>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
            <style jsx>{`
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
                    background-color: rgb(255, 177, 59);
                    color: white;
                    padding: 10px;
                    border: none;
                    border-radius: 4px;
                    width: 100%;
                    cursor: pointer;
                    font-weight: bold;
                }
                form button:hover {
                    background-color: rgb(255, 156, 7);
                }
                form button:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }
                .error-message {
                    color: red;
                    margin-top: 10px;
                }
            `}</style>
        </div>
    );
}