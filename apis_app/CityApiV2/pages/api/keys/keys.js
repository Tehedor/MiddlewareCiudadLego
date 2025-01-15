const { v4: uuidv4 } = require('uuid');
const Redis = require('ioredis');
const User_keys = require('../../../models/User_keys');
const User_login = require('../../../models/User_login');

const authenticate = require("../../../utils/authenticate");


export default async function handler(req, res) {
    await authenticate(req, res, () => {});

    switch (req.method) {
        case 'GET':
            try {
                const keys = await User_keys.findAll({ where: { email: req.user.email } });
                res.status(200).json(keys);
            } catch (error) {
                console.error('Error creating API key:', error); // Registro de depuración
                res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            break;
        case 'POST':
            try {
                // console.log("Generating new API key");

                // Verifica el número de claves existentes para el usuario
                const user = await User_login.findOne({ where: { email: req.user.email } });
                const existingKeys = await User_keys.count({ where: { email: req.user.email } });
                // usuarios normales 4 claves y usuarios admin 10 claves
                const maxKeys = user.is_admin ? 10 : 4;

                if (existingKeys >= maxKeys) {
                    return res.status(403).json({ error: `You have reached the limit of ${maxKeys} API keys.` });
                }

                const newApiKey = uuidv4();
                const newKey = await User_keys.create({ email: req.user.email, api_key: newApiKey });
                res.status(201).json(newKey);
            } catch (error) {
                console.log(error)
                res.status(500).json({ error: 'Internal server error' });
            }
            break;
        case 'DELETE':
            try {
                const { apiKey } = req.query;
                await User_keys.destroy({ where: { api_key: apiKey, email: req.user.email } });
                res.status(204).end();
            } catch (error) {
                console.error('Error deleting API key:', error); // Registro de depuración
                res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            break;

        default:
                res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
    }
}
