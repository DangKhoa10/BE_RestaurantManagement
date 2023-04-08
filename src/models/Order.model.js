const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'PhieuDat';
const DOCUMENT_NAME = 'PhieuDat';

const orderSchema = new Schema({
    /**
     * 0 phiếu đặt bàn
     * 1 phiếu đặt phòng thường
     * 2 phòng vip
     */
    LoaiPhieuDat:{
        type: Number,
        required: true,
    },
    /**
     * 0 chờ xác nhận
     * 1 chờ đặt cọc
     * 2 chờ nhận đơn
     * 3 kết thúc
     * 4 Đã hủy
     */
    TrangThai:{
        type: Number,
        required: true,
    },
    SoLuongNguoiTrenBanOrPhong:{
        type: Number,
        required: true,
    },
    SoLuongBanOrPhong:{
        type: Number,
        required: true,
    },
    ThoiGianBatDau: {
        type: Date,
    },
    GhiChu: {
        type: String,
    },
    HoTen: {
        type: String,
    },
    Email: {
        type: String,
    },
    SoDienThoai: {
        type: String,
    },
    MaNhanVien:{
        type: Schema.Types.ObjectId,
        ref:'NhanVien'
    },
    MaKhachHang:{
        type: Schema.Types.ObjectId,
        ref:'KhachHang'
    },

},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, orderSchema);