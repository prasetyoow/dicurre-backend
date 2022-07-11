const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');
const response = require('../helpers/standardResponse');
const profileModel = require('../models/profile');

exports.getAllProfile = (req, res) => {
  profileModel.getAllProfile((results) => {
    return response(res, 'List of profiles', results);
  });
};

exports.getProfileById = (req, res)=>{
  const {id} = req.params;
  profileModel.getProfileById(id, (results)=>{
    return response(res, 'Got the profile', results[0]);
  });
};

exports.createProfile = ( req, res) => {
  let filename = null;

  if (req.file) {
    filename = req.file.filename;
  }
  
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return response(res, 'There is an error', validation.array(), 400);
  }

  profileModel.createProfile(req.body, filename, (err, results) => {
    if (err) {
      return errorResponse(err, res);
    
    } else {
      return response(res, 'Profile created!', results[0]);
    }
  });
};

exports.editProfile = (req, res,) => {
  const {id} = req.params;
  let filename = null; 

  if (req.file) {
    filename = req.file.filename;
  }
  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    return response(res, 'There is an error', validation.array(), null, 400);
  }

  profileModel.editProfile(id, filename, req.body,  (err, results) => {
    if (err) {
      return errorResponse(res, `Failed to update: ${err.message}, null, null, 400`);
    } else {
      return response(res, 'Profile just got edited', results.rows[0]);
    }
  });
};

exports.deleteProfile = (req, res) => {
  const {id} = req.params;
  profileModel.deleteProfile(id, (results) => {
    return response(res, 'Profile deleted!', results[0]);
  });
};
