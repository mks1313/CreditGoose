const express = require('express');
const router = express.Router();

const { healthCheck } = require('../controllers/healthController');

router.get('/', healthCheck);
router.get('/simulate', (req, res) => {
  const { amount, duration } = req.query;

  // lógica simulada (ejemplo)
  const monthlyPayment = (parseFloat(amount) / parseInt(duration)).toFixed(2);

  res.json({
    amount,
    duration,
    monthlyPayment,
  });
});
module.exports = router;
