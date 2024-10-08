const { addExpense, removeExpense } = require('../controller/expenseController')
const router = require('express').Router()

router.post('/', addExpense);
router.post('/:id', removeExpense);

module.exports = router;