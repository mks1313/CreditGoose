exports.requestFunding = (req, res) => {
  const { userId, invoiceIds } = req.body;

  if (!userId || !Array.isArray(invoiceIds) || invoiceIds.length === 0) {
    return res.status(400).json({ error: 'Invalid request: userId and invoiceIds are required' });
  }

  const totalAmount = invoiceIds.length * 1000; //  1000 per invoice
  const fees = totalAmount * 0.03; // 3% de fees
  const amountToSend = totalAmount - fees;

  res.json({
    message: `You’ll receive $${amountToSend} in your bank account within 24 hours.`,
    totalAmount,
    fees,
    amountToSend,
    estimatedArrival: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  });
};