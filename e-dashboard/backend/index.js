const express = require("express");
const cors = require('cors');
require('./db/config');
const User = require("./db/User");
const Product = require('./db/Products');
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register",async (req,resp)=>{
   let user = new User(req.body);//DB me dalenge
   let result = await user.save();//ye bhi DB me
   result = result.toObject();
   delete result.password
   resp.send(result)//node me dalenge
})

app.post("/add-product",async (req,resp)=>{
   let product = new Product(req.body);//DB me dalenge
   let result = await product.save();//ye bhi DB me
   resp.send(result)//node me dalenge
})

app.get("/products",async (req,resp)=>{
   let products = await Product.find();
   if(products.length>0){
      resp.send(products)
   }else{
      resp.send({result:"No products found"})
   }
})
app.delete("/product/:id",async(req,resp)=>{
   const result = await Product.deleteOne({_id:req.params.id})
   resp.send(result);
});

app.get("/product/:id", async (req,resp)=>{
   let result = await Product.findOne({_id:req.params.id});
   if(result){
      resp.send(result)
   }else{
      resp.send({result:"no record found"})
   }
})

app.put("/product/:id",async (req,resp)=>{
   let result = await Product.updateOne(
      {_id:req.params.id},
      {
         $set : req.body
      }
   )
   resp.send(result)
});
 
app.get("/search/:key",async (req,resp)=>{
   let result = await Product.find({
      "$or":[
         {name: {$regex: req.params.key}},
         {company: {$regex: req.params.key}},
         {category: {$regex: req.params.key}}
      ]
   });
   resp.send(result)
});

app.post("/login",async (req,resp)=>{
   console.log(req.body)
   if(req.body.password && req.body.email){
      let user = await User.findOne(req.body).select("-password");//server me password show nhi hona chahiye
      if(user){
         //agr DB me wo user hai to server pr data send kro
         resp.send(user)
      }else{
         resp.send({result:"no found"})
      }
   }else{
      resp.send({result:"no found"})
   }
   
})

app.listen(5000);
