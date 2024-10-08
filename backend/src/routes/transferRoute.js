const { addTransfer } = require('../controller/transferController');

const router = require('express').Router();

router.post('/', addTransfer);

module.exports = router