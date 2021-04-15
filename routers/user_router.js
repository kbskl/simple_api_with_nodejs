const router = require('express').Router()
const userControllers = require('../controllers/user_controller')
const auth = require('../middleware/authMiddleware')
const adminAuth = require('../middleware/adminMiddleware')


router.get('/', userControllers.listAllUsers)
router.post('/', userControllers.addUser)
router.post('/login', userControllers.login)
router.get('/me', auth, userControllers.myInformation)
router.patch('/me', auth, userControllers.updateMyInformation)
router.delete('/:id', [auth, adminAuth], userControllers.deleteById)

module.exports = router