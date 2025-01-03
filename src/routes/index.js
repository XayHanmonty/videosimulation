const express = require('express');
const statusRoutes = require('./statusRoutes');

const router = express.Router();

// Add /status route
router.use('/status', statusRoutes);

module.exports = router;