const transaction_type = require('express').Router();

const transactionTypeController = require('../controllers/transaction_type');

transaction_type.get('/', transactionTypeController.getAllTransactionType);

module.exports = transaction_type;