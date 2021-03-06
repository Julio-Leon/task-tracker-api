const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log('Listening on port:', PORT)
})