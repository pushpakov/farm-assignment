const { findOne } = require("../models/organisationModel")
const organizationModel = require("../models/organisationModel")
const isValidString = function (x) {
    if (typeof x === 'undefined' || x === null) return false
    if (typeof x != "string" ) return false
    if (typeof x === 'string' && x.trim().length === 0) return false
    return true
}

const createOrganization = async function(req,res){
    try{
        let body = req.body
        const{organizationName,headquarter,Founded,CropList,organizationLogo} = body
        if(!organizationName)  return res.status(400).send({status:false, msg:"Name is required"})
        if(!isValidString(organizationName))  return res.status(400).send({status:false, msg:"Name is not in the valid formate"})

        if(!headquarter)  return res.status(400).send({status:false, msg:"headquarter is required"})
        if(!isValidString(headquarter))  return res.status(400).send({status:false, msg:"headquarter is not in the valid formate"})

        if(!Founded)  return res.status(400).send({status:false, msg:"Founded is required"})
        if(!isValidString(Founded))  return res.status(400).send({status:false, msg:"Founded is not in the valid formate"})

        if(!CropList)  return res.status(400).send({status:false, msg:"CropList is required"})
        if(!isValidString(CropList))  return res.status(400).send({status:false, msg:"CropList is not in the valid formate"})
        body.CropList = CropList.split(",")
        if(!organizationLogo)  return res.status(400).send({status:false, msg:"organizationLogo is required"})
        if(!isValidString(organizationLogo))  return res.status(400).send({status:false, msg:"organizationLogo is not in the valid formate"})

        let data = await organizationModel.create(body)
        return res.status(201).send({status:true, msg:data})
    }catch(error){
        return res.status(500).send({status:false, msg:error.message})
    }
}

const updateCropList = async function(req,res){
    try{
       let body = req.body
       let param = req.params.organizationId
       let findOrganization = await organizationModel.findOne({_id:param})
       let prevArray = findOrganization.CropList
       let newArray = body.CropList.split(",")
       findOrganization.CropList = prevArray.concat(newArray)
       
       let updatedData = await organizationModel.findByIdAndUpdate({_id:param},findOrganization,{new:true})
       return res.status(200).send({status:true, msg:updatedData})
    }catch(error){
       return res.status(500).send({status:false, msg:error.message})
    }
}   

module.exports.createOrganization = createOrganization
module.exports.updateCropList = updateCropList