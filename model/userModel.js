const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: String,
    resetTokenForPassword: {
        type: String,
        default: null
    },
    resetTokenTime: {
        type: Date,
        default: null
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User