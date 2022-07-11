const auth = require('express').Router();
const authController = require('../controllers/auth');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');

const authRegisValid = [
  body('email')
    .isEmail().withMessage('Email format invalid'),
  body('username')
    .isLength({min: 4}).withMessage('Username length must be atleast 4 characters'),
  body('password')
    .isLength({min: 8}).withMessage('Password length must be atleast 8 characters')
    .customSanitizer(async (val) => {
      const hash = await bcrypt.hash(val, 10);
      return hash;
    }),
];

const authCreatePinValid = [
  body('email')
    .isEmail().withMessage('Email format invalid'),
  body('pin')
    .isLength({min: 6, max: 6}).withMessage('PIN must be 6 numbers').isNumeric().withMessage('Pin must be a number'),
];

const authLoginValid = [
  body('email')
    .isEmail().withMessage('Email format invalid'),
];

auth.post('/register', ...authRegisValid, authController.register);
auth.post('/createPin', ...authCreatePinValid,  authController.createPin);
auth.post('/login', ...authLoginValid,  authController.login);


module.exports = auth;