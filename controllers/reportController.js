exports.getMonthlyReport = (req, res) => {
  res.json({
    month: 'June 2025',
    totalFunded: 25000,
    totalFees: 850,
    averageTimeSaved: '14 days',
  });
};