const { getData, getDataById } = require("../controller/categoryController");
const app = require("express");
const router = app.Router();

router.get("/", getData);
router.get("/:id", getDataById);

module.exports = router;
