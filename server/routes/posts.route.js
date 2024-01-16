const { getPostsDetails ,createNewPost ,getPostsByUserId ,removePostDetails ,getPostDetailssByParamId} = require("../controller/post.controller");
const router = require("express").Router();
var jwt = require("jsonwebtoken")

router.get("/", getPostsDetails);
router.post("/newpost", createNewPost);
router.post("/getPostDetailssByParamId", getPostDetailssByParamId);
router.post("/getPostsByUserId", getPostsByUserId);
router.post("/removePostDetails", removePostDetails);

module.exports = router;