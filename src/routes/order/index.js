const express = require('express');
const orderController = require('../../controllers/order.controller');
const router = express.Router()

router.post('/addOrder', orderController.addOrder)
router.post('/updateOrder', orderController.updateOrder)
router.post('/getOrderByUser', orderController.getOrderByUser)
router.post('/changeStatus', orderController.changeStatus)
router.post('/getOrderByAll', orderController.getOrderByAll)
router.post('/getOrderById', orderController.getOrderById)
router.post('/getOrderDetailByOrder', orderController.getOrderDetailByOrder)
router.get('/getAllOrder', orderController.getAllOrder)

module.exports = router