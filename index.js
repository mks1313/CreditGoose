const express = require('express');
const { exec } = require('child_process');

// Create router
const router = express.Router();

// Import route handlers
const { simulate } = require('.controllers/simulateController');
const { healthCheck } = require('.controllers/healthController');

// Routes
router.get('/simulate', simulate);
router.get('/health', healthCheck);

// Create Express app
const app = express();

// Use your custom routes
app.use('/', router);

// Goose version endpoint
app.get('/goose-version', (req, res) => {
  exec('goose --version', (error, stdout, stderr) => {
    if (error) return res.status(500).send(error.message);
    if (stderr) return res.status(500).send(stderr);
    res.send(stdout);
  });
});

app.listen(8080, () => console.log('Server running on 8080'));

module.exports = router;
