const { createAccount, deleteAccount, getAccountsByUserId } = require('../controller/accountController');
const { authenticateToken } = require('../middlewares/userMiddleware');

const router = require('express').Router();



router.post('/', authenticateToken, createAccount);
router.delete('/:accountId', authenticateToken, deleteAccount);
router.get('/', authenticateToken, getAccountsByUserId);

module.exports = router;