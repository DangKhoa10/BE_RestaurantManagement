const employeeModel = require("../models/employee.model")

class EmployeeService {

    static getEmployeeByUserId = async ({MaTaiKhoan}) =>{
        try{
            const employee = await employeeModel.findOne({MaTaiKhoan});
            return {
                code: 200,
                metadata: {
                    success: true,
                    data: employee
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'get employee error',
                }
                
            }
        }
    }

    static getEmployeeByPhone = async ({SoDienThoai}) =>{
        try{
            const employee = await employeeModel.findOne({SoDienThoai});
            return {
                code: 200,
                metadata: {
                    success: true,
                    data: employee
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'get employee error',
                }
                
            }
        }
    }
    static addEmployee = async ({TenNhanVien, HinhAnh , SoDienThoai , DiaChi , NgaySinh, GioiTinh ,Email, MaTaiKhoan})=>{
        try{
            const newEmployee = await employeeModel.create({
                TenNhanVien, HinhAnh , SoDienThoai , DiaChi , NgaySinh, GioiTinh ,Email, MaTaiKhoan
            })
            if(newEmployee){
                return {
                    code: 201,
                    metadata:{
                        success: true,
                        data: newEmployee,
                    }
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'add employee error',
                }
            }
        }
    }
    static updateEmployee = async ({id,TenNhanVien ,HinhAnh, SoDienThoai , DiaChi , NgaySinh, GioiTinh })=>{
        try{
            const employee = await employeeModel.findOneAndUpdate({
                _id: id
            },{
                TenNhanVien, HinhAnh , SoDienThoai , DiaChi , NgaySinh, GioiTinh 
            },{
                new: true
            })
            return {
                code: 200,
                metadata:{
                    success: true,
                    message: 'Update thành công',
                    data: employee,
                }
            }
            
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'update employee error',
                }
            }
        }
    }
    static deleteEmployee = async ({id})=>{
        try{
            await employeeModel.deleteOne({ _id: id })
           
            return {
                code: 200,
                metadata:{
                    success: true,
                    message: "Xóa thành công",
                }
            }
            
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'delete employee error',
                }
            }
        }
    }
}

module.exports = EmployeeService