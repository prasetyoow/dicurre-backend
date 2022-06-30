const response = require('../helpers/standardResponse');

const transactionsModel = require('../models/transactions');

exports.getAllTransactions = (req, res) => {
  transactionsModel.getAllTransactions((results) => {
    return response(res, 'Message from standard response', results);
  });
};

exports.createTransactions = (req, res) => {
  transactionsModel.createTransactions(req.body, (results) => {
    return response(res, 'Transactions created!', results[0]);
  });
};

exports.editTransactions = (req, res) => {
  const {id} = req.params;
  transactionsModel.editTransactions(id, req.body, (results) => {
    return response(res, 'Transactions just got edited', results[0]);
  });
};

exports.deleteTransactions = (req, res) => {
  const {id} = req.params;
  transactionsModel.deleteTransactions(id, req.body, (results) => {
    return response(res, 'Transactions deleted!', results[0]);
  });
};
