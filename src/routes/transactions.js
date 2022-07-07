const transactions = require('express').Router();
const { body } = require('express-validator');
const transactionsController = require('../controllers/transactions');

const createTransactionsValid = [
  body('amount').isNumeric().withMessage('Amount must number'),
];

const editTransactionsValid = [
  body('amount').isNumeric().withMessage('Amount must number'),
];

transactions.get('/', transactionsController.getAllTransactions);
transactions.post('/', ...createTransactionsValid, transactionsController.createTransactions);
transactions.patch('/:id', ...editTransactionsValid, transactionsController.editTransactions);
transactions.delete('/:id', transactionsController.deleteTransactions);

module.exports = transactions;