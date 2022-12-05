const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId
const propertySchema = new mongoose.Schema({
    organizationId : {type:objectId, required:true},
    totalArea: {type:Number, required:true},
    totalRegion: {type:Number, required:true},
    totalFields: {type:Number, required:true}
},{timestamps:true})

module.exports = mongoose.model("Property",propertySchema)