module.exports = {
    reactStrictMode: true,
    basePath: process.env.NEXT_PUBLIC_API_BASE_PATH || '', 
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Forwarded-Proto',
                        value: 'http'
                    }
                ]
            }
        ]
    }
};
