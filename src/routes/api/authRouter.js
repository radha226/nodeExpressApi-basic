const express = require('express')
const authRouter = express.Router()
const userController = require('../../controllers/user.controllers');
const authController= require("../../controllers/auth.controller");
// const middlewareConstrain = require("../middleware/email.middleware");

authRouter.get('',authController.login);
authRouter.post('/register', authController.create);
authRouter.post('verify', authController.verify);
module.exports = authRouter