const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');
const response = require('../helpers/standardResponse');
const profileModel = require('../models/profile');


exports.getAllProfile = (req, res) => {
  profileModel.getAllProfile((results) => {
    return response(res, 'Message from standard response', results);
  });
};

exports.createProfile = (req, res) => {
  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    return response(res, 'There is an error', validation.array(), 400);
  }

  profileModel.createProfile(req.body, (err, results) => {
    if (err) {
      return errorResponse(err, res);
    
    } else {
      return response(res, 'User created!', results[0]);
    }
  });
};

exports.editProfile = (req, res) => {
  const {id} = req.params;
  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    return response(res, 'There is an error', validation.array(), 400);
  }

  profileModel.editProfile(id, req.body, (err, results) => {
    if (err) {
      return errorResponse(err, res);
    }
    return response(res, 'Profile just got edited', results[0]);
  });
};

exports.deleteProfile = (req, res) => {
  const {id} = req.params;
  profileModel.deleteProfile(id, req.body, (results) => {
    return response(res, 'Profile deleted!', results[0]);
  });
};

exports.seacrhProfileById = (req, res)=>{
  const {id} = req.params;
  profileModel.searchProfileById(id, (results)=>{
    return response(res, 'Profile search', results[0]);
  });
};