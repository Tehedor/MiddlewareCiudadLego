import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import withAuth from '../utils/withAuth';
import axios from '../utils/axiosConfig';

import NavBar from '../components/NavBar';

function Dashboard() {
    const [keys, setKeys] = useState([]);
    const [keyLimit, setKeyLimit] = useState(null); // Límite de API keys
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchKeysAndLimit = async () => {
            try {
                const token = localStorage.getItem('token');

                // Obtener las API keys y el límite de claves permitidas
                const res = await axios.get('/api/keys/keys', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.data && res.data.keys && res.data.maxKeys !== undefined) {
                    setKeys(res.data.keys);
                    setKeyLimit(res.data.maxKeys);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (error) {
                console.error('Error fetching keys or limit:', error);
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    router.push('/login');
                }
            }
        };

        fetchKeysAndLimit();

        const intervalId = setInterval(fetchKeysAndLimit, 1000); // Actualiza cada 5 segundos

        return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
    }, [router]);

    const handleGenerateKey = async () => {
        if (keys.length >= keyLimit) {
            setErrorMessage(`You have reached the maximum number of API keys (${keyLimit}).`);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/keys/keys', {}, {
                headers: { Authorization: `Bearer ${token}` },
                timeout: 10000
            });

            if (res.data && res.data.newKey && res.data.maxKeys !== undefined) {
                setKeys([...keys, res.data.newKey]);
                setKeyLimit(res.data.maxKeys); // Actualiza el límite de API keys
                setErrorMessage('');
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Error generating key:', error);
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
            console.error('Error deleting key:', error);
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

    return (
        <div className="dashboard-container">
            <NavBar />
            <div className="container">
                <h1 className="title">API Keys Dashboard</h1>
                <div className="generate-container">
                    <button 
                        className="generate-button" 
                        onClick={handleGenerateKey} 
                        disabled={keys.length >= keyLimit}
                    >
                        Generate New API Key
                    </button>
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
                                <p style={{ color: key.remaining_requests <= 0 ? 'red' : 'green' }}>
                                    <strong style={{ color: key.remaining_requests <= 0 ? 'red' : 'green' }}>
                                        Remaining Requests:
                                    </strong> {key.remaining_requests}
                                </p>
                            </div>    
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
                .dashboard-container {
                    margin-top: 40px;
                    font-family: Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-height: 100vh;
                    background-color: #f4f4f9;
                }
                .container {
                    width: 90%;
                    max-width: 900px;
                    margin: 0 auto;
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    margin-top: 65px;
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
                .generate-button:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
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
            `}</style>
        </div>
    );
}

export default withAuth(Dashboard);