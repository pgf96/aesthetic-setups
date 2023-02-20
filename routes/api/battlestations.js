const express = require('express');
const router = express.Router();
const battlestationsCtrl = require('../../controllers/api/battlestations')
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const requireAuth = require('../../middleware/requireAuth')

router.get('/', battlestationsCtrl.index)
router.get('/pending', ensureLoggedIn , requireAuth.requireAdmin, battlestationsCtrl.indexPending)
router.get('/:id', battlestationsCtrl.show)
router.put('/pending/:id', battlestationsCtrl.approvePending)
router.delete('/:id', ensureLoggedIn , requireAuth.requireAdmin, battlestationsCtrl.delete)
router.post('/',  battlestationsCtrl.create)


module.exports = router