const model = require('../models/typeOfRoom.model')

class TypeOfRoomService{

    static addTypeOfRoom = async ({MaLoai,TenLoai,DonGia , DonViTinh})=>{
        try{
            const newTypeOfRoom = await model.create({
                MaLoai,TenLoai,DonGia , DonViTinh
            })
            if(newTypeOfRoom){
                return {
                    code: 201,
                    metadata:{
                        success: true,
                        data: newTypeOfRoom,
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
                    status: 'add type room error',
                }
            }
        }
    }

    static updateTypeOfRoom = async ({id,MaLoai,TenLoai,DonGia , DonViTinh})=>{
        try{
            const updateTypeOfRoom = await model.findOneAndUpdate({
                _id: id
            },{
                MaLoai,TenLoai,DonGia , DonViTinh
            },{
                new: true
            })
            return {
                code: 200,
                metadata:{
                    success: true,
                    message: 'Update thành công',
                    data: updateTypeOfRoom,
                }
            }
            
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success: false,
                    message: err.message,
                    status: 'update type room error',
                }
            }
        }
    }
    static deleteTypeOfRoom = async ({id})=>{
        try{
            await model.deleteOne({ _id: id })
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
                    status: 'delete table error',
                }
            }
        }
    }

    static getAllTypeOfRoom = async () =>{
        try{
            const typeOfRooms = await model.find();
            return {
                code: 200,
                metadata: {
                    success:true,
                    data: typeOfRooms
                }
            }
        }
        catch(err){
            return {
                code: 500,
                metadata:{
                    success:false,
                    message: err.message,
                    status: 'get all type room error',
                }
                
            }
        }
    }

    static getTypeOfRoomById = async ({MaLoai}) => {
        try {
          const typeOfRoom = await model.findOne({ MaLoai: MaLoai });
          return {
            code: 200,
            metadata: {
              success: true,
              data: typeOfRoom,
            },
          };
        } catch (err) {
          return {
            code: 500,
            metadata: {
              success: false,
              message: err.message,
              status: "get typeOfRoom error",
            },
          };
        }
      };
}

module.exports = TypeOfRoomService;