const { createAccount } = require('../controller/accountController');
const { authenticateToken } = require('../middlewares/userMiddleware');

const router = require('express').Router();



router.post('/', authenticateToken, createAccount);

module.exports = router;