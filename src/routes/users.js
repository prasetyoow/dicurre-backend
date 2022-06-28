const users = require('express').Router();

const userController = require('../controllers/users');

users.get('/', userController.getAllUsers);


module.exports = users;