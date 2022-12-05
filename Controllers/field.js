const fieldModel = require("../models/fieldModel")

const createField = async function(req,res){
    try{
        let body = req.body
        const{totalArea,city,fieldType} = body
        let userId = req.params.userId
        let query = req.query

        if(!totalArea) return res.status(400).send({status:false, msg:"totalArea is required"})
        if(!city) return res.status(400).send({status:false, msg:"city is required"})
        if(!fieldType) return res.status(400).send({status:false, msg:"fieldType is required"})

        body.propertyId = query.propertyId
        body.regionId = query.regionId
        body.userId = userId
        body.fieldType = fieldType.split(",")
        
        let data = await fieldModel.create(body)
        return res.status(201).send({status:false, msg:data})
        
    }catch(error){
        return res.status(500).send({status:false, msg:error.message})
    }
}

const filterField = async function(req,res){
    try{
        let query = req.query
        let param = req.params.userId
        const{propertyId,regionId,city} = query

        let filterd = await fieldModel.find({$and:[{userId:param},{$or:[
            {propertyId:propertyId},
            {regionId:regionId},
            {city:city}
        ]}]})
        return res.status(200).send({status:false, msg:filterd})

    }catch(error){
        return res.status(500).send({status:false, msg:error.message})
    }
}

module.exports.createField = createField
module.exports.filterField = filterField