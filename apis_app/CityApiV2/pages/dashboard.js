import { useState, useEffect } from 'react';
// import axios from 'axios';
import axios from '../utils/axiosConfig';
import { useRouter } from 'next/router';

import NavBar from '../components/NavBar';

export default function Dashboard() {
    const [keys, setKeys] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchKeys = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/keys/keys', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setKeys(res.data);
            } catch (error) {
                console.error('Error fetching keys:', error); // Registro de depuración
                if (error.response && error.response.status === 401) {
                    router.push('/login');
                }
            }
        };

        fetchKeys();

        const intervalId = setInterval(fetchKeys, 1000); // Actualiza cada segundo

        return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
    }, [router]);

    const handleGenerateKey = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/keys/keys', {}, {
                headers: { Authorization: `Bearer ${token}` },
                timeout: 10000 // Aumenta el tiempo de espera a 10 segundos
            });
            setKeys([...keys, res.data]);
            setErrorMessage(''); // Limpia el mensaje de error si la solicitud es exitosa
        } catch (error) {
            console.error('Error generating key:', error); // Registro de depuración
            if (error.response && error.response.status === 403) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('Error generating API key. Please try again.');
            }
        }
    };

    const handleDeleteKey = async (apiKey) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/keys/keys?apiKey=${apiKey}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setKeys(keys.filter(key => key.api_key !== apiKey));
        } catch (error) {
            console.error('Error deleting key:', error); // Registro de depuración
            setErrorMessage('Error deleting API key. Please try again.');
        }
    };

    const handleCopyKey = (apiKey) => {
        navigator.clipboard.writeText(apiKey).then(() => {
            alert('API key copied to clipboard');
        }).catch(err => {
            console.error('Error copying API key:', err);
        });
    };

    const resetRemainingRequestsKeyDB = async (apiKey, request_count_limit, nextPeriod) => {
        console.log('reset_remainingRequests_key_db');
        const token = localStorage.getItem('token');
        const res = await axios.post('/api/keys/reset_remainingRequests_key_db', {
            apiKey: apiKey,
            request_count_limit: request_count_limit,
            nextPeriod: nextPeriod
        }, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 10000 // Aumenta el tiempo de espera a 10 segundos
        });
    }

    const calculateTimeToNextPeriod = (lastDatePeriod, timeLimitApiKey, apiKey, request_count_limit, remaining_requests) => {
        const currentTime = Date.now();
        const nextPeriod = new Date(lastDatePeriod).getTime() + timeLimitApiKey * 1000; // Assuming timeLimitApiKey is in seconds
        // console.log(Math.max(0, nextPeriod - currentTime));
        // console.log(remaining_requests);
        if (Math.max(0, nextPeriod - currentTime) <= 0 && remaining_requests!= request_count_limit) {
        // if (Math.max(0, nextPeriod - currentTime) <= 0 && remaining_requests<=0 ) {
            resetRemainingRequestsKeyDB(apiKey, request_count_limit, nextPeriod);
        }
        return Math.max(0, nextPeriod - currentTime);
    };

    return (
        <div className="dashboard">
            <NavBar />
            <div className="container">
                <h1 className="title">API Keys Dashboard</h1>
                <div className="generate-container">
                    <button className="generate-button" onClick={handleGenerateKey}>Generate New API Key</button>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </div>
                <div className="keys-list">
                    {keys.map((key) => (
                        <div className="key-card" key={key.api_key}>
                            <button className="delete-button" onClick={() => handleDeleteKey(key.api_key)}><strong>X</strong></button>
                            <h2>
                                <strong>Key:</strong> 
                                <button className="copy-button" onClick={() => handleCopyKey(key.api_key)}>
                                    {key.api_key}
                                </button>
                            </h2>
                            <div className='key-details'>
                                <p><strong>Creation Date:</strong> {new Date(key.created_at).toLocaleString()}</p>
                                <p><strong>Requests Count:</strong> {key.request_count}</p>
                                <p><strong>Requests Limit Per Period:</strong> {key.request_count_limit}</p>
                                <p><strong>Period Time:</strong> {key.time_limit_api_key} min</p>
                            </div>
                            <div className='key-info'>
                                <p style={{ color: key.remaining_requests <= 0 ? 'red' : 'green' }}><strong style={{ color: key.remaining_requests <= 0 ? 'red' : 'green' }}>Remaining Requests:</strong> {key.remaining_requests}</p>
                                <p><strong>Time to Next Period:</strong> {Math.ceil(calculateTimeToNextPeriod(key.last_date_period, key.time_limit_api_key, key.api_key, key.request_count_limit, key.remaining_requests) / 1000)} seconds</p>
                            </div>    
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .dashboard {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    background-color: #f4f4f9;
                    min-height: 100vh; /* Asegura que el fondo cubra toda la altura de la ventana */
                }
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    margin-top: 6   0px;
                }
                .title {
                    text-align: center;
                    color: #333;
                }
                .generate-container {
                    display: flex;
                    align-items: center;
                }
                .generate-button {
                    padding: 10px 20px;
                    background-color: #0070f3;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                }
                .generate-button:hover {
                    background-color: #005bb5;
                }
                .error-message {
                    margin-left: 20px;
                    color: red;
                    font-size: 14px;
                }
                .keys-list {
                    margin-top: 20px;
                }
                .key-card {
                    position: relative;
                    background: #fff;
                    margin-bottom: 20px;
                    padding: 15px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                }
                .key-card h2 {
                    margin-bottom: 10px;
                    font-size: 18px;
                    color: #444;
                }
                .key-card p {
                    margin: 5px 0;
                    font-size: 14px;
                }
                .key-card p strong {
                    color: #555;
                }
                .delete-button {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background-color: red;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    padding: 5px 10px;
                }
                .delete-button:hover {
                    background-color: darkred;
                }
                .copy-button {
                    display: inline-block;
                    padding: 5px 10px;
                    background-color: #f0f0f0;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    margin-top: 10px;
                    margin-left: 10px;
                }
                .copy-button:hover {
                    background-color: #e0e0e0;
                }
                .key-info {
                    border-top: 1px solid #ddd;
                }
            `}</style>
        </div>
    );
}