
const response = require('../helpers/standardResponse');

const profileModel = require('../models/profile');

exports.getAllProfile = (req, res) => {
  profileModel.getAllProfile((results) => {
    return response(res, 'Message from standard response', results);
  });
};

exports.createProfile = (req, res) => {
  profileModel.createProfile(req.body, (results) => {
    return response(res, 'Profile created!', results[0]);
  });
};

exports.editProfile = (req, res) => {
  const {id} = req.params;
  profileModel.editProfile(id, req.body, (results) => {
    return response(res, 'Profile just got edited', results[0]);
  });
};
