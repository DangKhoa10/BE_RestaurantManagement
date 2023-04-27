const express = require("express");
const postController = require("../../controllers/post.controller");
const router = express.Router();

router.post("/addPost", postController.addPost);
router.post("/addTypePost", postController.addTypePost);
router.post("/updateTypePost", postController.updateTypePost);
router.post("/updatePost", postController.updatePost);
router.post("/deletePost", postController.deletePost);
router.post("/deleteTypePost", postController.deleteTypePost);
router.post("/getAllPost", postController.getAllPost);
router.post("/getAllTypePost", postController.getAllTypePost);
router.post("/getPostById", postController.getPostById);
router.post("/getTypePostById", postController.getTypePostById);
router.post("/getPostByTypeId", postController.getPostByTypeId);

module.exports = router;
