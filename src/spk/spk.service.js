
const spkRepository = require('./spk.repository')
const materialRepository = require('../material/material.repository')

getFreeWHOPerators = async()=>{
    const freeOperators = await spkRepository.findFreeWHOperators()
    if(!freeOperators.length){
        throw new Error('No free WH Operators found')
    }
    return freeOperators
}

const createSpk = async (userId, materialId,quantityOrder,penerima) => {
    // validasi penerima
    const freeOperators = await spkRepository.findFreeWHOperators();
    console.log(freeOperators)
    const isValidasiOperators = freeOperators.some(user => user.userId === parseInt(penerima))
    if(!isValidasiOperators){
        throw new Error('Selected penerima is not valid or not free')
    }
    const spk = await spkRepository.insertSPK(userId, materialId,quantityOrder,penerima)
    return spk
}

const getAllSPK = async () => {
    const spk = await spkRepository.findSpk()
    return spk
}

const getSpkByUser = async (userId) => {
    const userSpk = await spkRepository.findSpkByUser(userId)
    if (!userSpk) {
        throw new Error("SPK by User not founds")
    }
    return userSpk
}

const getSpkById = async (spkId) => {
    const spkById = await spkRepository.findSpkById(spkId)
    if (!spkId) {
        throw new Error('SPK by Id not founds')
    }
    return spkById
}

const verifySpk = async (spkId, status) => {
    const spk = await spkRepository.findSpkById(spkId)
    if (!spk) {
        throw new Error('SPK by Id not found')
    }
    await spkRepository.updateSpkStatus(spkId, status, status === "")
}

const updateStatusSpk = async (spkId, status) => {
    const validStatus = ['PENDING', 'ON_PROCESS', 'DONE'];

    if (!validStatus.includes(status.toUpperCase())) {
        throw new Error('invalid status');
    }

    const updateSpk = await spkRepository.updateSpkStatus(spkId, status.toUpperCase());

    if (!updateSpk) {
        throw new Error(`SPK with id ${spkId} not found`);
    }
    return updateSpk;
};

const verifySPK2 = async (spkId,status) =>{
    const spk = await spkRepository.findSpkById(spkId)
    if(!spk){
        throw new Error('SPK by Id not found')
    }

    await spkRepository.updateSpkStatus(spkId, status, status === 'DONE' ? 'createdAt' : null)

    if(status === 'DONE'){
        const material = await materialRepository.findMaterialById(spk.materialId)
        if(!material){
            throw new Error('material not found')
        }

        const newQuantity = material.quantity - spk.quantityOrder
        if(newQuantity < 0){
            throw new Error('infsufficent quantity')
        }
        await materialRepository.updateMaterialQuantity(spk.materialId,newQuantity)
    }
    return spk
}


module.exports = {
    createSpk,
    getSpkByUser,
    getSpkById,
    getAllSPK,
    updateStatusSpk,
    verifySpk,
    getFreeWHOPerators,
    verifySPK2
}