const cropModel = require("../models/cropModel")
const isValidString = function (x) {
    if (typeof x === 'undefined' || x === null) return false
    if (typeof x != "string" ) return false
    if (typeof x === 'string' && x.trim().length === 0) return false
    return true
}

const createCrop = async function(req,res){
    try{
        const body = req.body
        const params = req.params.userId
        body.userId = params
        const{commonName,specialName,category,family,cropCycle} = body
        if(!params)  return res.status(400).send({status:true, msg:"userId is required"})

        if(!commonName) return res.status(400).send({status:true, msg:"commonName is required"})
        if(!isValidString(commonName))return res.status(400).send({status:false, msg:"commonName is not in the valid formate"})

        if(!specialName) return res.status(400).send({status:true, msg:"specialName is required"})
        if(!isValidString(specialName))return res.status(400).send({status:false, msg:"specialName is not in the valid formate"})

        if(!category) return res.status(400).send({status:true, msg:"category is required"})
        if(!isValidString(category))return res.status(400).send({status:false, msg:"category is not in the valid formate"})

        if(!family) return res.status(400).send({status:true, msg:"family is required"})
        if(!isValidString(family))return res.status(400).send({status:false, msg:"family is not in the valid formate"})

        if(!cropCycle) return res.status(400).send({status:true, msg:"cropCycle is required"})
        if(!isValidString(cropCycle))return res.status(400).send({status:false, msg:"cropCycle is not in the valid formate"})

        let data = await cropModel.create(body)
        return res.status(201).send({status:true, msg:data})

    }catch(error){
        return res.status(500).send({status:false, msg:error.message})
    }
}

const filterCrop = async function(req,res){
    try{
        let filter = req.query
        let data = await cropModel.find(filter)
        if(data.length==0) return res.status(400).send({status:false, msg:"crop is not present"})
        return res.status(200).send({status:true, msg:data})
    }catch(error){
        return res.status(500).send({status:false, msg:error.message})
    }
}

const updateCrop = async function(req,res){
    try{
        let body = req.body
        let param = req.params.cropId
        const {cropCycle,fertilisers} = body
        let findCrop = await cropModel.findOne({_id:param})
        if(!findCrop) return res.status(400).send({status:false, msg:"crop is not find"})
        if(cropCycle) findCrop.cropCycle = cropCycle
        if(fertilisers){
           if(!findCrop.fertilisers.includes(fertilisers)){
               findCrop.fertilisers.push(fertilisers)
           }
        }
        
        let updated = await cropModel.findOneAndUpdate({_id:param} , findCrop , {new:true})
        return res.status(200).send({status:true, msg:updated})

    }catch(error){
        return res.status(500).send({status:false, msg:error.message})
    }
}

const deleteCrop = async function(req,res){
    try{
        let param = req.params.cropId
        let data = await cropModel.findOneAndUpdate({_id:param}, {isDelete:true}, {new:true})
        return res.status(200).send({status:true, msg:data})
    }catch(error){
        return res.status(500).send({status:false, msg:error.message})
    }
}

module.exports.createCrop = createCrop
module.exports.filterCrop = filterCrop
module.exports.updateCrop = updateCrop
module.exports.deleteCrop = deleteCrop