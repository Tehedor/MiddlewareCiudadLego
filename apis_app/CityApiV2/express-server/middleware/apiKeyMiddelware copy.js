const redis = require('../../utils/redis_config'); // Cliente Redis
const User = require('../../models/User_keys'); // Modelo MySQL
const { default: next } = require('next');

const REDIS_TTL = 5 * 60; // Tiempo de vida en Redis (5 min * 60 s)

const apiKeyMiddleware = () => {
    console.log('apiKeyMiddleware');
    return async (req, res, next) => {
    //     const apiKey = req.query.apiKey || req.headers['x-api-key'] || req.body.apiKey;

        // if (!apiKey) {
        //     return res.status(400).json({ error: 'API key is required' });
        // }

        // try {
            // Obtener datos de Redis
            // let cachedData = await redis.get(apiKey);
            // let apiData;

            // if (cachedData) {
            //     apiData = JSON.parse(cachedData);
            // } else {
            //     // Buscar en MySQL si no está en Redis
            //     const user = await User.findOne({ where: { api_key: apiKey } });

            //     if (!user) {
            //         return res.status(401).json({ error: 'Invalid API key' });
            //     }

            //     // Crear datos iniciales y guardar en Redis
            //     apiData = {
            //         requestCount: user.request_count,
                    
            //         time_limit_api_key: user.time_limit_api_key, 
            //         request_count_limit: user.request_count_limit,

            //         remaining_requests: user.remaining_requests,
            //         last_date_period: user.last_date_period,
            //         time_limit_api_key: user.time_limit_api_key,
                    
            //         resetTime: new Date(user.last_date_period).getTime() + user.time_limit_api_key * 60 * 1000,
            //     };

            //     await redis.set(apiKey, JSON.stringify(apiData), 'EX', REDIS_TTL);
            // }

            // const currentTime = Date.now();

            // // Verificar si el tiempo límite ha expirado
            // if (currentTime > apiData.resetTime) {
            //     apiData.remaining_requests = request_count_limit; // Restablecer solicitudes disponibles
            //     apiData.resetTime = currentTime + time_limit_api_key * 60 * 1000;
            // }

            // // // Verificar si quedan solicitudes disponibles
            // if (apiData.remaining_requests <= 0) {
            //     const retryAfter = Math.ceil((apiData.resetTime - currentTime) / 1000); // Tiempo restante en segundos
            //     return res.status(429).json({
            //         error: 'Too many requests, please try again later.',
            //         retryAfter,
            //         resetTime: new Date(apiData.resetTime).toISOString()
            //     });
            // }

            // // // Decrementar solicitudes restantes
            // apiData.remaining_requests -= 1;
            // apiData.requestCount += 1;

            // // // Guardar en Redis
            // await redis.set(apiKey, JSON.stringify(apiData), 'EX', REDIS_TTL);

            // // // Sincronizar con MySQL
            // await User.update(
            //     {
                    
            //         request_count: apiData.request_count,
                    
            //         // time_limit_api_key: apiData.time_limit_api_key,
            //         // request_count_limit: apiData.request_count_limit,
                    
            //         remaining_requests: apiData.remaining_requests,
            //         last_date_period: new Date(apiData.resetTime),
            //         // time_limit_api_key: apiData.time_limit_api_key,
        
            //         // requestCount
            //         // request_count: apiData.requestCount,
                    
            //         // time_limit_api_key
            //         // request_count_limit
                    
            //         // remaining_requests
            //         // remaining_requests: apiData.remaining_requests,
            //         // last_date_period
            //         // last_date_period: new Date(apiData.resetTime)
            //         // time_limit_api_key
            //     },
            //     { where: { api_key: apiKey } }
            // );

            // // // Adjuntar datos al objeto de solicitud
            // req.apiKeyData = {
            //     apiKey,
            //     requestCount: apiData.requestCount,
            //     remaining_requests: apiData.remaining_requests,
            //     resetTime: new Date(apiData.resetTime).toISOString()
            // };

        //     next();
        // } catch (error) {
        //     console.error(error);
        //     res.status(500).json({ error: 'Internal server error' });
        // }
    // };
    // res.status(200).json({
    //     message: `This is an example endpoint.`,
    // });
    };

};

module.exports = apiKeyMiddleware;
