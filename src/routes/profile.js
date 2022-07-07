const profile = require('express').Router();
const profileController = require('../controllers/profile');
const { body } = require('express-validator');
const uploadProfile = require('../middleware/uploadProfile');

const editProfileValid = [
  body('fullname').isLength({min: 7}).withMessage('Fullname length minimal 7'),
  body('phone_number').isLength({min: 12}).withMessage('Phone number length minimal 12')
];

profile.get('/', profileController.getAllProfile);
profile.get('/:id', profileController.getProfileById);
profile.post('/', uploadProfile, ...editProfileValid, profileController.createProfile);
profile.patch('/:id', uploadProfile, ...editProfileValid, profileController.editProfile);
profile.delete('/:id', profileController.deleteProfile);

module.exports = profile;