const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.post('/connect-square', invoiceController.connectSquare);
router.get('/invoices', invoiceController.getInvoices);
router.post('/fund', invoiceController.fundInvoices);
router.post('/auto-funding', invoiceController.enableAutoFunding);
router.get('/report', invoiceController.getMonthlyReport);

module.exports = router;