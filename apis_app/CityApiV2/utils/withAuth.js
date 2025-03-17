import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

const withAuth = (WrappedComponent, requireAdmin = false) => {
  return (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwt.decode(token);
        setIsAuthenticated(true);
        setIsAdmin(decodedToken.is_admin);

        if (requireAdmin && !decodedToken.is_admin) {
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    }, [router]);

    if (!isAuthenticated || (requireAdmin && !isAdmin)) {
      return null; // O muestra un spinner de carga
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;