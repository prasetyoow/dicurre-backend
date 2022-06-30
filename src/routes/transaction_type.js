const transaction_type = require('express').Router();

const transactionTypeController = require('../controllers/transaction_type');

transaction_type.get('/', transactionTypeController.getAllTransactionType);
transaction_type.post('/', transactionTypeController.createTransactionType);
transaction_type.patch('/:id', transactionTypeController.editTransactionType);
transaction_type.delete('/:id', transactionTypeController.deleteTransactionType);

module.exports = transaction_type;