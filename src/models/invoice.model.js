const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'HoaDon';
const DOCUMENT_NAME = 'HoaDon';

const invoiceSchema = new Schema({
    MaPhieuDat:{
        type: Schema.Types.ObjectId,
        ref:'PhieuDat'
    },
    MaNhanVien:{
        type: Schema.Types.ObjectId,
        ref:'NhanVien'
    },
    MaKhachHang:{
        type: Schema.Types.ObjectId,
        ref:'KhachHang'
    },
    HoTen: {
        type: String,
    },
    SoDienThoai: {
        type: String,
    },
    /**
     * 0 hóa đơn bàn
     * 1 hóa đơn phòng thường
     * 2 hóa đơn phòng vip
     */
    LoaiHoaDon:{
        type: Number,
        required: true,
    },
    /**
     * 0 Chờ thanh toán
     * 1 Đã thanh toán
     * 2 Chưa thanh toán
     */
    TrangThai:{
        type: Number
    },
    ThoiGianBatDau: {
        type: Date,
    },
    ListThucDon:[{
        _id: false,
        MaThucDon: {
          type: Schema.Types.ObjectId,
          ref:'ThucDon'
        },
        SoLuong:{
            type: Number,
        },
      }],
    ListPhong:[
        {
            type: Schema.Types.ObjectId,
            ref:'Phong'
        }
    ]
    ,
    ListBan:[
         {
            type: Schema.Types.ObjectId,
            ref:'Ban'
        },
    ]
    ,

},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, invoiceSchema);