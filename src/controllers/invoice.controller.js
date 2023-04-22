const InvoiceService = require("../services/invoice.service");

class InvoiceController {
    addInvoice = async (req, res, next) => {
    try {
      const result = await InvoiceService.addInvoice(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
  updateInvoice = async (req, res, next) => {
    try {
      const result = await InvoiceService.updateInvoice(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
  getInvoiceById = async (req, res, next) => {
    try {
      const result = await InvoiceService.getInvoiceById(req.params);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
  getInvoiceByAll = async (req, res, next) => {
    try {
      const result = await InvoiceService.getInvoiceByAll(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
  
}

module.exports = new InvoiceController();
