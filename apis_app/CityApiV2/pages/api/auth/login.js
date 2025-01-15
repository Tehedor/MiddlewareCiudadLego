// pages/api/auth/login.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User_login = require('../../../models/User_login');

const sequelize = require('../../../utils/db_app_apis_database');


const EnvConfig = require('../../../utils/env.config');
const { jwt_secret_key } = EnvConfig();



export default async function handler(req, res) {
    if (req.method === 'POST') {
        await sequelize.sync(); // Asegúrate de que la base de datos esté sincronizada

        const { email, password } = req.body;
        console.log(jwt_secret_key)

        try {
            const user = await User_login.findOne({ where: { email } });
            if (user && await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ email: user.email }, jwt_secret_key, { expiresIn: '1h' });
                // localStorage.getItem('token')
                res.status(200).json({ token });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        console.log('Invalid credentials');
        res.status(405).json({ message: 'Method not allowed' });
    }
}
