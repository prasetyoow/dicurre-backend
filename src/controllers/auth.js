const userModel = require('../models/users');
const response = require('../helpers/standardResponse');
const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authModel = require('../models/authenticated');

exports.register = (req, res) => {
  req.body.pin = null;
  
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return response(res, 'There is an error', validation.array(), null, 400);
  }
  
  authModel.register(req.body, (err) => {
    if (err) {
      console.log(err);
      return errorResponse(err, res);
    }
    
    return response(res, 'Register success');
  });
};

exports.createPin = (req, res) => {
  const {email} = req.body;
  userModel.getUserByEmail(email, (err, results) =>{
    if (results.rows > 0) {
      const user = results.rows[0];
      if (user.pin === null) {
        userModel.updateUser(user.id, {pin: req.body.pin}, (err, resultUpdate) =>{
          const userUpdated = resultUpdate.rows[0];
          if (userUpdated.email === user.email) {
            return response(res, 'Create pin success');
          }
        });
      } else {
        return response(res, 'Error: Pin already set', null, null, 400);
      }
    } else { 
      return response(res, 'Error: Email does not exists', null, null, 400);
    }
  });
};

exports.login = (req, res) => {
  const {email, password} = req.body;
  userModel.getUserByEmail(email, (err, results) => {
    if (results.rows.length < 1) {
      return response(res, 'User not found', null, null, 400);
    }
    const user = results.rows[0];
    bcrypt.compare(password, user.password)
      .then((cpRes) => {
        if (cpRes) {
          const token = jwt.sign({id: user.id}, process.env.APP_SECRET || 'secretKey');
          return response(res, 'Login success', {token});
        }
        return response(res, 'Email or password not match', null, null, 400);
      })
      .catch(() => {
        return response(res, 'Email or password not match', null, null, 400);
      });
  });
};
