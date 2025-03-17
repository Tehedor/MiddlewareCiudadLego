import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

import { mode_container } from '../utils/env.config';

// const simulatorLink = mode_container ? 'http://simulatorApp:3030/monitor' : 'http://localhost/simulatorApp/monitor';
const swaggerLink = mode_container ? 
    'http://localhost/apisApp/'
    : 
    'http://localhost:3001/';





const NavBar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwt.decode(token);
      setIsAdmin(decodedToken.is_admin);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    router.push('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        {/* <Link href="/" legacyBehavior>
          <a></a>
        </Link> */}
        <a href={swaggerLink} target="_blank" rel="noopener noreferrer">Swagger</a>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
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
        {isLoggedIn && (
          <>
            <li>
              <Link href="/dashboard" legacyBehavior>
                <a>Dashboard</a>
              </Link>
            </li>
            {isAdmin && (
              <>
                <li>
                  <Link href="/subscontroller" legacyBehavior>
                    <a>SubsControl</a>
                  </Link>
                </li>
                <li>
                  <Link href="/simulator" legacyBehavior>
                    <a>Simulator</a>
                  </Link>
                </li>
              </>
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
          padding: 15px 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          background-color: #85EA2D; /* Cambia el fondo del componente logo */
          padding: 10px 20px; /* Ajusta el padding para que se vea bien en altura */
          border-radius: 4px; /* Añade bordes redondeados */
          margin-left: 20px; /* Añade margen a la izquierda */
        }
        .logo a {
          color: black;
          font-size: 1.8em;
          font-weight: 800;
          text-decoration: none;
        }
        .menu-icon {
          display: none;
          flex-direction: column;
          cursor: pointer;
        }
        .menu-icon .bar {
          width: 25px;
          height: 3px;
          background-color: white;
          margin: 4px 0;
          transition: 0.4s;
        }
        .nav-links {
          list-style: none;
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;
          margin-right: 20px; /* Añade margen a la derecha */
        }
        .nav-links li {
          margin-left: 25px;
          position: relative;
        }
        .nav-links li a {
          color: white;
          text-decoration: none;
          font-size: 1.1em;
          font-weight: 800;
          transition: all 0.3s ease;
        }
        .nav-links li a:after {
          content: '';
          position: absolute;
          width: 0%;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: white;
          transition: width 0.3s ease;
        }
        .nav-links li a:hover:after {
          width: 100%;
        }
        .logout-button {
          background-color: white;
          color: #0070f3;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          font-weight: 800;
          cursor: pointer;
          transition: background-color 0.3s, color 0.3s;
        }
        .logout-button:hover {
          background-color: #005bb5;
          color: white;
        }
        @media (max-width: 768px) {
          .menu-icon {
            display: flex;
          }
          .nav-links {
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            background-color: #0070f3;
            flex-direction: column;
            align-items: center;
            display: none;
          }
          .nav-links.active {
            display: flex;
          }
          .nav-links li {
            margin: 10px 0;
          }
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
