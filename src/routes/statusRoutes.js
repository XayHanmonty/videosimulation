const express = require('express');
const { TRANSLATION_DELAY, ERROR_PROBABILITY } = require('../cofig');
const router = express.Router();

let startTime = Date.now();

// GET /status route
router.get('/', (req, res, next) => {
    try {
        const elapsedTime = Date.now() - startTime;
        const hasError = Math.random() < ERROR_PROBABILITY;

        if (hasError) {
            return res.json({ result: 'error' });
        }

        if (elapsedTime < TRANSLATION_DELAY) {
            return res.json({ result: 'pending' });
        }

        return res.json({ result: 'completed' });
    } catch (error) {
        next(error); 
    }
});

module.exports = router;