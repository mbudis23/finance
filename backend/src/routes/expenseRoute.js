const { addExpense, removeExpense, editExpense } = require('../controller/expenseController')
const router = require('express').Router()

router.post('/', addExpense);
router.delete('/:id', removeExpense);
router.patch('/:id', editExpense);

module.exports = router;