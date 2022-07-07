const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');
const response = require('../helpers/standardResponse');
const userModel = require('../models/users');
const {LIMIT_DATA} = process.env;

exports.getAllUsers = (req, res) => {
  const {search = '', limit = parseInt(LIMIT_DATA), page = 1} = req.query;
  const offset = (page - 1) * limit;
  userModel.getAllUsers(search, limit, offset, (err, results) => {
    if (results.length < 1) {
      return res.redirect('/404');
    }


    const pageInfo = {};

    userModel.countAllUsers(search, (err, totalData) => {
      pageInfo.totalData = totalData;
      pageInfo.totalPage = Math.ceil(totalData/limit);
      pageInfo.currentPage = parseInt(page);
      pageInfo.nextPage = pageInfo.currentPage < pageInfo.totalPage ? pageInfo.currentPage + 1 : null;
      pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
      return response(res, 'List all users', results, pageInfo);
    });
  });
};

exports.sortUsers = (req, res ) => {
  const {column_name = '', search = '', sort_type = 'ASC', limit = parseInt(LIMIT_DATA), page = 1 } = req.query;
  const offset = (page - 1) * limit;
  userModel.sortUsers(column_name, search, sort_type, limit, offset, (results) => {
    if (results.length < 1) {
      return res.redirect('/404');
    }
  });
};

exports.getUserById = (req, res)=>{
  const {id} = req.params;
  userModel.getUserById(id, (results)=>{
    return response(res, 'Got the profile', results[0]);
  });
};

exports.createUser = (req, res) => {
  const validation = validationResult(req);
  
  if (!validation.isEmpty()) {
    return response(res, 'There is an error', validation.array(), null, 400);
  }

  userModel.createUser(req.body, (err, results) => {
    if(err) {
      return errorResponse(err, res);
      
    } else {
      return response(res, 'User created!', results[0]);
    }
  });
},


exports.editUser =  (req, res) => {
  const {id} = req.params;
  const validation = validationResult(req);
  
  if (!validation.isEmpty()) {
    return response(res, 'There is an error', validation.array(), null, 400);
  }

  userModel.editUser(id, req.body, (err, results) => {
    if (err) {
      return errorResponse(err, res);
    } else {
      return response(res, 'Data updated!', results.rows);
    }
  });
};

exports.deleteUser = (req, res) => {
  const {id} = req.params;
  userModel.deleteUser(id, (results) => {
    return response(res, 'User deleted!', results[0]);
  });
};