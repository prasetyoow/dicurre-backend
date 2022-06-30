const response = require('../helpers/standardResponse');

const transactionTypeModel = require('../models/transaction_type');

exports.getAllTransactionType = (req, res) => {
  transactionTypeModel.getAllTransactionType((results) => {
    return response(res, 'Message from standard response', results);
  });
};

exports.createTransactionType = (req, res) => {
  transactionTypeModel.createTransactionType(req.body, (results) => {
    return response(res, 'Transaction type created!', results[0]);
  });
};

exports.editTransactionType = (req, res) => {
  const {id} = req.params;
  transactionTypeModel.editTransactionType(id, req.body, (results) => {
    return response(res, 'Transaction type just got edited', results[0]);
  });
};

exports.deleteTransactionType = (req, res) => {
  const {id} = req.params;
  transactionTypeModel.deleteTransactionType(id, req.body, (results) => {
    return response(res, 'Transaction type deleted!', results[0]);
  });
};
