// pages/api/auth/validate.js
import User_keys from '../../../models/User_keys';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { apiKey } = req.body;

        try {
            const user = await User_keys.findOne({ where: { api_key: apiKey } });
            if (user) {
                user.request_count += 1;
                await user.save();
                res.status(200).json({ message: 'API key valid', request_count: user.request_count });
            } else {
                res.status(404).json({ error: 'Invalid API key' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
