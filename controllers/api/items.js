const Battlestation = require('../../models/battlestation')

async function create(req,res) {
    req.body.user = req.user._id
    const battlestation = await Battlestation.findById({_id: req.params.id})
    const newItemList = battlestation.items
    newItemList.push(req.body)
    await battlestation.save()
    res.json(newItemList)
}

// GUEST
async function createGuest(req,res) {
    req.body.user = req.user._id
    const battlestation = await Battlestation.findById({_id: '63f662e91b6e69d4961170b6'})
    const newItemList = battlestation.items
    newItemList.push(req.body)
    await battlestation.save()
    res.json(newItemList)
}

// GUEST
async function deleteItemGuest (req,res) {
    const filter = {_id: '63f662e91b6e69d4961170b6'}
    const update = { $pull: { items: { _id: req.params.itemId}}}
    const options = {new: true}
    const updatedBattlestation = await Battlestation.findOneAndUpdate(filter, update, options)
    res.json(updatedBattlestation)

}


async function deleteItem (req,res) {
    const filter = {_id: req.params.id}
    const update = { $pull: { items: { _id: req.params.itemId}}}
    const options = {new: true}
    const updatedBattlestation = await Battlestation.findOneAndUpdate(filter, update, options)
    res.json(updatedBattlestation)

}

// GUEST
async function updateAllPositionsGuest(req, res) {
    const battlestation = await Battlestation.findOne({_id: '63f662e91b6e69d4961170b6'})
    battlestation.items = req.body
    battlestation.save()
    const updatedItems = battlestation.items
    res.json(battlestation)
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
    createGuest,
    deleteItemGuest,
    delete: deleteItem,
    updateAllPositionsGuest,
    updateAllPositions
}