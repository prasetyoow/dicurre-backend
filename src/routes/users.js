const users = require('express').Router();
const userController = require('../controllers/users');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');

const createUserValid = [
  body('email')
    .isEmail().withMessage('Email format invalid'),
  body('username')
    .isLength({min: 4}).withMessage('Username length must be atleast 4 characters'),
  body('pin').isLength({min: 6}).withMessage('PIN must be 6 characters'),
  body('password')
    .isLength({min: 8}).withMessage('Password length must be atleast 8 characters')
    .customSanitizer(async (val) => {
      const hash = await bcrypt.hash(val, 10);
      return hash;
    }),
];

users.get('/', body('limit').toInt(), body('page').toInt(), userController.getAllUsers);
users.get('/:id', userController.getUserById);
users.post('/', ...createUserValid, userController.createUser);
users.patch('/:id', ...createUserValid, userController.editUser);
users.delete('/:id', userController.deleteUser);


module.exports = users;