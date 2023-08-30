const app = require("express");
const router = app.Router();
const { Protect } = require("./../middleware/protect");
const upload = require("../middleware/uploadFile")
const {
  getData,
  getDataById,
  getDataSearch,
  deleteDataById,
  postData,
  putData,
  //TODO: KHUSUS MOBILE
  getDataByUserId
} = require("../controller/recipeController");


router.get("/", getData);
router.get("/detail", getDataSearch);
router.get("/:id", getDataById);
router.post("/", Protect, upload.single('recipe_image'), postData);
router.put("/:id", Protect, upload.single('recipe_image'), putData);
router.delete("/:id", Protect, deleteDataById);
//TODO: KHUSUS MOBILE
router.get("/mobile/:id", getDataByUserId);


module.exports = router;
