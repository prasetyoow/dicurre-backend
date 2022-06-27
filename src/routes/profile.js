const profile = require('express').Router()

profile.get('/', (req, res) => {
    return res.json({
        success: true,
        message: 'List all profile'
    })
})


module.exports = profile