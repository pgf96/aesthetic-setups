const express = require('express');
const router = express.Router();
const battlestationsCtrl = require('../../controllers/api/battlestations')
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const requireAuth = require('../../middleware/requireAuth')
// const requireAdmin = requireAuth.requireAdmin()

// battlestations ctrl


// all approved battlestations
router.get('/', battlestationsCtrl.index)
router.get('/pending', ensureLoggedIn , requireAuth.requireAdmin, battlestationsCtrl.indexPending)
router.get('/:id', battlestationsCtrl.show)
router.put('/:id', battlestationsCtrl.update)
router.put('/:id/items/:itemId', battlestationsCtrl.deleteItem)
router.delete('/:id', ensureLoggedIn , requireAuth.requireAdmin, battlestationsCtrl.delete)
router.post('/',  battlestationsCtrl.create)




module.exports = router