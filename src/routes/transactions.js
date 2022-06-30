const transactions = require('express').Router();

const transactionsController = require('../controllers/transactions');

transactions.get('/', transactionsController.getAllTransactions);
transactions.post('/', transactionsController.createTransactions);
transactions.patch('/:id', transactionsController.editTransactions);
transactions.delete('/:id', transactionsController.deleteTransactions);

module.exports = transactions;