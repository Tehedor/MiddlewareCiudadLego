require('dotenv').config();

function convertToBoolean(envVar) {
    if (typeof envVar === 'boolean') return envVar;
    if (typeof envVar === 'string') {
        return envVar.trim().toLowerCase() === 'true';
    }
    return false;
}

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

    MONGODB_HOST        :mongodb_host = 'localhost',
    MONGODB_PORT        :mongodb_port = 27017,
    MONGODB_NAME        :mongodb_name = 'sth_openiot',

    REDIS_HOST          :redis_host = 'localhost',
    REDIS_PORT          :redis_port = 6379,
    // REDIS_PASSWORD      :redis_password = "12345678",
    
    LIMIT_API_KEY       :limit_api_key = 1000,
    TIME_LIMIT_API_KEY_M:time_limit_api_key = 5, // En minutos

    // MODE_CONTAINER     :mode_container = "false",   
    MODE_CONTAINER    :mode_container = "true",   

    NEXT_PUBLIC_URL_EXTERNA_SIMULATOR        :url_simulator = "http://localhost/simulatorApp/monitor",
    NEXT_PUBLIC_URL_EXTERNA_SUBSCONTROLAPP   :url_subcontrolapp = "http://localhost/subsControlApp/all",
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
    mongodb_host,
    mongodb_port,
    mongodb_name,
    redis_host,
    redis_port,
    mode_container  :   convertToBoolean(mode_container),
    url_simulator,
    url_subcontrolapp,
});

module.exports = EnvConfig;
