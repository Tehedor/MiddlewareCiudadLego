const EnvConfig = require('./env.config');
const { jwt_secret_key} = EnvConfig();

const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
        const decoded = jwt.verify(token, jwt_secret_key); // Reemplaza 'your_secret_key' con tu clave secreta real
        req.user = decoded; // Adjunta el usuario decodificado al objeto req
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = authenticate;