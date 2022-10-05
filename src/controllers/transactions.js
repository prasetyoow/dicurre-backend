const response = require('../helpers/standardResponse');
const { body, validationResult } = require('express-validator');
const transactionsModel = require('../models/transactions');
const errorResponse = require('../helpers/errorResponse');

exports.getAllTransactions = (req, res) => {
  transactionsModel.getAllTransactions((results) => {
    return response(res, 'List all transactions', results);
  });
};

exports.getTransactionsById = (req, res)=>{
  const {id} = req.params;
  transactionsModel.getTransactionsById(id, (results)=>{
    return response(res, 'Got the Transactions', results[0]);
  });
};

exports.createTransactions = [
  body('time').isISO8601().withMessage('Date format invalid (ISO8601)'),
  (req, res) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      return response(res, 'There is an error', validation.array(), 400);
    }

    transactionsModel.createTransactions(req.body, (err, results) => {
      if (err) {
        return errorResponse(err, res);
    
      } else {
        return response(res, 'Transactions created!', results[0]);
      }
    });
  },
];

exports.editTransactions = (req, res) => {
  const {id} = req.params;
  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    return response(res, 'There is an error', validation.array(), 400);
  }

  transactionsModel.editTransactions(id, req.body, (err, results) => {
    if (err) {
      return response(res, 'Error', null, 400);
    } else {
      return response(res, 'Transactions just got edited', results.rows);
    }
  });
};

exports.deleteTransactions = (req, res) => {
  const {id} = req.params;
  transactionsModel.deleteTransactions(id, (results) => {
    return response(res, 'Transactions deleted!', results[0]);
  });
};
