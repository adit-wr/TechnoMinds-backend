const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT


app.use(express.json())
app.get('/', (res, req) => {
    console.log(tes)
    res.send('hello, world')
})
const authController = require('./auth/auth.controller')
app.use('/api/auth', authController)

app.listen(PORT, () => {
    console.log('server berjalan' + PORT)
})