exports.connectSquare = (req, res) => {
  res.json({ message: "Connected to Square." });
};

exports.getInvoices = (req, res) => {
  console.log(`From frontend: ${req.method}`)
  res.json({
    invoices: [
      {
        id: "inv001",
        merchant_id: "mch123",
        amount: 2500.75,
        issue_date: "2024-12-01T00:00:00Z",
        due_date: "2025-01-01T00:00:00Z",
        status: "approved"
      },
      {
        id: "inv002",
        merchant_id: "mch456",
        amount: 1800.00,
        issue_date: "2024-12-15T00:00:00Z",
        due_date: "2025-01-15T00:00:00Z",
        status: "pending"
      },
      {
        id: "inv003",
        merchant_id: "mch789",
        amount: 3000.50,
        issue_date: "2025-01-01T00:00:00Z",
        due_date: "2025-02-01T00:00:00Z",
        status: "funded"
      }
    ],
    stats: {
      total_count: 3,
      total_amount: 7301.25,
      total_funded_amount: 3000.50
    }
  });
};

exports.fundInvoices = (req, res) => {
  // lógica mock
  res.json({ message: "Funding requested." });
};

exports.enableAutoFunding = (req, res) => {
  console.log(`From frontend autoFundingEnabled: ${req.body.autoFundingEnabled}`);
  res.json({ message: "Auto-funding enabled." });
};

exports.getMonthlyReport = (req, res) => {
  res.json({ totalFunded: 25000, totalFees: 850 });
};