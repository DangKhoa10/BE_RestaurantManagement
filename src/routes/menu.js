const express = require("express");
const menuController = require("../controllers/menu.controller");
const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *      ThucDon:
 *          type: Object
 *          required:
 *              - TenMonAn
 *          properties:
 *               TenMon: 
 *                  type: string
 *          
 */
router.post("/addMenu", menuController.addMenu);
router.get("/getAllMenu", menuController.getAllMenu);
router.post("/getMenuByAll", menuController.getMenuByAll);
router.post("/getMenuByTypeMenuId", menuController.getMenuByTypeMenuId);
router.post("/updateMenu", menuController.updateMenu);
router.post("/deleteMenu", menuController.deleteMenu);

/**
 * @swagger
 * /getOneMenu/{dishId}:
 *   get:
 *     summary: Retrieve a single menu item by ID
 *     parameters:
 *       - in: path
 *         name: dishId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the menu item to retrieve
 *     responses:
 *       '200':
 *         description: A single menu item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ThucDon'
 */
router.get("/getOneMenu/:dishId", menuController.getOneMenu);

module.exports = router;
