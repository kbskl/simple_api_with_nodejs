const User = require('../models/userModel')
const createError = require('http-errors')
const bcrypt = require('bcrypt')

const listAllUsers = async (req, res, next) => {
    const allUsers = await User.find({})
    res.json(allUsers)
}

const addUser = async (req, res, next) => {
    try {
        const { error, value } = User.joiValidationForCreateUser(req.body)
        if (error) {
            res.json(error.message)
        } else {
            const user = await User.createUser(req.body)
            res.json(user)
        }
    } catch (error) {
        res.json(createError(400, error))
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.login(req.body.username, req.body.password)
        const token = await user.generateToken()
        res.json({ user, token })
    } catch (error) {
        res.json(createError(400, error))
    }
}

const myInformation = async (req, res, next) => {
    try {
        res.json(req.user)
    } catch (error) {
        res.json(createError(400, error))
    }
}

const updateMyInformation = async (req, res, next) => {
    try {

        const { error, value } = User.joiValidationForUpdateUser(req.body)
        if (error) {
            next(createError(400, error))
        } else {
            const updatedUser = await User.updateUser(req.user._id, req.body)
            if (updatedUser) {
                return res.json(updatedUser)
            } else {
                next(createError(404, 'Error. Try again'))
            }
        }
    } catch (error) {
        res.json(createError(400, error))
    }
}

const deleteById = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete({ _id: req.params.id })
        if (deletedUser) {
            return res.json({
                message: 'User deleted'
            })
        } else {
            next(createError(404, 'No User'))
        }
    } catch (error) {
        res.json(createError(400, 'No User'))
    }
}

module.exports = {
    listAllUsers,
    addUser,
    login,
    myInformation,
    updateMyInformation,
    deleteById
}