const { createAccount, deleteAccount } = require('../controller/accountController');
const { authenticateToken } = require('../middlewares/userMiddleware');

const router = require('express').Router();



router.post('/', authenticateToken, createAccount);
router.delete('/', authenticateToken, deleteAccount);

module.exports = router;