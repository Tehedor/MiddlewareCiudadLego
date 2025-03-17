import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import jwt from 'jsonwebtoken';

const NavBar = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);  

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const decodedToken = jwt.decode(token);
            setIsAdmin(decodedToken.is_admin);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Elimina el token del almacenamiento local
        router.push('/login'); // Redirige al usuario a la página de inicio de sesión
        setIsLoggedIn(false); // Actualiza el estado de inicio de sesión
        setIsAdmin(false); // Actualiza el estado de administrador
    };

    return (
        <nav className="navbar">
            <ul>
                {!isLoggedIn && (
                    <>
                    <li>
                        <Link href="/login" legacyBehavior>
                            <a>Login</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/register" legacyBehavior>
                            <a>Registro</a>
                        </Link>
                    </li>
                    </>
                )}
                {/* Muestra el enlace a Dashboard solo si el usuario ha iniciado sesión */}
                {isLoggedIn && (
                    <>
                    <li>
                        <Link href="/dashboard" legacyBehavior>
                            <a>Dashboard</a>
                        </Link>
                    </li>
                    {isAdmin && (
                        <li>
                            <Link href="/subscontroller" legacyBehavior>
                                <a>SubsControl</a>
                            </Link>
                            <Link href="/simulator" legacyBehavior>
                                <a>simulator</a>
                            </Link>
                        </li>
                    )}
                    <li>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </li>
                    </>
                )}
            </ul>
            <style jsx>{`
                .navbar {
                    font-family: Arial, sans-serif;
                    background-color: #0070f3;
                    padding: 10px 20px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    position: fixed; /* Fija la barra de navegación en la parte superior */
                    width: 100%; /* Asegura que la barra de navegación cubra todo el ancho */
                    top: 0; /* Fija la barra de navegación en la parte superior */
                    z-index: 1000; /* Asegura que la barra de navegación esté por encima de otros elementos */
                }
                ul {
                    list-style: none;
                    display: flex;
                    justify-content: space-around;
                    margin: 0;
                    padding: 0;
                }
                li a {
                    color: white;
                    text-decoration: none;
                    font-weight: bold;
                }
                .logout-button {
                    background-color: white;
                    color: #0070f3;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 4px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.3s, color 0.3s;
                }
                .logout-button:hover {
                    background-color: #005bb5;
                    color: white;
                }
            `}</style>
        </nav>
    );
};

export default NavBar;