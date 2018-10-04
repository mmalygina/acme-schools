const router = require('express').Router();

router.use('/students', require('./students'));
router.use('/schools', require('./schools'));

module.exports = router