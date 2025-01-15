const EnvConfig = require('./env.config');
const { redis_host, redis_port } = EnvConfig();

const Redis = require('ioredis');

let redisInstance = null; // Variable para almacenar la instancia de Redis

const connectToRedis = async () => {
    return new Promise((resolve, reject) => {
        const redis = new Redis({
            host: redis_host,
            port: redis_port,
            // password: redis_password // Descomentar si usas contraseña
        });

        redis.on('connect', () => {
            console.log('Connected to Redis');
            resolve(redis);
        });

        redis.on('error', (err) => {
            console.error('Redis connection error:', err);
            setTimeout(() => {
                console.log('Retrying connection to Redis...');
                connectToRedis().then(resolve).catch(reject);
            }, 5000); // Reintentar cada 5 segundos
        });
    });
};

const getRedisClient = async () => {
    if (!redisInstance) {
        try {
            redisInstance = await connectToRedis();
        } catch (error) {
            console.error('Failed to connect to Redis:', error);
            process.exit(1); // Salir si no se puede conectar
        }
    }
    return redisInstance;
};

module.exports = getRedisClient;
