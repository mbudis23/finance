const { addAdjustment, removeAdjustments, editAdjustment } = require('../controller/adjustmentController');
const router = require('express').Router();

router.post('/', addAdjustment);
router.delete('/:id', removeAdjustments);
router.patch('/:id', editAdjustment);

module.exports = router;