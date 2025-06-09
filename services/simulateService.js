function simulateLoan({ amount, duration }) {
  // Simulación básica
  const interestRate = 0.05;
  const totalRepayable = amount * (1 + interestRate);
  const monthlyPayment = totalRepayable / duration;

  return {
    amount,
    duration,
    interestRate,
    monthlyPayment: monthlyPayment.toFixed(2),
    totalRepayable: totalRepayable.toFixed(2),
  };
}

module.exports = {
  simulateLoan,
};
