require('dotenv').config()
const mongoose = require('mongoose')

const mongoURL = process.env.DATABASE_URL

const db = mongoose.connection

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, () => {
    console.log('Connection with MongoDB is established.')
})

db.on('error', (error) => {
    console.log('ERROR:', error)
})

db.on('connected', () => {
    console.log('Connected to', mongoURL)
})

db.on('disconnected', () => {
    console.log('Disconnected!')
})

module.exports = mongoose