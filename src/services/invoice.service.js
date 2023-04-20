const invoiceModel = require("../models/invoice.model")


class InvoiceService {



    static addInvoice = async ({MaPhieuDat,MaNhanVien , MaKhachHang , HoTen , SoDienThoai, 
        LoaiHoaDon , TrangThai,ThoiGianBatDau, ListThucDon,ListPhong,ListBan})=>{
        try{
            const invoiceNew = await invoiceModel.create({MaPhieuDat,MaNhanVien , MaKhachHang , HoTen 
            , SoDienThoai, LoaiHoaDon , TrangThai,ThoiGianBatDau, ListThucDon,ListPhong,ListBan})
            if(invoiceNew){
                return {
                    code: 201,
                    metadata:{
                        success: true,
                        data: invoiceNew,
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
                    status: 'add invoice error',
                }
            }
        }
    }
    static updateInvoice = async ({id,MaPhieuDat,MaNhanVien , MaKhachHang , HoTen , SoDienThoai, 
        LoaiHoaDon , TrangThai,ThoiGianBatDau, ListThucDon,ListPhong,ListBan}) => {
        try {
          const updateInvoive = await invoiceModel.findOneAndUpdate(
            {
              _id: id,
            },
            {
                MaPhieuDat,MaNhanVien , MaKhachHang , HoTen , SoDienThoai, 
                LoaiHoaDon , TrangThai,ThoiGianBatDau, ListThucDon,ListPhong,ListBan
            },
            {
              new: true,
            }
          );
        
    
          return {
            code: 200,
            metadata: {
              success: true,
              data: updateInvoive,
            },
          };
        } catch (err) {
          return {
            code: 500,
            metadata: {
              success: false,
              message: err.message,
              status: "update invoice error",
            },
          };
        }
    };
    static getInvoiceById = async ({ id }) => {
        try {
          const invoice = await invoiceModel.findOne({ _id: id })
          return {
            code: 200,
            metadata: {
              success: true,
              data: invoice,
            },
          };
        } catch (err) {
          return {
            code: 500,
            metadata: {
              success: false,
              message: err.message,
              status: "get invoice by id error",
            },
          };
        }
      };
    static getInvoiceByAll = async ({MaPhieuDat,MaNhanVien , MaKhachHang , HoTen , SoDienThoai, 
        LoaiHoaDon , TrangThai,ThoiGianBatDau}) => {
        try {
            let query = {}
            if(MaPhieuDat){
              query.MaPhieuDat = MaPhieuDat
            }
            if (ThoiGianBatDau) {
                const date = new Date(ThoiGianBatDau);
                const start = new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate()
                );
                const end = new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate() + 1
                );
        
                query.ThoiGianBatDau = { $gte: start, $lt: end };
              }
            if(HoTen){
              query.HoTen = { $regex: HoTen , $options: 'i'}
            }
            if(SoDienThoai){
                query.SoDienThoai = SoDienThoai
            }
            if(MaKhachHang){
                query.MaKhachHang = MaKhachHang
            }
            if(MaNhanVien){
                query.MaNhanVien = MaNhanVien
            }
            if(TrangThai ==0 || TrangThai){
                query.TrangThai = TrangThai
            }
            if(LoaiHoaDon ==0 || LoaiHoaDon){
                query.LoaiHoaDon = LoaiHoaDon
            }
            
            
            const invoices = await invoiceModel.find(query)
                
            return {
                code: 200,
                metadata: {
                success: true,
                data: invoices,
                },
            };
        } catch (err) {
          return {
            code: 500,
            metadata: {
              success: false,
              message: err.message,
              status: "get invoices error",
            },
          };
        }
    };

    

}

module.exports = InvoiceService