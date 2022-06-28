const transactions = require('express').Router();

const transactionController = require('../controllers/transactions');

transactions.get('/', transactionController.getAllTransactions);

module.exports = transactions;