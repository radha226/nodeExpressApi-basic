const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controllers');
const authController= require("../controllers/auth.controller");
const middlewareConstrain = require("../middleware/email.middleware");
// Retrieve all users

router.get('/',userController.findAll);
router.get('/login',authController.login);
router.post('/register', userController.create);
router.post('/verify', userController.verify);
// Create a new user
// router.post('/', middlewareConstrain.isLoggedIn, userController.create);
// Retrieve a single user with id
// router.get('/:id', userController.findOne);
// Update a user with id
router.put('/:id', userController.update);
// Delete a user with id
router.delete('/:id', userController.delete);
// router.deleteAll("allDelete", userController.deleteAll);

router.get('/test', userController.test);
module.exports = router



