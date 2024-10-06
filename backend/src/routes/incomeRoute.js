const { addIncome, removeIncome, editIncome } = require('../controller/incomeController');
const { authenticateToken } = require('../middlewares/userMiddleware');
const router = require('express').Router();

router.post('/', authenticateToken, addIncome);
router.delete('/:id', authenticateToken, removeIncome);
router.patch('/:id', authenticateToken, editIncome);

module.exports = router;