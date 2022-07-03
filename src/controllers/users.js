const { body, validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');
const response = require('../helpers/standardResponse');
const userModel = require('../models/users');
const bcrypt = require('bcrypt');


exports.getAllUsers = (req, res) => {
  userModel.getAllUsers((results) => {
    return response(res, 'Message from standard response', results);
  });
};

exports.createUser = [
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
  (req, res) => {
    const validation = validationResult(req);
  
    if (!validation.isEmpty()) {
      return response(res, 'There is an error', validation.array(), 400);
    }

    userModel.createUser(req.body, (err, results) => {
      if(err) {
        return errorResponse(err, res);
      
      } else {
        return response(res, 'User created!', results[0]);
      }
    });
  },
];

exports.editUser = (req, res) => {
  const {id} = req.params;
  const validation = validationResult(req);
  
  if (!validation.isEmpty()) {
    return response(res, 'There is an error', validation.array(), 400);
  }

  userModel.updateUser(id, req.body, (results) => {
    return response(res, 'Data updated!', results[0]);
  });
};

exports.deleteUser = (req, res) => {
  const {id} = req.params;
  userModel.deleteUser(id, (results) => {
    return response(res, 'User deleted!', results[0]);
  });
};