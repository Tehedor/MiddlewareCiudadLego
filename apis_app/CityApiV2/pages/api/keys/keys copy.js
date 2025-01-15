// pages/api/keys/index.js
const { v4: uuidv4 } = require('uuid');
const User_keys = require('../../../models/User_keys');
const authenticate = require("../../../utils/authenticate");

export default async function handler(req, res) {
    
    await authenticate(req, res, () => {});
    
    const { method } = req;
    
    switch (method) {
        case 'GET':
            // console.log(req.user.email);     
            try {
                // const keys = await User_keys.findAll({ where: { email: 'sergio@upm.es' } });
                const keys = await User_keys.findAll({ where: { email: req.user.email } });
                res.status(200).json(keys);
                console.log(keys);
                // console.log(req.user.email);
            } catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
            break;
        case 'POST':
            try {
                const newApiKey = uuidv4();
                const newKey = await User_keys.create({ email: req.user.email, api_key: newApiKey });
                res.status(201).json(newKey);
            } catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
