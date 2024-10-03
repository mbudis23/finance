const { createAccount } = require('../controller/accountController');

const router = require('express').Router();



router.post('/', createAccount);

module.exports = router;