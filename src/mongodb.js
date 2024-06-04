const mongoose = require("mongoose");
//const require =require 
mongoose.connect("mongodb://localhost:27017/logintut",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    //useCreateIndex:true
}).then(()=>{
    console.log('connection successful');


}).catch((e)=>{
    console.log('no connection',e);
})


// create schemas 
const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const collection= new mongoose.model("collection",LogInSchema);
module.exports=collection;
// given name of collection and LogInSchema is name of our schema 