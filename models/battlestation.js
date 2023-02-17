const mongoose = require('mongoose')
const Schema = mongoose.Schema


// embed picture

// const imageURL = new Schema({
//     url: {type: String},
// },{
//     timestamps: true
// })

const itemSchema = new Schema({
    name: {type: String},
    model: {type: String},
}, {
    timestamps: true
})



const battlestationSchema = new Schema({
    redditLink: {type: String,},
    // imageURL: [imageURL]
    redditUser: {type: String, default: 'N/A'},
    imageURL: {type: String},
    approved: {type: Boolean, default: false},
    items: [itemSchema],
    user: {type: Schema.Types.ObjectId, ref: 'User'},
} , {
    timestamps:true,
})

module.exports = mongoose.model('Battlestation', battlestationSchema)