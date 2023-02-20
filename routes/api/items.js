const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/api/items')

router.post('/:id/items', itemsCtrl.create)
// router.delete('/:id/items/:itemId')

module.exports = router