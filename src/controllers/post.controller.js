const PostService = require("../services/post.service");

class PostController {
    addPost = async (req, res, next) => {
        try {
            const result = await PostService.addPost(req.body);
            return res.status(result.code).json(result.metadata);
        } catch (err) {
            next(err);
        }
    };
    updatePost = async (req, res, next) => {
        try {
            const result = await PostService.updatePost(req.body);
            return res.status(result.code).json(result.metadata);
        } catch (err) {
            next(err);
        }
    };

    deletePost = async (req, res, next) => {
        try {
            const result = await PostService.deletePost(req.body);
            return res.status(result.code).json(result.metadata);
        } catch (err) {
            next(err);
        }
    };


    getAllPost = async (req, res, next) => {
        try {
            const result = await PostService.getAllPost(req.body);
            return res.status(result.code).json(result.metadata);
        } catch (err) {
            next(err);
        }
    };

    getPostById = async (req, res, next) => {
        try {
            const result = await PostService.getPostById(req.body);
            return res.status(result.code).json(result.metadata);
        } catch (err) {
            next(err);
        }
    };
    getPostByTypeId = async (req, res, next) => {
        try {
            const result = await PostService.getPostByTypeId(req.body);
            return res.status(result.code).json(result.metadata);
        } catch (err) {
            next(err);
        }
    };

    addTypePost = async (req, res, next) => {
        try {
            const result = await PostService.addTypePost(req.body);
            return res.status(result.code).json(result.metadata);
        } catch (err) {
            next(err);
        }
    };
    updateTypePost = async (req, res, next) => {
        try {
            const result = await PostService.updateTypePost(req.body);
            return res.status(result.code).json(result.metadata);
        } catch (err) {
            next(err);
        }
    };

    deleteTypePost = async (req, res, next) => {
        try {
            const result = await PostService.deleteTypePost(req.body);
            return res.status(result.code).json(result.metadata);
        } catch (err) {
            next(err);
        }
    };


    getAllTypePost = async (req, res, next) => {
        try {
            const result = await PostService.getAllTypePost(req.body);
            return res.status(result.code).json(result.metadata);
        } catch (err) {
            next(err);
        }
    };

    getTypePostById = async (req, res, next) => {
        try {
            const result = await PostService.getTypePostById(req.body);
            return res.status(result.code).json(result.metadata);
        } catch (err) {
            next(err);
        }
    };

}

module.exports = new PostController();