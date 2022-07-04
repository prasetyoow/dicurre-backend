const users = require('express').Router();
const userController = require('../controllers/users');
const { body } = require('express-validator');

users.get('/', body('limit').toInt(), body('page').toInt(), userController.getAllUsers);
users.post('/', userController.createUser);
users.patch('/:id', userController.editUser);
users.delete(':/id', userController.deleteUser);


module.exports = users;