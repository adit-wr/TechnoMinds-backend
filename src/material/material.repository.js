const prisma = require('../db')

async function insertMaterial(materialData) {
    const newMaterial = await prisma.material.create({
        data: {
            name: materialData.name,
            descriptions: materialData.descriptions,
            quantity: materialData.quantity,
            status: 'AVAILABLE'
        }
    });
    return newMaterial;    
}

async function findMaterials() {
    const materials = await prisma.material.findMany();
    return materials;
}

async function findMaterialById(id) {
    const material = await prisma.material.findUnique({
        where: {
            materialId: parseInt(id),
        }
    });
    return material;
}

async function editMaterial(id, materialData) {
    const updatedMaterial = await prisma.material.update({
        where: {
            materialId: parseInt(id),
        },
        data: {
            name: materialData.name,
            descriptions: materialData.descriptions,
            quantity: materialData.quantity,
            status: 'AVAILABLE'
        },
    });
    return updatedMaterial;
}

async function deleteMaterial(id) {
    await prisma.material.delete({
        where: {
            materialId: parseInt(id)
        }
    })
}

module.exports = {
    insertMaterial,
    findMaterials,
    findMaterialById,
    editMaterial,
    deleteMaterial
}