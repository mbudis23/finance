const { addAdjustment, removeAdjustments } = require('../controller/adjustmentController');
const router = require('express').Router();

router.post('/', addAdjustment);
router.delete('/', removeAdjustments);

module.exports = router;