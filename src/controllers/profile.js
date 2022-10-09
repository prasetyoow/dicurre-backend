const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');
const response = require('../helpers/standardResponse');
const profileModel = require('../models/profile');
const {LIMIT_DATA} = process.env;

exports.getAllProfile = (req, res) => {
  const {searchBy='', search='', orderBy='id', sortType='ASC', limit=parseInt(LIMIT_DATA), page=1} = req.query;
  const offset = (page - 1) * limit;
  profileModel.getAllProfile(searchBy === null ? 'fullname' : searchBy === undefined ? 'fullname' : searchBy === '' ? 'fullname': searchBy, search, orderBy === null ? 'id': orderBy === undefined ? 'id': orderBy, sortType === null ? 'fullname' : sortType === undefined ? 'fullname' : sortType === '' ? 'fullname' : sortType, limit, offset, (err, results) => {
    if (results?.length < 1) {
      return res.redirect('/404');
    }
    const pageInfo = {};

    profileModel.countAllProfile(search, (err, totalData) => {
      pageInfo.totalData = totalData;
      pageInfo.totalPage = Math.ceil(totalData/limit);
      pageInfo.currentPage = parseInt(page);
      pageInfo.nextPage = pageInfo.currentPage < pageInfo.totalPage ? pageInfo.currentPage + 1 : null;
      pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
      return response(res, 'List of profiles', results, pageInfo);
    });  
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

  console.log(req.file);
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
