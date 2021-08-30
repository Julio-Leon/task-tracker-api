const mongoose = require('../db/connection')

const taskSchema = require('./task')

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    passwordHash: { type: String, required: true},
    tasks: [taskSchema]
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema)

module.exports = User