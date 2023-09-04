const {
  getData,
  deleteDataById,
  getDataById
} = require("../controller/usersController");
const app = require("express");
const router = app.Router();

router.get("/", getData);
router.get("/:id", getDataById);
router.delete("/:id", deleteDataById);

module.exports = router;
