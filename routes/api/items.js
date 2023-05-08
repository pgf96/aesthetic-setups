const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/api/items')
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const requireAuthZ = require('../../middleware/requireAuthZ')


// guest routes for examples
router.post('/63f662e91b6e69d4961170b6/items', ensureLoggedIn, requireAuthZ.requireAdminOrGuest, itemsCtrl.createGuest)
router.delete('/63f662e91b6e69d4961170b6/items/:itemId', ensureLoggedIn, requireAuthZ.requireAdminOrGuest, itemsCtrl.deleteItemGuest)
router.put('/63f662e91b6e69d4961170b6/items', ensureLoggedIn, requireAuthZ.requireAdminOrGuest, itemsCtrl.updateAllPositionsGuest)

router.post('/:id/items', ensureLoggedIn, requireAuthZ.requireAdmin, itemsCtrl.create)
router.delete('/:id/items/:itemId', ensureLoggedIn, requireAuthZ.requireAdmin, itemsCtrl.delete)
router.put('/:id/items', ensureLoggedIn, requireAuthZ.requireAdmin, itemsCtrl.updateAllPositions)





module.exports = router