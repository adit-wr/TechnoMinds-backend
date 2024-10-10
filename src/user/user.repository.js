const prisma = require('../db')

const insertUser = async (userData) => {
    const newUser = await prisma.user.create({
        data: {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            role: 'WH_OPERATOR'
        }
    })
    return newUser
}

const getAllUser = async () => {
    const allUser = await prisma.user.findMany({
        select: {
            userId: true,
            username: true,
            email: true,
            role: true,
            createdAt: true
        }
    })
    return allUser
}

const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            userId: parseInt(id)
        }
    })
    return user
}

const editUser = async (id, userData) => {
    const user = await prisma.user.update({
        where: {
            userId: parseInt(id)
        },
        data: {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            role: userData.role
        }
    })
    return user
}

const deleteUser = async (id) => {
    const user = await prisma.user.delete({
        where: {
            userId: parseInt(id)
        }
    })
    return user
}

module.exports = {
    insertUser,
    getAllUser,
    getUserById,
    editUser,
    deleteUser
}