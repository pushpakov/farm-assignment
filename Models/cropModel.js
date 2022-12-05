const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const cropSchema = new mongoose.Schema({

    userId: {
        type: ObjectId,
        required: true
    },
    commonName: {
        type: String,
        required: true
    },
    specialName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    family: {
        type: String,
        required: true
    },
    cropCycle: {
        type: String,
        required: true
    },
    fertilisers: [{ type: String, required: true }],
    isDelete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Crop', cropSchema);