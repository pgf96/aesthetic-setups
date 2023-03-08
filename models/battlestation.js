const mongoose = require('mongoose')
const Schema = mongoose.Schema



const itemSchema = new Schema({
    name: {type: String},
    model: {type: String},
    x: {type: Number, default: 30},
    y: {type: Number, default: 30},
    dx: {type: Number, default: 120},
    dy: {type: Number, default: 60},
    width: {type: Number, default: 170},
    height: {type: Number, default: 70},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
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