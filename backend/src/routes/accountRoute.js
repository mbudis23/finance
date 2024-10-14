const { createAccount, deleteAccount, getAccountsByUserId } = require('../controller/accountController');
const { authenticateToken } = require('../middlewares/userMiddleware');

const router = require('express').Router();



router.post('/', authenticateToken, createAccount);
router.delete('/', authenticateToken, deleteAccount);
router.get('/', authenticateToken, getAccountsByUserId);

module.exports = router;