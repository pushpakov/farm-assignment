const mongoose = require("mongoose")

const organizationSchema = new mongoose.Schema({
    organizationName: {type:String, required:true},
    headquarter: {type:String, required:true},
    Founded: {type:String, required:true},
    CropList: [{type:String, required:true}],
    organizationLogo: {type:String, required: true}
},{timestamps : true})

module.exports = mongoose.model('Organization', organizationSchema);