const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/api/items')
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const requireAuth = require('../../middleware/requireAuth')

router.post('/:id/items', ensureLoggedIn, requireAuth.requireAdmin, itemsCtrl.create)
router.delete('/:id/items/:itemId', ensureLoggedIn, requireAuth.requireAdmin, itemsCtrl.delete)

module.exports = router