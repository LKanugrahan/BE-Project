const { login, register, putData } = require("../controller/authController");
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadFile");
const { Protect } = require("../middleware/protect");



router.post("/login", login);
router.post("/register", register);
router.put("/:id", Protect, upload.single("photo"), putData);

module.exports = router;
