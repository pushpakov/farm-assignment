const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId
const regionSchema = new mongoose.Schema({
    organizationId: {
        type: objectId,
        required: true
    },
    propertyId: {
        type: objectId,
        required: true
    },
    cities: [{ type: String, required: true }],
    totalFields: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Region", regionSchema)