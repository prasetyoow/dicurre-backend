const profile = require('express').Router();

const profileController = require('../controllers/profile');

profile.get('/', profileController.getAllProfile);
profile.post('/', profileController.createProfile);
profile.patch('/:id', profileController.editProfile);
profile.delete('/:id', profileController.deleteProfile);

module.exports = profile;