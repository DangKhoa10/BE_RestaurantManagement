const express = require('express');
const employeeController = require('../../controllers/employee.controller');
const router = express.Router()

router.post('/getEmployeeByUserId' , employeeController.getEmployeeByUserId)
router.post('/getEmployeeByPhone' , employeeController.getEmployeeByPhone)
router.post('/updateEmployee' , employeeController.updateEmployee)
router.post('/addEmployee' , employeeController.addEmployee)
router.post('/deleteEmployee' , employeeController.deleteEmployee)

module.exports = router