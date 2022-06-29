const users = require('express').Router();

const userController = require('../controllers/users');

users.get('/', userController.getAllUsers);
users.post('/', userController.createUser);
users.patch('/:id', userController.editUser);
users.delete(':/id', userController.deleteUser);


module.exports = users;