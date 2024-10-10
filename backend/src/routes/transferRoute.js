const { addTransfer, removeTransfer, editTransfer } = require('../controller/transferController');

const router = require('express').Router();

router.post('/', addTransfer);
router.delete('/:id', removeTransfer);
router.patch('/:id', editTransfer);

module.exports = router