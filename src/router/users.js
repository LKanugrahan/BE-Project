const {
  getData,
  putData,
  deleteDataById,
  getDataById
} = require("../controller/usersController");
const app = require("express");
const { Protect } = require("../middleware/protect");
const upload = require("../middleware/uploadFile");
const router = app.Router();

router.get("/", getData);
router.get("/:id",Protect, getDataById);
router.put("/:id", Protect, upload.single('photo'), putData);
router.delete("/:id", deleteDataById);

module.exports = router;
