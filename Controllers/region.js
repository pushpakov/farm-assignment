const regionModel = require("../models/regionModel")

const createRegion = async function(req,res){
    try{
        let body = req.body
        let query = req.query
        let param = req.params.propertyId

        const{cities} = body
        if(!cities) return res.status(400).send({status:false, msg:"cities is required"})
        body.organizationId = query.organizaionId
        body.propertyId = param
        body.cities = body.cities.split(",")    
        body.totalFields = body.cities.length
        let data = await regionModel.create(body)
        return res.status(201).send({status:true, msg:data})

    }catch(error){
        return res.status(500).send({status:false, msg:error.message})
    }
}

const updateRegion = async function(req,res){
    try{
        let body = req.body
        let param = req.params.regionId
        let cities = body.cities.split(",")
        let findRegion = await regionModel.findById({_id:param})
        for(let i=0; i<cities.length; i++){
            if(!findRegion.cities.includes(cities[i]))
            findRegion.cities.push(cities[i])
        }
        findRegion.totalFields = findRegion.cities.length
        let updatedData = await regionModel.findByIdAndUpdate({_id:param},findRegion,{new:true})
        return res.status(200).send({status:true, msg:updatedData})
         
    }catch(error){
        return res.status(500).send({status:false, msg:error.message})
    }
}

const listRegion = async function(req,res){
    try{
        let query = req.query
        const{organizationId , regionId , propertyId} = query
        let data = await regionModel.find({
            $or:[{propertyId:propertyId},
                 {organizationId:organizationId},
                 {_id: regionId}]})
        return res.status(200).send({status:true, msg:data})
    }catch(error){
        return res.status(500).send({status:false, msg:error.message})
    }
}

module.exports.createRegion = createRegion
module.exports.updateRegion = updateRegion
module.exports.listRegion = listRegion