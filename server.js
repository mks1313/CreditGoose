const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// Middleware
app.use(express.json());

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/invoices', require('./routes/invoiceRoutes'));
app.use('/fund', require('./routes/fundRoutes'));
app.use('/report', require('./routes/reportRoutes'));

const server = app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

// Graceful shutdown
function closeGracefully(signal) {
  console.log(`Received signal to terminate: ${signal}`);
  server.close(() => {
    console.log('Http server closed.');
    process.exit(0);
  });
}

process.on('SIGINT', closeGracefully);
process.on('SIGTERM', closeGracefully);