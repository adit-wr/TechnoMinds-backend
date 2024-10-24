const express = require('express')
const router = express.Router()
const spkService = require('./spk.service')
const authorizeJWT = require('../middleware/authorizeJWT')
const adminAuthorization = require('../middleware/adminAuthorization')

router.post('/', authorizeJWT, async (req, res) => {
    try {
        // const userId = req.userId
        const { userId, materialId, description } = req.body
        const newSpk = await spkService.createSpk(userId, materialId, description)
        res.status(201).json(newSpk)
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})

router.get('/', adminAuthorization, async (req, res) => {
    try {
        const spk = await spkService.getAllSPK()
        res.status(200).json(spk)
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})

router.get('/user', authorizeJWT, async (req, res) => {
    try {
        const userId = req.userId
        const spkByUser = await spkService.getSpkByUser(userId)
        res.status(200).json
            (spkByUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', authorizeJWT, async (req, res) => {
    try {
        const spkId = req.params.id
        const spkByMaterial = await spkService.getSpkById(spkId)
        res.status(200).json(spkByMaterial)
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})

router.patch('/:id', adminAuthorization, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updateSpk = await spkService.updateStatusSpk(id, status);
        res.status(200).json(updateSpk);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});


module.exports = router