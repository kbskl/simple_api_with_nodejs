const createError = require('http-errors')

const adminAuth = async (req, res, next) => {
    if (!req.user.isAdmin) {
        next(createError(403, 'Unauthorized Access'))
    }
    else {
        next()
    }
}

module.exports = adminAuth