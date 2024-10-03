const prisma = require('../db')
const createUser = async (userData) => {
    try {
        const newUser = await prisma.user.create({ data: userData })
        return newUser
    } catch (error) {
        throw new Error('failed')
    }
}

const findUsernameByUser = async (username) => {
    try {
        return prisma.user.findUnique({ where: { username } })
    } catch (error) {
        throw new Error('Login Failed')
    }
}
module.exports = {
    createUser,
    findUsernameByUser
}