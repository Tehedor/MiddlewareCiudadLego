import { useEffect } from 'react';
import { useRouter } from 'next/router';

import EnvConfig from '../utils/env.config';

const {mode_container} = EnvConfig();


export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push(mode_container === "true" ? '/apisApp/login' : '/login');
    }, [router]);

    return null;
}