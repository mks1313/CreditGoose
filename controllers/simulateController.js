const { simulateLoan } = require('../services/simulateService');

function simulate(req, res) {
  const { amount, duration } = req.query;

  if (!amount || !duration) {
    return res.status(400).json({ error: 'Missing amount or duration' });
  }

  const result = simulateLoan({
    amount: parseFloat(amount),
    duration: parseInt(duration),
  });

  res.json(result);
}

module.exports = {
  simulate,
};
