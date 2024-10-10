const express = require('express')
const router = express.Router()
const userService = require('./user.service')
const { user } = require('../db')
const { use } = require('bcrypt/promises')

router.post('/', async (req, res, next) => {
    try {
        const newUser = req.body
        const user = await userService.createUser(newUser)
        res.status(201).json(user)
    } catch (e) {
        res.status(400).json(e.message)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const users = await userService.getUsers()
        res.status(200).json(users)
    } catch (e) {
        res.status(400).json(e.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const user = await userService.getUser(userId)
        res.status(200).json(user)
    } catch (e) {
        res.status(400).json(e.message)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const user = req.body
        const updateUser = await userService.updateUser(userId, user)
        res.status(200).json(updateUser)
    } catch (e) {
        res.status(400).json(e.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const deleteUser = await userService.deleteUserById(userId)
        res.status(200).json(deleteUser)
    } catch (e) {
        res.status(400).json(e.message)
    }
})
module.exports = router