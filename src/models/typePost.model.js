const { model , Schema} = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = 'LoaiBaiViet';
const DOCUMENT_NAME = 'LoaiBaiViet';

const postSchema = new Schema({
    TenLoai:{
        type: String,
    },

},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = model(DOCUMENT_NAME, postSchema);