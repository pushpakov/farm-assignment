const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId
const fieldSchema = new mongoose.Schema({
    propertyId: {type:objectId, required:true},
    regionId : {type:objectId, required:true},
    userId: {type:objectId, required:true},
    totalArea: {type:Number, required:true},
    city: {type:String, required:true},
    fieldType: [{type:String, required:true}],
},{timestamps : true})

module.exports = mongoose.model('Field', fieldSchema);