const { body, validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');
const response = require('../helpers/standardResponse');
const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const {LIMIT_DATA} = process.env;

exports.getAllUsers = (req, res) => {
  const {search = '', limit=parseInt(LIMIT_DATA), page=1} = req.query;
  const offset = (page-1) * limit;
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

exports.getUserbyId = (req, res) => {
  const {id} = req.params;
  userModel.getUserbyId(id, (err, results) =>{
    if (results.row.length > 0) {
      return response(res, 'Detail user', results.rows[0]);
    }
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
];

exports.editUser =  [ 
  body('email').isEmail().withMessage('Email format invalid'),
  body('username').isLength({min: 4}).withMessage('Username length must be atleast 4 characters'),
  body('password')
    .isLength({min: 8}).withMessage('Password length must be atleast 8 characters')
    .customSanitizer(async (val) =>{
      const hash = await bcrypt.hash(val, 10);
      return hash;
    })
];

(req, res) => {
  const {id} = req.params;
  const validation = validationResult(req);
  
  if (!validation.isEmpty()) {
    return response(res, 'There is an error', validation.array(), 400);
  }

  userModel.editUser(id, req.body, (results) => {
    return response(res, 'Data updated!', results[0]);
  });
};

exports.deleteUser = (req, res) => {
  const {id} = req.params;
  userModel.deleteUser(id, (results) => {
    return response(res, 'User deleted!', results[0]);
  });
};