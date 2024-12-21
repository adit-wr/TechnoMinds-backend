
const spkRepository = require('./spk.repository')

const createSpk = async (userId, materialId,quantityOrder,penerima) => {
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


module.exports = {
    createSpk,
    getSpkByUser,
    getSpkById,
    getAllSPK,
    updateStatusSpk,
    verifySpk
}