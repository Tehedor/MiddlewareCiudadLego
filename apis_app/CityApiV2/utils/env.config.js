require('dotenv').config();

const {
    // PORT            :app_port = 3001,
    // NEXT_PORT       :next_port = 3000,
    SERVER_PORT         :server_port = 3001,
    JWT_SECRET_KEY      :jwt_secret_key ,       
    ADMIN_EMAIL         :admin_email    = "admin",
    ADMIN_PASSWORD      :admin_password =  "12345678",      
    
    REDIS_TTL           :redis_ttl = 60, // En segundos (tiempo de vida en redis) 
    
    DB_HOST             :db_host,
    DB_USER             :db_user,
    DB_PASSWORD         :db_password,

    REDIS_HOST          :redis_host = localhost,
    REDIS_PORT          :redis_port = 6379,
    // REDIS_PASSWORD      :redis_password = "12345678",
    
    LIMIT_API_KEY       :limit_api_key = 1000,
    TIME_LIMIT_API_KEY_M:time_limit_api_key = 5, // En minutos

    NODE_ENV     :mode_container = "development",    
    NEXT_PUBLIC_API_BASE_URL :next_public_api_base_url = "http://localhost/apisApp"

} = process.env;

const EnvConfig = () => ({ 
    // next_port,
    server_port,
    // app_port,
    limit_api_key,
    time_limit_api_key,
    jwt_secret_key, 
    redis_ttl,
    admin_email, 
    admin_password,
    db_host,
    db_user,
    db_password,
    redis_host,
    redis_port,
    mode_container,
    next_public_api_base_url
    
});

module.exports = EnvConfig;

// validar  tipos con zod (no lo voy a hacer)