const { getData, postData, putData,deleteDataById,/*getDataById,   */ } = require('../controller/usersController');
const app = require("express");
const router = app.Router();

router.get('/', getData);
router.post('/', postData);
router.put('/:id', putData);
// router.get('/:id', getDataById);
router.delete('/:id', deleteDataById);

module.exports = router;