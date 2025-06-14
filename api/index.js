const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

////////////////////////////////////////////////////////////////////////////////
// DO NOT MOVE this lines from the top of the file
app.use(cors());
app.use(express.json());
////////////////////////////////////////////////////////////////////////////////

// Rutas principales
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/invoices', require('./routes/invoiceRoutes'));
app.use('/fund', require('./routes/fundRoutes'));
app.use('/report', require('./routes/reportRoutes'));
app.use('/admin', require('./routes/adminRoutes'));
// app.use('/goose', (req, res, next) => {
//   console.log(`Goose route hit: ${req.method} ${req.originalUrl}`);
//   next();
// }, require('./routes/gooseRoutes'));

// app.use('/goose', require('./routes/gooseRoutes')); // <--- Aquí las rutas de Goose

app.use('/goose', (req, res) => {
  res.status(503).send("🐥 Goose is currently in demo mode and taking a nap on the farm.");
});

// Arrancar servidor
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
