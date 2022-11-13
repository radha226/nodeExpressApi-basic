const express = require('express')
const userRouter = express.Router()
const userController = require("../../controllers/user.controllers");
// const authController= require("../controllers/auth.controller");
// const middlewareConstrain = require("../../middleware/email.middleware");


// Create a new user
// router.post('/', middlewareConstrain.isLoggedIn, userController.create);
// Retrieve a single user with id
userRouter.get('/',userController.findAll);
userRouter.get('/:id', userController.findOne);
// Update a user with id
userRouter.put('/:id', userController.update);
// Delete a user with id
userRouter.delete('/:id', userController.delete);
// userRouter.deleteAll("allDelete", userController.deleteAll);

// userRouter.get('/test', userController.test);
module.exports = userRouter