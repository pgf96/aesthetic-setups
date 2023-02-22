const express = require('express');
const router = express.Router();
const battlestationsCtrl = require('../../controllers/api/battlestations')
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const { requireAdmin } = require('../../middleware/requireAuth')

router.get('/', battlestationsCtrl.index)
router.get('/:id', battlestationsCtrl.show)
router.get('/pending', ensureLoggedIn , requireAdmin, battlestationsCtrl.indexPending)
router.put('/pending/:id',  ensureLoggedIn , requireAdmin, battlestationsCtrl.approvePending)
router.delete('/:id', ensureLoggedIn , requireAdmin, battlestationsCtrl.delete)
router.post('/', ensureLoggedIn,  battlestationsCtrl.create)


module.exports = router