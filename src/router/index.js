const app = require("express")
const router = app.Router()

const category = require('./category')
const recipe = require('./recipe')
const users = require('./users')
const auth = require('./auth')

router.use('/recipe', recipe)
router.use('/category', category)
router.use('/users', users)
router.use('/auth', auth)

module.exports = router