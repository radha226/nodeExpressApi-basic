const express = require('express')
const rootRouter = express.Router()
// const userController = require('../controllers/user.controllers');
// const authController= require("../controllers/auth.controller");
// const middlewareConstrain = require("../middleware/email.middleware");

rootRouter.use('/users', require('./api/userRouter'));
rootRouter.use('/', require('./api/authRouter'));
module.exports = rootRouter



