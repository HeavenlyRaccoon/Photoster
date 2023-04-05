const Router = require("express");
const photoController = require("../controllers/photoController");
const router = new Router();

router.post("/", photoController.create);
router.get("/", photoController.getAll);
router.get("/:id", photoController.getOne);

module.exports = router;
