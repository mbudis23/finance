const { addAdjustment } = require('../controller/adjustmentController');
const router = require('express').Router();

router.post('/', addAdjustment);

module.exports = router;