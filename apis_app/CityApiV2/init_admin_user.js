// init_admin_user.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User_login = require('./models/User_login');
const sequelize = require('./utils/db_app_apis_database');

const EnvConfig = require('./utils/env.config');
const { jwt_secret_key, admin_email, admin_password } = EnvConfig();


// Usa las variables según sea necesario
console.log("jwt_secret_key",jwt_secret_key);
console.log("admin_email",admin_email);
console.log("admin_password",admin_password);   

async function createAdminUser() {
    const email = admin_email;
    const password = admin_password;

    try {
        await sequelize.sync(); // Asegúrate de que la base de datos esté sincronizada

        // Verifica si el usuario admin ya existe
        const existingUser = await User_login.findOne({ where: { email } });
        if (existingUser) {
            console.log('Admin user already exists.');
            return;
        }

        // Crea el usuario admin

                // Crea el usuario admin
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User_login.create({ email, password: hashedPassword, is_admin: true });

        // Genera el token JWT
        const token = jwt.sign({ email: newUser.email, is_admin: newUser.is_admin }, jwt_secret_key, { expiresIn: '1h' });

        // Genera el token JWT
        console.log('Admin user created successfully.');
        console.log('JWT Token:', token);
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
}

createAdminUser();