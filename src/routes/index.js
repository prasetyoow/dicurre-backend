const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/profile', require('./profile'));
router.use('/transactions', require('./transactions'));
router.use('/transaction_type', require('./transaction_type'));
router.use('/auth', require('./auth'));


module.exports = router;