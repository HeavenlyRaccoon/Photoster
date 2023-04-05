const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const messageRouter = require("./messageRouter");
const followersRouter = require("./followersRouter");
const postRouter = require("./postRouter");
const photoRouter = require("./photoRouter");
const commentRouter = require("./commentRouter");
const postLikeRouter = require("./postLikeRouter");
const commentLikeRouter = require("./commentLikeRouter");

router.use("/user", userRouter);
router.use("/followers", followersRouter);
router.use("/message", messageRouter);
router.use("/post", postRouter);
router.use("/photo", photoRouter);
router.use("/comment", commentRouter);
router.use("/postlike", postLikeRouter);
router.use("/commentlike", commentLikeRouter);

module.exports = router;
