const transactions = require('express').Router()

transactions.get('/', (req, res) => {
    return res.json({
        success: true,
        message: 'List all transactions'
    })
})


module.exports = transactions