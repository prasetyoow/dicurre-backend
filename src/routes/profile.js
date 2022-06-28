const profile = require('express').Router();

const profileController = require('../controllers/profile');

profile.get('/', profileController.getAllProfile);

module.exports = profile;