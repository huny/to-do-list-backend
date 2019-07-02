const mongoose = require('mongoose')
const Schema = mongoose.Schema

let FriendRequestSchema = new Schema({
    requesterId: {
        type: String,
        required: true
    },
    requesterName: {
        type: String,
        default: ''
    },
    recipientId: {
        type: String,
        required: true
    },
    recipientName: {
        type: String,
        required: true
    },
    status: {
        type: Number, //1= requested, 2=accepted, 3=rejected
        required: true
    }
});

mongoose.model('FriendRequest', FriendRequestSchema)