const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'BaiViet';
const DOCUMENT_NAME = 'BaiViet';

const postSchema = new Schema({
    TieuDe:{
        type: String,
    },
    NoiDung:{
        type: String,
    },
    AnhNen:{
        type: String,
    },
    NoiBat:{
        type: Boolean,
    },
    ThuTuBaiViet:{
        type: Number,
    },
    MaNhanVien:{
        type: Schema.Types.ObjectId,
        ref:'NhanVien'
    },
    MaLoai:{
        type: Schema.Types.ObjectId,
        ref:'LoaiBaiViet'
    }
},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, postSchema);