import { useEffect } from 'react';
import { useRouter } from 'next/router';


export default function Login() {

    const router = useRouter();

    useEffect(() => {
        router.push('/login');
    }, [router]);
    return (
        <div>
            <h1>Login Page</h1>
        </div>
    );
}