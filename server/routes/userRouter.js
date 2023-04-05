const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/auth", authMiddleware, userController.checkAuth);
router.put("/edit", userController.edit);

module.exports = router;
