const orderModel = require("../models/order.model");
const orderDetailModel = require("../models/orderDetail.model");
const customerModel = require("../models/customer.model");
const {
  sendMail,
  templateMailSendOrder,
  templateMailConfirmOrder,
  templateMailConfirmDepositOrder,
  templateMailCancelOrder
} = require("../utils");

class OrderService {
  static addOrder = async ({
    LoaiPhieuDat,
    TrangThai,
    SoLuongNguoiTrenBanOrPhong,
    SoLuongBanOrPhong,
    ThoiGianBatDau,
    MaKhachHang,
    MaNhanVien,
    ListThucDon,
    ListPhong,
    ListBan,
    HoTen,
    Email,
    SoDienThoai,
    GhiChu,
  }) => {
    try {
      let MaKH;
      if (MaKhachHang) {
        MaKH = MaKhachHang;
      } else {
        const newCustomer = await customerModel.create({
          Email,
          TenKhachHang: HoTen,
          SoDienThoai,
        });
        MaKH = newCustomer._id;
      }

      const newOrder = await orderModel.create({
        LoaiPhieuDat,
        TrangThai,
        SoLuongNguoiTrenBanOrPhong,
        SoLuongBanOrPhong,
        ThoiGianBatDau,
        MaKhachHang: MaKH,
        MaNhanVien: MaNhanVien,
        HoTen,
        Email,
        SoDienThoai,
        GhiChu,
      });
      if (newOrder) {
        const newOrderDetail = await orderDetailModel.create({
          MaPhieuDat: newOrder._id,
          ListThucDon,
          ListPhong,
          ListBan,
        });

        if (newOrderDetail) {
          if(Email){
            let subject = `Yêu cầu đặt ${
              LoaiPhieuDat === 0 ? "bàn" : LoaiPhieuDat ===  1 ? "phòng" : "phòng vip"
            } thành công`;
  
            let mail = Email;
  
            let html = templateMailSendOrder(LoaiPhieuDat , HoTen);
  
            let check = sendMail(mail, subject, html);
          }
          
          return {
            code: 201,
            metadata: {
              success: true,
              data: {
                Order: newOrder,
                OrderDetail: newOrderDetail,
              },
            },
          };
        }

        return {
          code: 500,
          metadata: {
            success: false,
            data: null,
          },
        };
      }

      return {
        code: 500,
        metadata: {
          success: false,
          data: null,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "add order error",
        },
      };
    }
  };

  static getOrderByUser = async ({ MaKhachHang }) => {
    try {
      const orders = await orderModel.find({ MaKhachHang });
      return {
        code: 200,
        metadata: {
          success: true,
          data: orders,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "get order by user error",
        },
      };
    }
  };
  static getOrderDetailByOrder = async ({ MaPhieuDat }) => {
    try {
      const orderDetail = await orderDetailModel
        .find({ MaPhieuDat })
        .populate({
          path: "MaPhieuDat",
          populate: {
            path: "MaKhachHang",
          },
        })
        .populate({
          path: "MaPhieuDat",
          populate: {
            path: "MaNhanVien",
          },
        })
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
        }
        )
        .exec();
      return {
        code: 200,
        metadata: {
          success: true,
          data: orderDetail,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "get order detail by order error",
        },
      };
    }
  };

  static getAllOrder = async () => {
    try {
      const orders = await orderModel.find().populate("MaKhachHang").populate("MaNhanVien");
      return {
        code: 200,
        metadata: {
          success: true,
          data: orders,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "get all order error",
        },
      };
    }
  };

  static getOrderById = async ({ id }) => {
    try {
      const order = await orderModel
        .findOne({ _id: id })
        .populate("MaKhachHang");
      return {
        code: 200,
        metadata: {
          success: true,
          data: order,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "get order by id error",
        },
      };
    }
  };

  static updateOrder = async ({
    id,
    LoaiPhieuDat,
    TrangThai,
    SoLuongNguoiTrenBanOrPhong,
    SoLuongBanOrPhong,
    ThoiGianBatDau,
    MaKhachHang,
    ListThucDon,
    ListPhong,
    ListBan,
    HoTen,
    Email,
    SoDienThoai,
    GhiChu,
  }) => {
    try {
      const updateOrder = await orderModel.findOneAndUpdate(
        {
          _id: id,
        },
        {
          LoaiPhieuDat,
          TrangThai,
          SoLuongNguoiTrenBanOrPhong,
          SoLuongBanOrPhong,
          ThoiGianBatDau,
          MaKhachHang,
          HoTen,
          Email,
          SoDienThoai,
          GhiChu,
        },
        {
          new: true,
        }
      );
      if (updateOrder) {
        const updateOrderDetail = await orderDetailModel.findOneAndUpdate(
          {
            MaPhieuDat: updateOrder._id,
          },
          {
            ListThucDon,
            ListPhong,
            ListBan,
          },
          {
            new: true,
          }
        );

        if (updateOrderDetail) {


          if(TrangThai === 1){

            const orderDetail = await orderDetailModel
            .find({ MaPhieuDat:  updateOrder._id})
            .populate("ListThucDon.MaThucDon")
            .lean();
            let total = orderDetail[0].ListThucDon.reduce((total, menu) => total + menu?.MaThucDon?.GiaMon * menu?.SoLuong, 0)*30/100
            if(total === 0 && updateOrder.LoaiPhieuDat === 0){

            }else{
              if(updateOrder.Email){
                let subject = `Đơn đặt đã được xác nhận`;
                let mail = updateOrder.Email;
                let html = templateMailConfirmOrder({
                  LoaiPhieuDat : updateOrder.LoaiPhieuDat ,
                  HoTen: updateOrder.HoTen,
                  TienMonAn: total,
                  SoPhong: updateOrder.LoaiPhieuDat === 0 ? 0 : updateOrder.SoLuongBanOrPhong ,
                  TienDatPhong: updateOrder.LoaiPhieuDat === 0 ? 0 : updateOrder.LoaiPhieuDat === 1 ? 50000*updateOrder.SoLuongBanOrPhong : 100000*updateOrder.SoLuongBanOrPhong 
                });
                let check = sendMail(mail, subject, html);
              }
              
            }
            
          }

          return {
            code: 200,
            metadata: {
              success: true,
              data: {
                Order: updateOrder,
                OrderDetail: updateOrderDetail,
              },
            },
          };
        }

        return {
          code: 500,
          metadata: {
            success: false,
            data: null,
          },
        };
      }

      return {
        code: 500,
        metadata: {
          success: false,
          data: null,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "update order error",
        },
      };
    }
  };
  static changeStatus = async ({ id, TrangThai }) => {
    try {
      const updateOrder = await orderModel.findOneAndUpdate({
        _id: id
    },{
      TrangThai,
    },{
        new: true
    })
      
    if(updateOrder.Email){
      if (TrangThai == 2) {
        const orderDetail = await orderDetailModel.findOne({ MaPhieuDat: id })
        .populate({
          path: "ListPhong",
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
        .exec()
          let vitri = updateOrder.LoaiPhieuDat === 0 ? orderDetail.ListBan : orderDetail.ListPhong
          let subject = `Đặt ${updateOrder.LoaiPhieuDat === 0 ? "bàn" : "phòng" } thành công`;
          let mail = updateOrder.Email;
          let html = templateMailConfirmDepositOrder({
            LoaiPhieuDat: updateOrder.LoaiPhieuDat ,
             HoTen: updateOrder.HoTen , ThoiGianBatDau: updateOrder.ThoiGianBatDau , MaDonDat: id ,ViTri : vitri
          });
          let check = sendMail(mail, subject, html);
      }
      if (TrangThai == 4) {
          let subject = `Đơn đặt ${updateOrder.LoaiPhieuDat === 0 ? "bàn" : "phòng" } bị hủy`;
          let mail = updateOrder.Email;
          let html = templateMailCancelOrder({
            LoaiPhieuDat: updateOrder.LoaiPhieuDat ,
             HoTen: updateOrder.HoTen
          });
          let check = sendMail(mail, subject, html);
        
      }
    }

      return {
        code: 200,
        metadata: {
          success: true,
          data: {
            Order: updateOrder,
          },
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "update order error",
        },
      };
    }
  };
  static getOrderByAll = async ({
    LoaiPhieuDat,
    TrangThai,
    SoLuongNguoiTrenBanOrPhong,
    SoLuongBanOrPhong,
    ThoiGianBatDau,
    GhiChu,
    HoTen,
    Email,
    SoDienThoai,
    MaNhanVien,
    MaKhachHang,
  }) => {
    try {
      let query = {};
      if (LoaiPhieuDat === 0 || LoaiPhieuDat) {
        query.LoaiPhieuDat = LoaiPhieuDat;
      }
      if (TrangThai === 0 || TrangThai) {
        query.TrangThai = TrangThai;
      }
      if (SoLuongNguoiTrenBanOrPhong) {
        query.SoLuongNguoiTrenBanOrPhong = SoLuongNguoiTrenBanOrPhong;
      }
      if (SoLuongBanOrPhong) {
        query.SoLuongBanOrPhong = SoLuongBanOrPhong;
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
      if (GhiChu) {
        query.GhiChu = { $regex: GhiChu, $options: "i" };
      }
      if (HoTen) {
        query.HoTen = { $regex: HoTen, $options: "i" };
      }
      if (Email) {
        query.Email = { $regex: Email, $options: "i" };
      }
      if (SoDienThoai) {
        query.SoDienThoai = SoDienThoai;
      }
      if (MaNhanVien) {
        query.MaNhanVien = MaNhanVien;
      }
      if (MaKhachHang) {
        query.MaKhachHang = MaKhachHang;
      }
      const orders = await orderModel.find(query)
      .populate("MaKhachHang").populate("MaNhanVien").sort({ createdAt: -1 })
      return {
        code: 200,
        metadata: {
          success: true,
          data: orders,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "get order by status error",
        },
      };
    }
  };
}

module.exports = OrderService;
