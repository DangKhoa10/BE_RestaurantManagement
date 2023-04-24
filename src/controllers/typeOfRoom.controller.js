const TypeOfRoomService = require("../services/typeOfRoom.service");

class TypeOfRoomController{

    addTypeOfRoom = async (req, res, next) => {
        try {
            const result = await TypeOfRoomService.addTypeOfRoom(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    } 

    updateTypeOfRoom = async (req, res, next) => {
        try {
            const result = await TypeOfRoomService.updateTypeOfRoom(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }
    deleteTypeOfRoom = async (req, res, next) => {
        try {
            const result = await TypeOfRoomService.deleteTypeOfRoom(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }
    getTypeOfRoomById = async (req, res, next) => {
        try {
            const result = await TypeOfRoomService.getTypeOfRoomById(req.body);
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    }

    getAllTypeOfRoom = async (req, res, next) => {
        try {
            const result = await TypeOfRoomService.getAllTypeOfRoom();
            return res.status(result.code).json(result.metadata)
        }
        catch (err){
            next(err);
        }
    } 
}

module.exports = new TypeOfRoomController()