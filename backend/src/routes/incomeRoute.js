const { addIncome } = require('../controller/incomeController');
const router = require('express').Router();

router.post('/', addIncome);

module.exports = router;