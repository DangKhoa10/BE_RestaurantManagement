const orderModel = require("../models/order.model");
const orderDetailModel = require("../models/orderDetail.model");
const customerModel = require("../models/customer.model");
const {
  sendMail,
  templateMailSendOrder,
  templateMailChangeStatus,
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
          let subject = `Yêu cầu đặt ${
            LoaiPhieuDat === 0 ? "bàn" : "phòng"
          } thành công`;

          let mail = Email;

          let html = templateMailSendOrder(LoaiPhieuDat);

          let check = sendMail(mail, subject, html);

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
        })
        .populate("ListBan")
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
      
      if(TrangThai==1){
          // let subject = `Đơn đặt ${updateOrder.LoaiPhieuDat == 0? "bàn" :"phòng"} thành công`;
          
          // let mail = updateOrder.Email
           
          // let html = templateMailSendOrder(LoaiPhieuDat)

          // let check = sendMail(mail,subject,html)
      }
      if (TrangThai == 2) {
      }
      if (TrangThai == 3) {
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
