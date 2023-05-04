const { Query } = require("mongoose");
const postModel = require("../models/post.model");
const typePostModel = require("../models/typePost.model");

class PostService {
    static addPost = async ({
        TieuDe,
        NoiDung,
        AnhNen,
        MaNhanVien,
        MaLoai,
        NoiBat,
        ThuTuBaiViet,
        HienThi
    }) => {
        try {
            const post = await postModel.create({
                TieuDe,
                NoiDung,
                AnhNen,
                MaNhanVien,
                MaLoai,
                NoiBat,
                ThuTuBaiViet,HienThi
            });
            if (post) {
                return {
                    code: 201,
                    metadata: {
                        success: true,
                        data: post,
                    },
                };
            }
        } catch (err) {
            return {
                code: 500,
                metadata: {
                    success: false,
                    message: err.message,
                    status: "add post error",
                },
            };
        }
    };

    static updatePost = async ({
        id,
        TieuDe,
        NoiDung,
        AnhNen,
        HienThi,
        MaLoai,
        NoiBat,
        ThuTuBaiViet
    }) => {
        try {
            const updatePost = await postModel.findOneAndUpdate({
                _id: id
            }, {
                TieuDe,
                NoiDung,
                AnhNen,
                MaLoai,
                NoiBat,
                ThuTuBaiViet,
                HienThi
            }, {
                new: true
            })
            return {
                code: 200,
                metadata: {
                    success: true,
                    message: 'Update thành công',
                    data: updatePost,
                }
            }

        } catch (err) {
            return {
                code: 500,
                metadata: {
                    success: false,
                    message: err.message,
                    status: ' updatePost error',
                }
            }
        }
    }

    static deletePost = async ({
        id
    }) => {
        try {
            await postModel.deleteOne({
                _id: id
            })
            return {
                code: 200,
                metadata: {
                    success: true,
                    message: "Xóa thành công",
                }
            }

        } catch (err) {
            return {
                code: 500,
                metadata: {
                    success: false,
                    message: err.message,
                    status: 'delete post error',
                }
            }
        }
    }

    static getAllPost = async ({HienThi}) => {
        try {
            const query = {}
            if(HienThi === true || HienThi === false) {
                query.HienThi = HienThi
            }
            const posts = await postModel.find(query).populate('MaLoai').populate('MaNhanVien').sort({
                ThuTuBaiViet: 1
            }).exec()

            return {
                code: 200,
                metadata: {
                    success: true,
                    data: posts,
                },
            };
        } catch (err) {
            return {
                code: 500,
                metadata: {
                    success: false,
                    message: err.message,
                    status: "get all post error",
                },
            };
        }
    };
    static getPostById = async ({
        id
    }) => {
        try {
            const post = await postModel.findOne({
                _id: id
            }).populate('MaLoai').populate('MaNhanVien')
            return {
                code: 200,
                metadata: {
                    success: true,
                    data: post,
                },
            };
        } catch (err) {
            return {
                code: 500,
                metadata: {
                    success: false,
                    message: err.message,
                    status: "get post error",
                },
            };
        }
    };
    static getPostByTypeId = async ({
        MaLoai,HienThi
    }) => {
        try {
            const query = {MaLoai}
            if(HienThi === true || HienThi === false) {
                query.HienThi = HienThi
            }
            const posts = await postModel.find(query);
            return {
                code: 200,
                metadata: {
                    success: true,
                    data: posts,
                },
            };
        } catch (err) {
            return {
                code: 500,
                metadata: {
                    success: false,
                    message: err.message,
                    status: "get post error",
                },
            };
        }
    };
    static getPostByTypeId = async ({
        MaLoai,HienThi
    }) => {
        try {
            const query = {MaLoai}
            if(HienThi === true || HienThi === false) {
                query.HienThi = HienThi
            }
            const posts = await postModel.find(query)
            return {
                code: 200,
                metadata: {
                    success: true,
                    data: posts,
                },
            };
        } catch (err) {
            return {
                code: 500,
                metadata: {
                    success: false,
                    message: err.message,
                    status: "get post error",
                },
            };
        }
    };
static getPostByAll = async ({
        MaLoai,HienThi,NoiBat
    }) => {
        try {
            const query = {}
            if(HienThi === true || HienThi === false) {
                query.HienThi = HienThi
            }
            if(MaLoai){
                query.MaLoai = MaLoai
            }
            if(NoiBat === true || NoiBat === false){ 
                query.NoiBat = NoiBat
            }
            const posts = await postModel.find(query).populate('MaLoai').populate('MaNhanVien').sort({
                ThuTuBaiViet: 1
            }).exec()
            return {
                code: 200,
                metadata: {
                    success: true,
                    data: posts,
                },
            };
        } catch (err) {
            return {
                code: 500,
                metadata: {
                    success: false,
                    message: err.message,
                    status: "get post error",
                },
            };
        }
    };


    static addTypePost = async ({
        TenLoai
    }) => {
        try {
            const post = await typePostModel.create({
                TenLoai
            });
            if (post) {
                return {
                    code: 201,
                    metadata: {
                        success: true,
                        data: post,
                    },
                };
            }
        } catch (err) {
            return {
                code: 500,
                metadata: {
                    success: false,
                    message: err.message,
                    status: "add post error",
                },
            };
        }
    };
    static updateTypePost = async ({
        id,
        TenLoai
    }) => {
        try {
            const updatePost = await typePostModel.findOneAndUpdate({
                _id: id
            }, {
                TenLoai
            }, {
                new: true
            })
            return {
                code: 200,
                metadata: {
                    success: true,
                    message: 'Update thành công',
                    data: updatePost,
                }
            }

        } catch (err) {
            return {
                code: 500,
                metadata: {
                    success: false,
                    message: err.message,
                    status: ' updatePost error',
                }
            }
        }
    }

    static deleteTypePost = async ({
        id
    }) => {
        try {
            await typePostModel.deleteOne({
                _id: id
            })
            return {
                code: 200,
                metadata: {
                    success: true,
                    message: "Xóa thành công",
                }
            }

        } catch (err) {
            return {
                code: 500,
                metadata: {
                    success: false,
                    message: err.message,
                    status: 'delete post error',
                }
            }
        }
    }

    static getAllTypePost = async () => {
        try {
            const posts = await typePostModel.find().exec();

            return {
                code: 200,
                metadata: {
                    success: true,
                    data: posts,
                },
            };
        } catch (err) {
            return {
                code: 500,
                metadata: {
                    success: false,
                    message: err.message,
                    status: "get all post error",
                },
            };
        }
    };
    static getTypePostById = async ({
        id
    }) => {
        try {
            const post = await typePostModel.findOne({
                _id: id
            });
            return {
                code: 200,
                metadata: {
                    success: true,
                    data: post,
                },
            };
        } catch (err) {
            return {
                code: 500,
                metadata: {
                    success: false,
                    message: err.message,
                    status: "get post error",
                },
            };
        }
    };
   
}


module.exports = PostService;