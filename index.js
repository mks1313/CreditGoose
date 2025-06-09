const express = require('express');
const router = express.Router();


// Routes
router.get('/simulate', simulate);
router.get('/health', healthCheck);

module.exports = router;
