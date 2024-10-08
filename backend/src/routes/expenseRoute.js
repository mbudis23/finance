const { addExpense } = require('../controller/expenseController')
const router = require('express').Router()

router.post('/', addExpense);

module.exports = router;