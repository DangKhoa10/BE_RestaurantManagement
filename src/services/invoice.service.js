const invoiceModel = require("../models/invoice.model")
const menuModel = require("../models/menu.model")
const customerModel = require("../models/customer.model")


class InvoiceService {

  static addInvoice = async ({
    MaPhieuDat,
    MaNhanVien,
    MaKhachHang,
    HoTen,
    SoDienThoai,
    LoaiHoaDon,
    TrangThai,
    ThoiGianBatDau,
    ListThucDon,
    ListPhong,
    ListBan
  }) => {
    try {
      let MaKH;
      if (MaKhachHang) {
        MaKH = MaKhachHang;
      } else {
        if(HoTen && SoDienThoai){
          const newCustomer = await customerModel.create({
            TenKhachHang: HoTen,
            SoDienThoai,
          });
          MaKH = newCustomer._id;
        }
        else{
          MaKH = null;
        }

      }
      const invoiceNew = await invoiceModel.create({
        MaPhieuDat,
        MaNhanVien,
        MaKhachHang: MaKH,
        HoTen,
        SoDienThoai,
        LoaiHoaDon,
        TrangThai,
        ThoiGianBatDau,
        ListThucDon,
        ListPhong,
        ListBan
      })
      if (invoiceNew) {
        return {
          code: 201,
          metadata: {
            success: true,
            data: invoiceNew,
          }
        }
      }
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: 'add invoice error',
        }
      }
    }
  }
  static updateInvoice = async ({
    id,
    MaPhieuDat,
    MaNhanVien,
    MaKhachHang,
    HoTen,
    SoDienThoai,
    LoaiHoaDon,
    TrangThai,
    ThoiGianBatDau,
    ListThucDon,
    ListPhong,
    ListBan
  }) => {
    try {
      const updateInvoive = await invoiceModel.findOneAndUpdate({
        _id: id,
      }, {
        MaPhieuDat,
        MaNhanVien,
        MaKhachHang,
        HoTen,
        SoDienThoai,
        LoaiHoaDon,
        TrangThai,
        ThoiGianBatDau,
        ListThucDon,
        ListPhong,
        ListBan
      }, {
        new: true,
      });


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
  static getInvoiceById = async ({
    id
  }) => {
    try {
      const invoice = await invoiceModel.findOne({
          _id: id
        })
        .populate("MaPhieuDat")
        .populate("ListThucDon.MaThucDon")
        .populate({
          path: "ListPhong",
          populate: {
            path: "MaLoai",
          },
          populate:{
            path: "MaKhuVuc",
            select: 'TenKhuVuc',
          }
        })
        .populate({
          path: "ListBan",
          populate: {
            path: "MaPhong",
            select: 'TenPhong',
            populate:{
              path: "MaKhuVuc",
              select: 'TenKhuVuc',
            }
          },
        })
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
  static getInvoiceByAll = async ({
    MaPhieuDat,
    MaNhanVien,
    MaKhachHang,
    HoTen,
    SoDienThoai,
    LoaiHoaDon,
    TrangThai,
    ThoiGianBatDau
  }) => {
    try {
      let query = {}
      if (MaPhieuDat) {
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

        query.ThoiGianBatDau = {
          $gte: start,
          $lt: end
        };
      }
      if (HoTen) {
        query.HoTen = {
          $regex: HoTen,
          $options: 'i'
        }
      }
      if (SoDienThoai) {
        query.SoDienThoai = SoDienThoai
      }
      if (MaKhachHang) {
        query.MaKhachHang = MaKhachHang
      }
      if (MaNhanVien) {
        query.MaNhanVien = MaNhanVien
      }
      if (TrangThai === 0 || TrangThai) {
        query.TrangThai = TrangThai
      }
      if (LoaiHoaDon === 0 || LoaiHoaDon) {
        query.LoaiHoaDon = LoaiHoaDon
      }


      const invoices = await invoiceModel.find(query)
        .populate("MaNhanVien")
        .populate("ListThucDon.MaThucDon")
        .populate({
          path: "ListPhong",
          populate: {
            path: "MaLoai",
          },
        })
        .populate("ListBan")
        .sort({
          createdAt: -1
        })

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
  static getInvoiceFromDateToDate = async ({
    ThoiGianBatDau,
    ThoiGianKetThuc,
    LoaiHoaDon
  }) => {
    try {
      let query = {}
      const dateS = new Date(ThoiGianBatDau);
      const dateE = new Date(ThoiGianKetThuc);
      if (dateS.getTime() == dateE.getTime()) {
        const start = new Date(
          dateS.getFullYear(),
          dateS.getMonth(),
          dateS.getDate()
        );
        const end = new Date(
          dateS.getFullYear(),
          dateS.getMonth(),
          dateS.getDate() + 1
        );
        query.ThoiGianBatDau = {
          $gte: start,
          $lt: end
        };
      } else {
        query.ThoiGianBatDau = {
          $gte: dateS,
          $lte: dateE
        };
      }

      if (LoaiHoaDon === 0 || LoaiHoaDon === 1 || LoaiHoaDon === 2) {
        query.LoaiHoaDon = LoaiHoaDon
      }
      query.TrangThai == 1


      const invoices = await invoiceModel.find(query)
        .populate("MaNhanVien")
        .populate("ListThucDon.MaThucDon")
        .populate({
          path: "ListPhong",
          populate: {
            path: "MaLoai",
          },
        })
        .populate("ListBan")
        .sort({
          createdAt: -1
        })

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

  static getQuantityMenuFromDateToDate = async ({
    ThoiGianBatDau,
    ThoiGianKetThuc
  }) => {
    try {
      let query = {}
      const dateS = new Date(ThoiGianBatDau);
      const dateE = new Date(ThoiGianKetThuc);
      if (dateS.getTime() == dateE.getTime()) {
        const start = new Date(
          dateS.getFullYear(),
          dateS.getMonth(),
          dateS.getDate()
        );
        const end = new Date(
          dateS.getFullYear(),
          dateS.getMonth(),
          dateS.getDate() + 1
        );
        query = {
          $gte: start,
          $lt: end
        };
      } else {
        query = {
          $gte: dateS,
          $lte: dateE
        };
      }
      let menus = await invoiceModel.aggregate([{
          $match:{
            "ThoiGianBatDau": query,
            "TrangThai": 1
          }
        },
        {
          $unwind: '$ListThucDon'
        },
        {
          $group: {
            _id: '$ListThucDon.MaThucDon',
            SoLuongBan: {
              $sum: '$ListThucDon.SoLuong'
            },
          },
        },
        {
          $lookup: {
            from: 'ThucDon',
            localField: '_id',
            foreignField: '_id',
            as: 'thucDon',
          },
        },
        {
          $project: {
            _id: 1,
            SoLuongBan: 1,
            TenMon: "$thucDon.TenMon",
          },
        },
      ]).exec();

      let allMenus = await menuModel.find().lean().exec();
      let results = []
      for(let i = 0; i < allMenus.length; i++){
        let index = menus.findIndex(item => item._id.toString() === allMenus[i]._id.toString());
        let obj = {
          ...allMenus[i],
          SoLuongBan: (index !== -1) ? menus[index].SoLuongBan : 0
        }
        results.push(obj);
      }

      return {
        code: 200,
        metadata: {
          success: true,
          data: results,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "get menu error",
        },
      };
    }
  }



}

module.exports = InvoiceService