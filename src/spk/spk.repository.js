const prisma = require('../db')

const insertSPK = async (userId, filematerialId,quantityOrder,penerima) => {
    try {
        const newSPK = await prisma.sPK.create({
            data: {
                userId,
                materialId,
                quantityOrder,
                penerima,
                status: "PENDING",
                tanggal_pengajuan : new Date()
            }
        })
        return newSPK
    } catch (error) {
        console.log(error)
        throw new Error('failed create spk')
    }
}

const findSpk = async () => {
    try {
        const spk = await prisma.sPK.findMany()
        return spk
    } catch (error) {
        throw new Error('SPK not found')
    }
}
const findSpkByUser = async (userId) => {
    try {
        const userSpk = await prisma.sPK.findMany({
            where: {
                userId: parseInt(userId)
            },
            include: {
                material: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return userSpk
    } catch (error) {
        console.log(error)
        throw new Error('SPK by user not found')
    }
}

const findSpkById = async (ids) => {
    try {
        const spkById = await prisma.sPK.findUnique({
            where: {
                spkId: parseInt(ids)
            }
        })
        return spkById
    } catch (error) {
        throw new Error('SPK by id not found')
    }
}

const updateSpkStatus = async (spkId, status, timeStampField) => {
    try {
        const updateData = {
            status,
        };

        if (timeStampField) {
            updateData[timeStampField] = new Date();
        }

        const update = await prisma.sPK.update({
            where: {
                spkId: parseInt(spkId),
            },
            data: updateData,
        });
        return update;
    } catch (error) {
        console.log(error);
        throw new Error('failed to update spk status');
    }
};



module.exports = {
    insertSPK,
    findSpkByUser,
    findSpkById,
    findSpk,
    updateSpkStatus
}