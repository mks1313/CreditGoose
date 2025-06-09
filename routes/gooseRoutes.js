const express = require('express');
const router = express.Router();
const gooseController = require('../controllers/gooseController');

router.get('/goose-version', gooseController.getGooseVersion);
router.get('/goose-news', gooseController.getGooseNews);
router.get('/health', gooseController.gooseHealthCheck);

module.exports = router;
