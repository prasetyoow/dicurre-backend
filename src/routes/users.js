const users = require('express').Router()

users.get('/', (req, res) => {
    return res.json({
        success: true,
        message: 'List all users'
    })
})


module.exports = users