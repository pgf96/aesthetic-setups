const Battlestation = require('../../models/battlestation')

async function index(req,res) {
    const battlestations = await Battlestation.find({approved: true})
    res.json(battlestations)
}

async function indexPending(req,res) {
    const battlestations = await Battlestation.find({approved: false})
    res.json(battlestations)
}

async function approvePending(req,res) {
    const filter = {_id: req.params.id}
    const update = {approved: true}
    const battlestation = await Battlestation.findOneAndUpdate(filter, update)
    console.log(battlestation)
    res.json(battlestation)
}


async function show(req,res) {
    try {
        const battlestation = await Battlestation.findById(req.params.id)
        res.json(battlestation)
    } catch {
    }
}

async function create (req,res) {
    const battlestation = new Battlestation(req.body)
    battlestation.save()
    res.json(battlestation)
}

async function deleteBattlestation(req,res) {
    try {
        const resp = await Battlestation.deleteOne({_id: req.params.id})
        res.json(200).send()
    } catch(error) {
        console.log(error)

    }
}

async function update (req,res) {
    const filter = {_id: req.params.id}
    const update = {items: req.body}
    const options = {new: true}
    const updatedItems = await Battlestation.findOneAndUpdate(filter, update, options)
    res.json(updatedItems)
}

async function deleteItem (req,res) {
    const itemId = req.params.itemId
    const filter = { $pull : { items: {_id: itemId }}}
    const deleted = await Battlestation.findOneAndUpdate({ $pull : { items: {_id: itemId }}})
    res.json(deleted)

}

module.exports = {
    index,
    indexPending,
    approvePending,
    create,
    show,
    delete: deleteBattlestation,
    update,
    deleteItem,
}