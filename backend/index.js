const express = require("express");
const app = express();
const mongoose = require("mongoose"); 

const User = require("./models/user.model");
const Product = require("./models/product.model");

app.use(express.json()) ;
app.use(express.urlencoded({extended: false}))
const bcrypt = require('bcrypt');

mongoose.connect("mongodb://localhost:27017/")
.then(() => {
  console.log("database connected successfully");
})
.catch((err) => {
  console.log( "connection to database failed",err);
}) 

       //    signup     //

app.post("/signup", async(req, res) => {
     
  try{
   const user = new User(req.body);

   if(await User.findOne({email:user.email})){
    console.log("This email already exists");
     return res.status(400).send(" This email already exists");  
   }

   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password, salt);
   
   await user.save();
   res.send("student added successfully with")
   console.log("student added successfully ")

  }catch(err){  
    console.log(err);
    res.status(400).send("student not added" ,err);
  }

});
       //     add product      //  

app.post("/addproduct", async(req, res) => { 
  try{
    const product = new Product(req.body);

    if(await Product.findOne({name:product.name})){
      console.log("This product already exists");
      return res.status(400).send(" This product already exists");
    }

    await product.save();
    res.send("product added successfully");
    console.log("product added successfully")
  }catch(err){
    console.log(err);
    res.status(400).send("product not added", err);
  }
});





app.get("/", (req, res) => {    
  res.send("hello world");  
});

app.listen(5000, () => {
  console.log("app listening at 5000 port");
});


