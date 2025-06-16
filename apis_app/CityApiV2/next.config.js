module.exports = {
    // Activa el modo estricto de React, que ayuda a detectar problemas potenciales en la app.
    reactStrictMode: true,

    // Define el path base para todas las rutas. Se toma de la variable de entorno NEXT_PUBLIC_API_BASE_PATH o se deja vacío si no existe.
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