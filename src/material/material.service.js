const { insertMaterial, findMaterials, findMaterialById, editMaterial, deleteMaterial } = require('./material.repository');

async function createMaterial(newMaterialData) {
    const newMaterial = await insertMaterial(newMaterialData);
    return newMaterial;
}
async function getAllMaterials() {
    const materials = await findMaterials();
    return materials;
}
async function getMaterialById(id) {
    const material = await findMaterialById(id);
    if(!material) {
        throw Error('Material tidak ada');
    }
    return material;
}
async function editMaterialById(id, materialData) {
    await getMaterialById(id);
    const updatedMaterial = await editMaterial(id, materialData);
    return updatedMaterial;
}
async function deleteMaterialById(id) {
    await getMaterialById(id);
    await deleteMaterial(id);
}

module.exports = {
    createMaterial,
    getAllMaterials,
    getMaterialById,
    editMaterialById,
    deleteMaterialById
}