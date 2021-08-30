const mongoose = require('../db/connection')

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true},
    date: String,
    reminder: { type: Boolean, required: true}
}, {
    timestamps: true
})

module.exports = TaskSchema