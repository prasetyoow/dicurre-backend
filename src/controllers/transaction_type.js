const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');
const transactionTypeModel = require('../models/transaction_type');
const { validationResult } = require('express-validator');

exports.getAllTransactionType = (req, res) => {
  transactionTypeModel.getAllTransactionType((results) => {
    return response(res, 'Message from standard response', results);
  });
};

exports.createTransactionType = (req, res) => {
  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    return response(res, 'There is an error', validation.array(), 400);
  }

  transactionTypeModel.createTransactionType(req.body, (err, results) => {
    if (err) {
      return errorResponse(err, res);
    
    } else {
      return response(res, 'Transaction type created!', results[0]);
    }
  });
};

exports.editTransactionType = (req, res) => {
  const {id} = req.params;
  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    return response(res, 'There is an error', validation.array(), null, 400);
  }

  transactionTypeModel.editTransactionType(id, req.body, (err, results) => {
    if (err) {
      return errorResponse(err, res);
    
    } else {
      return response(res, 'Transaction type just got edited', results.rows);
    }
  });
};

exports.deleteTransactionType = (req, res) => {
  const {id} = req.params;
  transactionTypeModel.deleteTransactionType(id, (results) => {
    return response(res, 'Transaction type deleted!', results[0]);
  });
};
