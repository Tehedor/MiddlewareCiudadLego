// // pages/login.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import axios from 'axios';
// import axiosa from 'axios';
import axios from '../utils/axiosConfig';


import NavBar from '../components/NavBar';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
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
        }
    };

    return (
        <div className="auth-container">
            <NavBar />
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    <button type="submit">Login</button>
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
                    display: block;
                    width: 100%;
                    margin-bottom: 15px;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }
                form button {
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
                .error-message {
                    color: red;
                    margin-top: 10px;
                }
            `}</style>
        </div>
    );
}