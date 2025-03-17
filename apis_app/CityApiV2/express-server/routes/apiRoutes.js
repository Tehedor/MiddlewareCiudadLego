const express = require('express');
const apiKeyMiddleware = require('../middleware/apiKeyMiddelware')

const router = express.Router();


router.use('/example', apiKeyMiddleware);

// Ruta protegida con validación de API key y limitador
router.get('/example', (req, res) => {
    res.json({
        message: `This is an example endpoint.`,
    });
});

module.exports = router;


