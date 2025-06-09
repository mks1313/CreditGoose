const express = require('express');
const router = express.Router();

const { healthCheck } = require('../controllers/healthController');

router.get('/', healthCheck);
router.get('/simulate', (req, res) => {
  const { amount, duration } = req.query;

  const principal = parseFloat(amount);
  const months = parseInt(duration);
  const annualRate = 0.08; // 8% anual
  const monthlyRate = annualRate / 12;

  const monthlyPayment = (
    (principal * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -months))
  ).toFixed(2);

  console.log(`[SIMULATE] amount=${amount}, duration=${duration}, monthly=${monthlyPayment}`);

  res.json({
    amount,
    duration,
    interestRate: `${(annualRate * 100).toFixed(2)}%`,
    monthlyPayment,
  });
});

module.exports = router;