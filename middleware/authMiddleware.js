const User = require('../models/userModel')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        if (req.header('Authorization')) {
            const token = req.header('Authorization').replace('Bearer ', '')
            const result = jwt.verify(token, process.env.LOGIN_JWT_TOKEN)
            const findedUser = await User.findOne({ _id: result._id })
            if (findedUser) {
                req.user = findedUser
                next()
            } else {
                next(createError(400, "Invalid user"))
            }
        } else {
            next(createError(400, "Please sign in"))
        }
    } catch (error) {
        next(createError(400, "Please sign in"))
    }
}

module.exports = auth