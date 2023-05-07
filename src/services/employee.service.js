const employeeModel = require("../models/employee.model")
const accountModel = require("../models/account.model");
const customerModel = require("../models/customer.model");

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
    static addEmployee = async ({TenNhanVien, HinhAnh , SoDienThoai , DiaChi , NgaySinh, GioiTinh ,Email})=>{
        try{
            let MaTaiKhoan
            if(!SoDienThoai){
                return {
                    code: 400,
                    metadata:{
                        success: false,
                        status: 'Chưa có số điện thoại',
                    }
                }
            }
            if(!Email){
                return {
                    code: 400,
                    metadata:{
                        success: false,
                        status: 'Chưa có email',
                    }
                }
            }
            const account = await accountModel.findOne({ Email }).lean();
            if (account) {
                const userUpdate = await accountModel.findOneAndUpdate(
                    { Email },
                    {
                      $set: { XacThuc: true, LoaiTaiKhoan: 1 },
                    },
                );
                MaTaiKhoan = account._id
            }else{
                const passwordHash = await bcrypt.hash(SoDienThoai, 10);
                const newAccount = await accountModel.create({
                    Email,
                    MatKhau: passwordHash,
                    LoaiTaiKhoan: 1,
                    TrangThai: 0,
                    XacThuc: true
                });

                MaTaiKhoan = newAccount._id
            }
            
            const newEmployee = await employeeModel.create({
                TenNhanVien, HinhAnh , SoDienThoai , DiaChi , NgaySinh, GioiTinh ,Email, MaTaiKhoan, IsDelete: false
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
            const data = await employeeModel.findOneAndUpdate({
                _id: id
            },{
                IsDelete: true
            },{
                new: true
            })
            const userUpdate = await accountModel.findOneAndUpdate(
                { _id: data.MaTaiKhoan },
                {
                  $set: { LoaiTaiKhoan: 0 },
                },
            );
            const newCustomer = await customerModel.create({
                TenKhachHang: data.TenNhanVien,
                 HinhAnh: data.HinhAnh , 
                 SoDienThoai: data.SoDienThoai, 
                 DiaChi: data.DiaChi , 
                 NgaySinh: data.NgaySinh, 
                 GioiTinh: data.GioiTinh ,
                 Email : data.Email, 
                 MaTaiKhoan: data.MaTaiKhoan
            })
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
    static getAllEmployee = async () => {
        try {
          const employees = await employeeModel.find({IsDelete : false});
          return {
            code: 200,
            metadata: {
              success: true,
              data: employees,
            },
          };
        } catch (err) {
          return {
            code: 500,
            metadata: {
              success: false,
              message: err.message,
              status: "get all employee error",
            },
          };
        }
      };

    static getEmployeeById = async ({id}) =>{
        try{
            const employee = await employeeModel.findOne({_id: id});
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
   
}

module.exports = EmployeeService