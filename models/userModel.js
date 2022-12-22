const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            required: [true, 'A user needs to have a user ID']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [10]
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
        expiresOn: {
            type: Date,
            default: (Date.now() + 30 * 24 * 60 * 60 * 1000),
            select: false
        }
    }
)
const User = mongoose.model('User', userSchema)
module.exports = User