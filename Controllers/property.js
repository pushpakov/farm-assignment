const propertyModel = require("../models/propertyModel")

const createProperty = async function(req,res){
    try{
        let body = req.body
        let param = req.params.organizationId
        body.organizationId = param
        const{totalArea,totalRegion,totalFields} = body
        if(!param) return res.status(400).send({status:false, msg:"organizationId is required"})
        if(!totalArea) return res.status(400).send({status:false, msg:"totalArea is required"})
        if(!totalRegion) return res.status(400).send({status:false, msg:"totalRegion is required"})
        if(!totalFields) return res.status(400).send({status:false, msg:"totalFields is required"})
        let data = await propertyModel.create(body)
        return res.status(201).send({status:true, msg:data})
    }catch(error){
        return res.status(500).send({status:false, msg:error.message})
    }
}

const updateProperty = async function(req,res){
    try{
        let body = req.body
        let param = req.params.propertyId
        const{totalArea,totalRegion,totalFields} = body

        let findProperty = await propertyModel.findById({_id:param})
        if(totalArea){
            findProperty.totalArea = totalArea
        }
        if(totalRegion){
            findProperty.totalRegion = totalRegion
        }
        if(totalFields){
            findProperty.totalFields = totalFields
        }

        let updatedData = await propertyModel.findOneAndUpdate({_id:param},{findProperty},{new:true})
        return res.status(200).send({status:true, msg:updatedData})
        
    }catch(error){
        return res.status(500).send({status:false, msg:error.message})
    }
}

const filterProperty = async function(req,res){
    try{
        let filter = req.query
        let data = await propertyModel.find(filter)
        if(data.length==0) return res.status(400).send({status:false, msg:"Property is not present"})
        return res.status(200).send({status:true, msg:data})

    }catch(error){
        return res.status(500).send({status:false, msg:error.message})
    }
}

module.exports.createProperty = createProperty
module.exports.updateProperty = updateProperty
module.exports.filterProperty = filterProperty