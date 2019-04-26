const express = require('express');
const router = express.Router();
const details = require('./middleware');

router.get('/', async (req, res) => {
    try {
        const response = await details();
        return res.status(200).json(response);  
        
    } catch (error) {
        res.status(503).json({
            error_message: error.message
        });
    }
    
});

module.exports = router;
