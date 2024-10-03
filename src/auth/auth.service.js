const bcrypt = require('bcrypt')
const userRepository = require('./auth.repository')

const jwt = require('jsonwebtoken')

const getnerateToken = async (user) => {

    return jwt.sign({
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const register = async (username, email, password) => {
    try {

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = {
            username,
            email,
            password: hashedPassword,
        }
        const newUser = userRepository.createUser(user)
        return newUser
    } catch (error) {
        throw new Error('Register Failed')
    }
}

const login = async (username, password) => {
    const user = await userRepository.findUsernameByUser(username)
    if (!user) {
        throw new Error('username tidak ditemukan')
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        throw new Error('password failed')
    }
    const token = await getnerateToken(user)
    console.log(token)
    return { user, token }
}


module.exports = { register, login }