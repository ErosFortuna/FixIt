const express = require('express');
const asyncHandler = require('../middleware/asyncHandler');
const controller = require('../controllers/orderController');
const router = express.Router();
router.get('/', asyncHandler(controller.listClaims));
module.exports = router;
