const AccountService = require("../services/account.service");

class AccountController {
  signUp = async (req, res, next) => {
    try {
      const result = await AccountService.signUp(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };

  signIn = async (req, res, next) => {
    try {
      const result = await AccountService.signIn(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };

  getAccountCustomerByAccessToken = async (req, res, next) => {
    try {
      const result = await AccountService.getAccountCustomerByAccessToken(
        req.body
      );
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };

  verifyOtp = async (req, res, next) => {
    try {
      const result = await AccountService.verifyOtp(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
  verifyOtp = async (req, res, next) => {
    try {
      const result = await AccountService.verifyOtp(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
  sendOtp = async (req, res, next) => {
    try {
      const result = await AccountService.sendOtp(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
  verifyForgetPassword = async (req, res, next) => {
    try {
      const result = await AccountService.verifyForgetPassword(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
  changePassword = async (req, res, next) => {
    try {
      const result = await AccountService.changePassword(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };

  getAccountById = async (req, res, next) => {
    try {
      const result = await AccountService.getAccountById(req.params.userId);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new AccountController();
