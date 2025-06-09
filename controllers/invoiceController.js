exports.connectSquare = (req, res) => {
  res.json({ message: "Connected to Square." });
};

exports.getInvoices = (req, res) => {
  res.json([
    { invoiceId: "inv_001", customer: "Alice & Co", amount: 10000 },
  ]);
};

exports.fundInvoices = (req, res) => {
  // lógica mock
  res.json({ message: "Funding requested." });
};

exports.enableAutoFunding = (req, res) => {
  res.json({ message: "Auto-funding enabled." });
};

exports.getMonthlyReport = (req, res) => {
  res.json({ totalFunded: 25000, totalFees: 850 });
};