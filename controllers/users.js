require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

const saltStr = process.env.SALT_STRING

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
    }
})

// --- USER ROUTES ---

// CREATE
router.post('/create', async (req, res) => {
    const passwordHash = bcrypt.hashSync(req.body.password, saltStr)
    try {
        const newUser = await User.create({
            email: req.body.email,
            passwordHash: passwordHash
        })
        res.status(201).json(newUser)
    } catch (error) {
        console.error(error)
    }
})

// LOGIN
router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            res.status(204).send({
                error: 'User with this email was not found'
            })
        } else {
            if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
                res.status(200).json(user)
            } else {
                res.status(403).json({
                    error: 'Password was incorrect'
                })
            }
        }
    } catch (error) {
        console.error(error)
    }
})

// --- TASK ROUTES ---

// INDEX 
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        
        res.status(200).json(user.tasks)
    } catch (error) {
        console.error(error)
    }
})

// CREATE
router.post('/:userId', async (req, res) => {
    try {
        const newUser = await User.findByIdAndUpdate(
            req.params.userId,
            { $push: { tasks: req.body } },
            { new: true }
        )
        res.status(201).json(newUser)
    } catch (error) {
        console.error(error)
    }
})

// PUT
router.put('/:userId/:taskId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        const newTasks = user.tasks.map(task => {
            if (task._id === req.params.taskId) {
                task.reminder = req.body.reminder
            }
            return task
        })
        const newUser = await User.findByIdAndUpdate(
            req.params.userId,
            { tasks: newTasks },
            { new: true }
        )
        res.status(201).json(newUser)
    } catch (error) {
        console.error(error)
    }
})

// DELETE
router.delete('/:userId/:taskId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)

        const newTasks = user.tasks.filter(task => {
            return task._id !== req.params.taskId
        })

        const newUser = await User.findOneAndUpdate(
            req.params.userId,
            { tasks: newTasks },
            { new: true }
        )
        res.status(204).json(newUser)
    } catch (error) {
        console.error(error)
    }
})