const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,15}$/
const isValidString = function (x) {
    if (typeof x === 'undefined' || x === null) return false
    if (typeof x != "string" ) return false
    if (typeof x === 'string' && x.trim().length === 0) return false
    return true
}

const signUp = async function(req,res){
 try{
   const data = req.body
   const {name, email, password} = data
   
   if(!name) return res.status(400).send({status:false, msg :"name is required"})
   if(!isValidString(name)) return res.status(400).send({status:false, msg :"name is not valid"})

   if(!email) return res.status(400).send({status:false, msg :"Email is requird"})
   if(!emailRegex.test(email)) return res.status(400).send({status:false, msg :"email is not valid"})

   if(!password) return res.status(400).send({status:false, msg :"password is required"})
   if(!passwordRegex.test(password)) return res.status(400).send({status:false, msg :"password contains At least one upper case English letter , At least one lower case English letter , least one digit , At least one special character , Minimum eight in length "})
   let salt = await bcrypt.genSalt(10)
   data.password = await bcrypt.hash(password,salt)
   
   let createdData = await userModel.create(data)
   console.log("successful")
   return res.status(201).send({status:true, msg: createdData})
 }catch(err){
    return res.status(500).send({status:false,msg:err.message})
 }
}

const login = async function(req,res){
try{
  let data = req.body
  const{email,password} = data
  if(!email) return res.status(400).send({status:false , msg: "email is required"})
  if(!emailRegex.test(email)) return res.status(400).send({status:false , msg: "email is not valid"})
  let findData = await userModel.findOne({email: email})
  if(!findData) return res.status(400).send({status:false , msg: "details is not present try to SignUp"})

  if(!password) return res.status(400).send({status:false , msg: "password is required"})
  if(!passwordRegex.test(password)) return res.status(400).send({status:false , msg: "enter valid format"})
  let checkPassword = await bcrypt.compare(password,findData.password)
  if(!checkPassword) return res.status(400).send({status:false , msg: "Wrong password"})

  let payload = {
    userId: findData._id,
    exp: Math.floor(Date.now() / 1000) + 24*60 * 60,
    iat: Math.floor(Date.now() / 1000),
  };
  let JWT = jwt.sign(payload,process.env.Key)
  return res.status(200).send({
    token:JWT,
    user:findData
  })

}catch(error){
  return res.status(500).send({status:false,msg:error.message})
}
}
module.exports.signUp = signUp
module.exports.login = login