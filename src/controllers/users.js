const response = require('../helpers/standardResponse');

const userModel = require('../models/users');

exports.getAllUsers = (req, res) => {
  userModel.getAllUsers((results) => {
    return response(res, 'Message from standard response', results);
  });
};