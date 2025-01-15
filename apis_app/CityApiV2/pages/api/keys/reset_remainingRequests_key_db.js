const User_keys = require('../../../models/User_keys');

const authenticate = require("../../../utils/authenticate");


export default async function handler(req, res) {
    await authenticate(req, res, () => {});

    switch (req.method) {
        case 'POST':
            try {
                await User_keys.update(
                    {
                        remaining_requests: req.body.request_count_limit,
                        last_date_period: req.body.nextPeriod
                    },
                    { where: { api_key: req.body.apiKey } }
                );
                res.status(200).json({ message: 'Request count limit updated successfully' });
            } catch (error) {
                console.error('Error deleting API key:', error); // Registro de depuración
                res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            break;

        default:
                res.setHeader('Allow', ['POST']);
                res.status(405).end(`Method ${method} Not Allowed`);
    }
}
