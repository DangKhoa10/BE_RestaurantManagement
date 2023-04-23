const express = require("express");
const { apiKey } = require("../auth/checkAuth");
const router = express.Router();

//router.use(apiKey)

router.use("/api/menu", require("./menu"));
router.use("/api/table", require("./table"));
router.use("/api/area", require("./area"));
router.use("/api/room", require("./room"));
router.use("/api/account", require("./account"));
router.use("/api/order", require("./order"));
router.use("/api/invoice", require("./invoice"));
router.use("/api/customer", require("./customer"));
router.use("/api/employee", require("./employee"));
router.use("/api/typeOfRoom", require("./typeOfRoom"));
router.use("/api/typeOfMenu", require("./typeOfMenu"));
router.use("/api/image", require("./image"));



module.exports = router;
