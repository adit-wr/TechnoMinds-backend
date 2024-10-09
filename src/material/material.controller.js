const express = require('express');
const router = express.Router();
const { createMaterial, getAllMaterials, getMaterialById, editMaterialById, deleteMaterialById } = require('./material.service');

router.post('/', async (req, res) => {
    try {
        const newMaterialData = req.body;
        const newMaterial = await createMaterial(newMaterialData);
        res.status(201).json(newMaterial);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const materials = await getAllMaterials();
        res.status(200).send(materials);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const materialId = parseInt(req.params.id);
        const material = await getMaterialById(materialId);
        res.status(200).send(material);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const materialId = req.params.id;
        const materialData = req.body;
        const updatedMaterial = await editMaterialById(materialId, materialData);
        res.send(updatedMaterial);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const materialId = req.params.id;
        await deleteMaterialById(materialId);
        res.status(204).json({ message: 'Material berhasil dihapus'});
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;