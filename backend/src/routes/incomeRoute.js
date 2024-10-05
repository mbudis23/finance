const { addIncome, removeIncome } = require('../controller/incomeController');
const router = require('express').Router();

router.post('/', addIncome);
router.delete('/:id', removeIncome);

module.exports = router;