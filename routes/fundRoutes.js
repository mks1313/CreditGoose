const express = require('express');
const router = express.Router();
const { requestFunding } = require('../controllers/fundController');

router.post('/request', requestFunding);

module.exports = router;
