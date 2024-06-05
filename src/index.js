const express=require("express");
const app=express();
const path=require("path");
const hbs=require("hbs");
const collection=require("./mongodb")
//app.use(express.json());
const tempath=path.join(__dirname,'../templates')
console.log(tempath)
app.use(express.json())
app.set("view engine","hbs")
app.set("views",tempath)
app.use(express.urlencoded({extended:false}))
app.get("/",(req,res)=>{
    res.render("login")
})
app.get("/signup",(req,res)=>{
    res.render("signup")
})
 // when user will enter the name , password and submit on signup 
 //page the copy of details will be stored in our database 
 app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
// post -> same as action 
app.post("/signup",async(req,res)=>{
    try{
// abhi data server pe aaya fir mongodb ko dena hai 
const data={
    name: req.body.name,
    password: req.body.password
}
//data given to mongodb
let finaldata= new collection(data)
await finaldata.save();
//await collection.insertMany([data])
// after the details stored we will directed to home page 

res.render("home")
}catch(error){
    next(error);
}




//res.render("contact")
})
/*app.post("/login",async (req,res)=>{
    try{
        const check =await collection.findOne({name:req.body.name})
        if(check.password===req.body.password){
            res.status(201).render("home",{ naming : '${req.body.password}+{req.body.name}'})
        }
        else{
            res.send("wrong password")
        }
    }
    catch{
        res.send("wrong details")
    }
    
});
*/
/*app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });
        if (check.password === req.body.password) {
            res.status(201).render("home");
        } else {
            res.send("wrong password");
        }
    } catch (error){
        res.send("wrong details");
    }
});*/

app.listen(3000,()=>{
    console.log("port connected ");
})
