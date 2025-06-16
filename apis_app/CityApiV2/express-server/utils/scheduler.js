const cron = require('node-cron');
const { Op } = require('sequelize');
const User = require('../../models/User_keys');
const redisClient = require('../../utils/redis_config');

const startResetApiKeyJob = async () => {
    const redis = await redisClient();

    // Ejecutar cada minuto
    cron.schedule('* * * * *', async () => {
        try {
            // console.log(`[CRON] Ejecutando reseteo de API Keys`);

            const now = new Date();

            const expiredUsers = await User.findAll({
                where: {
                    last_date_period: {
                        [Op.lt]: new Date(now.getTime() - 1 * 60 * 1000),
                    }
                }
            });

            for (const user of expiredUsers) {
                const resetTime = new Date(user.last_date_period.getTime() + user.time_limit_api_key * 60 * 1000);

                if (now > resetTime) {
                    // console.log(`[RESET] Reiniciando API key: ${user.api_key}`);

                    user.request_count = 0;
                    user.remaining_requests = user.request_count_limit;
                    user.last_date_period = now;
                    await user.save();

                    const cached = await redis.get(user.api_key);
                    if (cached) {
                        const apiData = JSON.parse(cached);
                        apiData.request_count = 0;
                        apiData.remaining_requests = user.request_count_limit;
                        apiData.last_date_period = now.toISOString();
                        apiData.resetTime = now.getTime() + user.time_limit_api_key * 60 * 1000;

                        await redis.set(user.api_key, JSON.stringify(apiData), 'EX', 300);
                        // console.log(`[REDIS] Actualizado cache para ${user.api_key}`);
                    }
                }
            }
        } catch (err) {
            console.error('[ERROR]', err);
        }
    });
};

module.exports = startResetApiKeyJob;
