const bcrypt = require('bcrypt')
const userRepository = require('./user.repository')

const createUser = async (newUserData) => {
    const hashedPassword = await bcrypt.hash(newUserData.password, 10)
    newUserData.password = hashedPassword
    const newUser = await userRepository.insertUser(newUserData)
    return newUser
}

const getUsers = async () => {
    const users = await userRepository.getAllUser()
    return users
}

const getUser = async (id) => {
    const user = await userRepository.getUserById(id)
    if (!user) {
        throw new Error("User Not Found")
    }
    return user
}

const updateUser = async (id, userData) => {
    if (userData.password) {
        const hashedPassword = await bcrypt.hash(userData.password, 10)
        userData.password = hashedPassword
    }
    await getUser(id)
    const update = await userRepository.editUser(id, userData)
    return update
}

const deleteUserById = async (id) => {
    await getUser(id)
    const user = await userRepository.deleteUser(id)
    return user
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUserById
}