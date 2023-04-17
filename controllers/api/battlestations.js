const Battlestation = require('../../models/battlestation')

async function index(req,res) {
    const battlestations = await Battlestation.find({approved: true}).select('redditUser imageURL approved')
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
    res.json(battlestation)
}


async function show(req,res) {
    const battlestation = await Battlestation.findById(req.params.id).select('-items.user')
    res.json(battlestation)
}

async function create (req,res) {
    req.body.user = req.user._id
    const battlestation = await Battlestation.create(req.body)
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

module.exports = {
    index,
    indexPending,
    approvePending,
    create,
    show,
    delete: deleteBattlestation,
}