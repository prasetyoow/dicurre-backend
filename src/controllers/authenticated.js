const userModel = require('../models/users');
const response = require('../helpers/standardResponse');
const profileModel = require('../models/profile');
const errorResponse = require('../helpers/errorResponse');
const {validationResult} = require('express-validator');
// const authModel = require('../models/authenticated');

exports.getProfileByUserId = (req, res)=>{
  const user_id = parseInt(req.authUser.id);
  console.log(user_id);
  profileModel.getProfileByUserId(user_id, (err, results)=>{
    // console.log(results);
    return response(res, 'Got the profile', results[0]);
  });
};

exports.addPhone = (req, res) => {
  const user_id = parseInt(req.authUser.id);
  profileModel.getProfileByUserId(user_id, (err, results) =>{
    if (results.rows.length > 0) {
      const profile = results.rows[0];
      if (profile.phone_number === null) {
        profileModel.editProfile(profile.id, {phone_number: req.body.phone_number}, (err, resultUpdate) =>{
          const profileUpdated = resultUpdate.rows[0];
          if (profileUpdated.id === profile.id) {
            return response(res, 'Add phone number success');
          }
        });
      } else {
        return response(res, 'Error: Phone number already set', null, null, 400);
      }
    } else { 
      return response(res, 'Error: User Id does not exists', null, null, 400);
    }
  });
};

exports.editProfileByUserId = (req, res) => {
  const user_id = parseInt(req.authUser.id);
  let filename = null; 

  if (req.file) {
    filename = req.file.filename;
  }
  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    return response(res, 'There is an error', validation.array(), null, 400);
  }

  profileModel.editProfileByUserId(user_id, filename, req.body, (err, results) => {
    if (err) {
      return errorResponse(res, `Failed to update: ${err.message}`, null, null, 400);
    }
    return response(res, 'Profile updated', results.rows[0]);
  });
};

exports.changePassword = (req, res) => {
  const user_id = parseInt(req.authUser.id);
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return response(res, 'There is an error', validation.array(), null, 400);
  }

  userModel.changePassword(user_id, req.body, (err) => {
    if (err) {
      return errorResponse(err, res);
    }else{
      return response(res, 'Password changed!');
    }
  });
};

exports.changePin = (req, res) => {
  const user_id = parseInt(req.authUser.id);
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return response(res, 'There is an error', validation.array(), null, 400);
  }

  userModel.changePin(user_id, req.body, (err) => {
    if (err) {
      return errorResponse(err, res);
    }else{
      return response(res, 'PIN changed!');
    }
  });
};

exports.changePhoneNumber = (req, res) => {
  const user_id = parseInt(req.authUser.id);
  const validation = validationResult(req);
  
  if (!validation.isEmpty()) {
    return response(res, 'There is an error', validation.array(), null, 400);
  }

  profileModel.changePhoneNumber(user_id, req.body, (err) => {
    // console.log(res);
    if (err) {
      return errorResponse(err, res);
    } else {
      return response(res, 'Phone number changed!');
    }
  });
};