const Battlestation = require('../../models/battlestation')

async function create(req,res) {
    req.body.user = req.user._id
    const battlestation = await Battlestation.findById({_id: req.params.id})
    const newItemList = battlestation.items
    newItemList.push(req.body)
    await battlestation.save()
    res.json(newItemList)
}

async function deleteItem (req,res) {
    const filter = {_id: req.params.id}
    const update = { $pull: { items: { _id: req.params.itemId}}}
    const options = {new: true}
    const updatedBattlestation = await Battlestation.findOneAndUpdate(filter, update, options)
    res.json(updatedBattlestation)

}

async function updateAllPositions(req, res) {
    const battlestation = await Battlestation.findOne({_id: req.params.id})
    battlestation.items = req.body
    battlestation.save()
    const updatedItems = battlestation.items
    res.json(battlestation)
}

module.exports = {
    create,
    delete: deleteItem,
    updateAllPositions
}