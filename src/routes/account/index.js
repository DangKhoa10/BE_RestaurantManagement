const express = require("express");
const accountController = require("../../controllers/account.controller");
const router = express.Router();

router.post("/signUp", accountController.signUp);
router.post("/signIn", accountController.signIn);
router.post(
  "/getAccountCustomerByAccessToken",
  accountController.getAccountCustomerByAccessToken
);
router.post("/verifyOtp", accountController.verifyOtp);
router.post("/sendOtp", accountController.sendOtp);
router.post("/verifyForgetPassword", accountController.verifyForgetPassword);
router.post("/changePassword", accountController.changePassword);
router.get("/getAccountById/:userId", accountController.getAccountById);

module.exports = router;
