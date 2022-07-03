const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');
const response = require('../helpers/standardResponse');
const userModel = require('../models/users');


exports.getAllUsers = (req, res) => {
  userModel.getAllUsers((results) => {
    return response(res, 'Message from standard response', results);
  });
};

exports.createUser = (req, res) => {
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
};

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