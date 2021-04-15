const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 25,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100
        },
        firstName: {
            type: String,
            required: false,
            trim: true,
            minlength: 2,
            maxlength: 25
        },
        lastName: {
            type: String,
            required: false,
            trim: true,
            minlength: 2,
            maxlength: 25
        },
        isAdmin: {
            type: Boolean,
            required: false,
        }
    },
    {
        collection: 'users',
        timestamps: true
    }
)

const joiSchema = Joi.object(
    {
        firstName: Joi.string().min(2).max(25).trim(),
        lastName: Joi.string().min(2).max(25).trim(),
        username: Joi.string().min(2).max(25).trim().lowercase(),
        password: Joi.string().min(2).trim(),
        isAdmin: Joi.boolean()
    }
)

UserSchema.statics.joiValidationForCreateUser = function (userObject) {
    joiSchema.required()
    return joiSchema.validate(userObject)
}

UserSchema.statics.joiValidationForUpdateUser = function (userObject) {
    return joiSchema.validate(userObject)
}

UserSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user._id
    delete user.createdAt
    delete user.updatedAt
    delete user.__v
    delete user.password
    return user
}


UserSchema.statics.createUser = async function (userObject) {
    userObject.password = await bcrypt.hash(userObject.password, 10)
    const existsUsername = await User.findOne({ username: userObject.username })
    if (existsUsername) {
        return createError(400, 'username already exists')
    } else {
        userObject.isAdmin = false
        return User.create(userObject)
    }
}

UserSchema.statics.login = async function (username, password) {
    const { error, value } = joiSchema.validate({ username, password })
    if (error) {
        throw createError(400, error)
    }
    const user = await User.findOne({ username })
    if (!user) {
        throw createError(400, 'Wrong email address')
    }
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
        throw createError(400, 'Wrong password')
    }
    return user
}

UserSchema.methods.generateToken = async function () {
    const signedInUser = this
    const token = await jwt.sign({ _id: signedInUser._id }, process.env.LOGIN_JWT_TOKEN, { expiresIn: '1h' })
    return token
}

UserSchema.statics.updateUser = async function (id, reqBody) {
    delete reqBody.updateAt
    delete reqBody.createdAt
    if (reqBody.hasOwnProperty('password')) {
        reqBody.password = await bcrypt.hash(reqBody.password, 10)
    }
    return await User.findByIdAndUpdate({ _id: id }, reqBody, { new: true, runValidators: true })
}

const User = mongoose.model('User', UserSchema)
module.exports = User