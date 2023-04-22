const express = require('express');
const invoiceController = require('../../controllers/invoice.controller');
const router = express.Router()

router.post('/addInvoice', invoiceController.addInvoice)
router.post('/updateInvoice', invoiceController.updateInvoice)
router.post('/getInvoiceByAll', invoiceController.getInvoiceByAll)
router.get('/getInvoiceById', invoiceController.getInvoiceById)

module.exports = router