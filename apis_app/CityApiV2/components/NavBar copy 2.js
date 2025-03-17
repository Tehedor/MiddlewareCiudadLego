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
    localStorage.removeItem('token');
    router.push('/login');
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/" legacyBehavior>
          <a>MiLogo</a>
        </Link>
      </div>
      <ul className="nav-links">
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
          padding: 10px 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo a {
          color: white;
          font-size: 1.5em;
          font-weight: bold;
          text-decoration: none;
        }
        .nav-links {
          list-style: none;
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;
        }
        .nav-links li {
          margin-left: 20px;
        }
        .nav-links li a {
          color: white;
          text-decoration: none;
          font-weight: bold;
          transition: color 0.3s;
        }
        .nav-links li a:hover {
          color: #e2e2e2;
        }
        .logout-button {
          background-color: white;
          color: #0070f3;
          border: none;
          padding: 8px 12px;
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
