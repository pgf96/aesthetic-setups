const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/api/items')
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const requireAuth = require('../../middleware/requireAuth')


// guest routes for examples
router.post('/63f662e91b6e69d4961170b6/items', ensureLoggedIn, requireAuth.requireAdminOrGuest, itemsCtrl.createGuest)
router.delete('/63f662e91b6e69d4961170b6/items/:itemId', ensureLoggedIn, requireAuth.requireAdminOrGuest, itemsCtrl.deleteItemGuest)
router.put('/63f662e91b6e69d4961170b6/items', ensureLoggedIn, requireAuth.requireAdminOrGuest, itemsCtrl.updateAllPositionsGuest)

router.post('/:id/items', ensureLoggedIn, requireAuth.requireAdmin, itemsCtrl.create)
router.delete('/:id/items/:itemId', ensureLoggedIn, requireAuth.requireAdmin, itemsCtrl.delete)
router.put('/:id/items', ensureLoggedIn, requireAuth.requireAdmin, itemsCtrl.updateAllPositions)





module.exports = router