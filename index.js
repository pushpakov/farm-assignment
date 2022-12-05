const express=require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const route=require("./route/route")
const app=express()
const cors=require("cors")
const passport=require('passport') 
const session=require('express-session')
require("./passportSetup")

app.use(session({secret:"FUAssignment"}))
app.use(passport.initialize());
app.use(passport.session()); 

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


const clusterLink="mongodb+srv://samirlohiya909:Lohiya123@samirlohiya.nszppy8.mongodb.net/school-management?retryWrites=true&w=majority"
mongoose.connect(clusterLink,{useNewUrlParser:true})
.then(()=>console.log("MongoDB is connected"))
.catch(err=>console.log(err))


app.use("/",route)

app.listen(3000,function(){
    console.log('Express app running on port ' + 3000)
})