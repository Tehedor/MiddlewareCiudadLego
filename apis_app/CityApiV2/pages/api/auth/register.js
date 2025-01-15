// pages/api/auth/register.js
const bcrypt = require('bcrypt');
const User_login = require('../../../models/User_login');

const sequelize = require('../../../utils/db_app_apis_database');


export default async function handler(req, res) {
    if (req.method === 'POST') {

        await sequelize.sync(); // Asegúrate de que la base de datos esté sincronizada

        const { email, password } = req.body;

        // Check if the email already exists
        const existingUser = await User_login.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const newUser = await User_login.create({ email, password: hashedPassword });
            res.status(200).json({ message: 'User registered successfully' });
        } catch (error) {
            // Log the error for debugging purposes
            console.error('Error creating user:', error);
            res.status(400).json({ error: 'Error creating user' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
