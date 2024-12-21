
const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT
const adminAuthorization = require('./middleware/adminAuthorization')
const cors = require('cors')


app.use(express.json());
app.use(cors())
app.get('/', (res, req) => {
    console.log(tes)
    res.send('helo world')
})

const authController = require('./auth/auth.controller')
const materialController = require('./material/material.controller')
const spkController = require('./spk/spk.controller')
const userController = require('./user/user.controller')

app.use('/api/auth', authController)
app.use('/api/materials', materialController)
app.use('/api/spk', spkController)
app.use('/api/user', adminAuthorization, userController)

// export default app;
app.listen(PORT, () => {
    console.log('server berjalan port : ' + PORT)
})