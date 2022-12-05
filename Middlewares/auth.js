let jwt =  require("jsonwebtoken")
let cropModel = require("../models/cropModel")
const authentication = async function(req,res,next){
    try{
        let token = req.headers.authorization

        if(!token) return res.status(403).send({status:false, msg:"token must be in the header"})
        token = token.split(" ")
        token = token[1]
        jwt.verify(token,process.env.Key,(error,decodedToken)=>{
            if(error) return res.status(401).send({status:false, msg:"you are not authenticate"})
            else{
                req.userId = decodedToken.userId
                next()
            }
        })
    }catch(error){
        return res.status(500).send({status:false, msg:error.message})
    }
}

const authorisation = async function (req, res, next) {
    try {
        let userId = req.userId
        let cropId = req.params.cropId 

        let cropData = await cropModel.findOne({ _id: cropId })
        if(!cropData) return res.status(400).send({ status: false, message: 'No crop Found with this cropId' })        
        if (cropData.userId != userId) return res.status(403).send({ status: false, message: 'Sorry you are not Authorised !!' })
            next()
        } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.authentication = authentication

module.exports.authorisation = authorisation