const express = require('express');
const app = express();
const dotenv = require('dotenv');
const adminAuthorization = require('./middleware/adminAuthorization');
dotenv.config();

app.use(express.json());
app.get('/', (res, req) => {
    console.log(tes)
    res.send('helo world')
});
const authController = require('./auth/auth.controller');
const materialController = require('./material/material.controller');
const spkController = require('./spk/spk.controller');
const userController = require('./user/user.controller');

app.use('/api/auth', authController);
app.use('/api/materials', materialController);
app.use('/api/spk', spkController);
app.use('/api/user', adminAuthorization, userController);

export default app;