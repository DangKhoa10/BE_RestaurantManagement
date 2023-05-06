const EmployeeService = require("../services/employee.service");

class EmployeeController{

    getEmployeeByUserId = async (req, res, next) => {
        try {
            const result = await EmployeeService.getEmployeeByUserId(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }

    getEmployeeByPhone = async (req, res, next) => {
        try {
            const result = await EmployeeService.getEmployeeByPhone(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }
    updateEmployee = async (req, res, next) => {
        try {
            const result = await EmployeeService.updateEmployee(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }
    addEmployee = async (req, res, next) => {
        try {
            const result = await EmployeeService.addEmployee(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }
    deleteEmployee = async (req, res, next) => {
        try {
            const result = await EmployeeService.deleteEmployee(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }
    getAllEmployee = async (req, res, next) => {
        try {
            const result = await EmployeeService.getAllEmployee(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }
    getEmployeeById = async (req, res, next) => {
        try {
            const result = await EmployeeService.getEmployeeById(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }

  
}

module.exports = new EmployeeController()