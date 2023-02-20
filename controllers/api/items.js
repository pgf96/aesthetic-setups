const Battlestation = require('../../models/battlestation')

async function create(req,res) {
    console.log(req.body)
    const battlestation = await Battlestation.findById({_id: req.params.id})
    const newItemList = battlestation.items
    newItemList.push(req.body)
    await battlestation.save()
    res.json(newItemList)
}

module.exports = {
    create
}