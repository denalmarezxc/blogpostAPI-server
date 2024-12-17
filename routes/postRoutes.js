const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { verify, verifyAdmin } = require("../auth.js");

router.post("/add-post", verify, postController.addPost);

router.get("/get-posts", verify, postController.getPosts);

router.get("/get-Myposts", verify, postController.getMyPosts);

router.get("/view-post/:postId", verify, postController.viewPost);

router.patch("/edit-post/:postId", verify, postController.editPost);

router.delete("/delete-post/:postId", verify, postController.deletePost);



module.exports = router;