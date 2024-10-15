const jwt = require('jsonwebtoken')

function authorizeJWT(req, res, next) {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ message: 'token tidak ada' })
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch (error) {
        return res.status(403).json({ message: 'autentikasi token gagal' })
    }
}

module.exports = authorizeJWT;