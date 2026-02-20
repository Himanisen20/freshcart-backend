const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { mongoose } = require("mongoose");
const Users = require("./model/Users");
const addproduct = require("./model/Addproduct")
const carts =require("./model/addcart")
const wishlist =require("./model/wishlist")
const category =require("./model/Addcategory")
const reviewvalue=require("./model/review")
const Address = require("./model/Address")
const order = require("./model/Order");
const Order = require("./model/Order");

const app = express();
app.use(express.json());


// middleware (ALWAYS before routes)
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mongodb..... 
// mongoose.connect("mongodb://localhost:27017/freshcart").then(
//     () => { console.log("mongoose connected") }
// ).catch((error) => {
//     console.log(error)
// })

mongoose.connect("mongodb+srv://jatin:6tCIAOaUB476kzkS@cluster0.vz6mqyn.mongodb.net/freshcart").then(
    () => { console.log("mongoose connected") }
).catch((error) => {
    console.log(error)
})


// signup route
app.post("/signup", async (req, res) => {
    console.log(req.body);
    let a = req.body.signup

    let userdata = await Users.insertOne({
        fullname: a.fullname,
        email: a.email,
        password: a.password
    })
    let result = await userdata.save();

    if (result) {
        res.json({
            status: true
        })
    } else {
        res.json({
            status: false
        })
    }
});


// login route
app.post("/login", async (req, res) => {
    console.log(req.body);
    let a = req.body.login
    let userdata = await Users.findOne({
        "email": a.email,
        "password": a.password
    })
    if (userdata) {
        res.json({
            status: true
        })
    } else {
        res.json({
            status: false
        })
    }

});

//updatepassword
app.post("/resetpassword",async(req, res) => {
  try {
    console.log(req.body);

    const { email, password } = req.body; // ✅ correct

    const updatedata = await Users.findOneAndUpdate(
      { email: email},
      { $set: { password: password } },
      { new: true }
    );
   
    if (updatedata) {
      res.json({ status: true });
    } else {
      res.json({ status: false });
    }

  } catch (error) {
    console.error(error);
    res.json({ status: false });
  }
});

//update user details
app.post("/updatecustomer",async(req,res)=>{
    console.log(req.body)

     const update = await Users.findOneAndUpdate(
      { email:req.body.formData.email},
      { $set:{fullname:req.body.formData.fullname,
        contact:req.body.formData.contact,
        address:req.body.formData.address,
        newpassword:req.body.formData.newpassword,
      } },
      { new: true }
    );
     console.log(update)
     if (update) {
      res.json({ status: true });
    } else {
      res.json({ status: false });
    }
})

 //customer--user list
app.get("/customerlist",async(req,res)=>{
    const products = await Users.find({}); // get all products
    if(products){
        res.json({
            status:true,
            allcustomer:products
        })
    }else{
         res.json({
            status:false,
            
         })
    }    
  });

//delte user account
 app.post("/deleteuser",async(req,res)=>{
    console.log(req.body)
    const userdata = await Users.findOneAndDelete({email: req.body.email,});

     if(userdata){
        res.json({
            status:true,
        })
    }else{
         res.json({
            status:false,
            
         })
    } 
   
  })


//product deatil 
app.post("/addproduct", async (req, res) => {
 
    console.log(req.body);

    const a = req.body.addproduct

    const result = await addproduct.create({
      title: a.title,
      category: a.category,
      code: a.code,
      image:a.image,
      discription: a.discription,
      status: a.status,
      weight: a.weight,
      price: a.price,
    });

   
   if (result) {
        res.json({
            status: true
        })
    } else {
        res.json({
            status: false
        })
    }
});

//get product
app.get("/products",async(req, res) => {
 const products = await addproduct.find({}); // get all products
    if(products){
        res.json({
            status:true,
            allproducts:products
        })
    }else{
         res.json({
            status:false,
            
         })
    }    
  });

  //addcart.....
  app.post("/addcart",async(req,res)=>{
    console.log(req.body)
    let a =req.body.cart
     let cartdata = await carts.insertOne({
        title: a.title,
        price: a.price,
        category: a.category,
        image: a.image
    })
    let result = await cartdata.save();
     if (result) {
        res.json({
            status: true
        })
    } else {
        res.json({
            status: false
        })
    }

   });

   //getcart data
   app.get("/addcartlist",async(req, res) => {
 const products = await carts.find({}); // get all products
    if(products){
        res.json({
            status:true,
            allcartitem:products
        })
    }else{
         res.json({
            status:false,
            
         })
    }    
  });

  //post wishlist--add data in mongo
   app.post("/wishlist",async(req,res)=>{
    console.log(req.body)
    let a =req.body.wish
     let cartdata = await wishlist.insertOne({
        title: a.title,
        price: a.price,
        category: a.category,
        image: a.image
    })
    let result = await cartdata.save();
     if (result) {
        res.json({
            status: true
        })
    } else {
        res.json({
            status: false
        })
    }

   });

   //get wishlist data in ui
   app.get("/wishlistdata",async(req, res) => {
 const products = await wishlist.find({}); // get all products
    if(products){
        res.json({
            status:true,
            allproducts:products
        })
    }else{
         res.json({
            status:false,
            
         })
    }    
  });

 //remove wishlist
 app.post("/removewish",async(req,res)=>{
    console.log(req.body)
    const products = await wishlist.findOneAndDelete({ _id: req.body.data._id });

     if(products){
        res.json({
            status:true,
        })
    }else{
         res.json({
            status:false,
            
         })
    } 
 })

 //remove cartdata
  app.post("/removecart",async(req,res)=>{
    console.log(req.body)
    const products = await carts.findOneAndDelete({ _id: req.body.data._id });

     if(products){
        res.json({
            status:true,
        })
    }else{
         res.json({
            status:false,
            
         })
    } 
 })

//updata product details
app.post("/updateproduct",async(req,res)=>{
    console.log(req.body)
     const update = await addproduct.findOneAndUpdate(
      { _id: req.body.edit._id},
      { $set:{title:req.body.edit.title,category:req.body.edit.category,code:req.body.edit.code,
        discription:req.body.edit.discription,image:req.body.edit.image,
        weight:req.body.edit.weight,price:req.body.edit.price } },
      { new: true }
    );
     if (update) {
      res.json({status:true});
    } else {
      res.json({ status:false});
    }
})

//remove item---product
app.post("/removeitem",async(req,res)=>{
    console.log(req.body)
    const item = await addproduct.findOneAndDelete({ _id: req.body.data._id});

     if(item){
        res.json({
            status:true,
        })
    }else{
         res.json({
            status:false,
            
         })
    } 
 })

//category save
app.post("/addCategory", async (req, res) => {
 console.log(req.body);
    const a = req.body.addcategory
    const result = await category.create({
      name: a.name,
      product: a.product,
      image:a.image,
      status: a.status,
    });
 if (result) {
        res.json({
            status: true
        })
    } else {
        res.json({
            status: false
        })
    }
});

//get category 
app.get("/getcategory",async(req,res)=>{
    let item =await category.find({})
     if(item){
        res.json({
            status:true,
            allcategory:item
        })
    }else{
         res.json({
            status:false,
            
         })
    } 
})

//update category
app.post("/updateCategory",async(req,res)=>{
    console.log(req.body)
     const update = await category.findOneAndUpdate(
      { _id: req.body.edit._id},
      { $set:{name:req.body.edit.name, product:req.body.edit.product,
        image:req.body.edit.image,
        status:req.body.edit.status } },
      { new: true }
    );
     if (update) {
      res.json({status:true});
    } else {
      res.json({ status:false});
    }
})

//remove category
app.post("/removecategory",async(req,res)=>{
    console.log(req.body)
    const categories = await category.findOneAndDelete({ _id: req.body.data._id});

     if(categories){
        res.json({
            status:true,
        })
    }else{
         res.json({
            status:false,
            
         })
    } 
 })


//save review data
app.post("/Review",async(req,res)=>{
    console.log(req.body)
     const a = req.body.review
    const result = await reviewvalue.create({
      reviewname:a.reviewname,
      reviewcity:a.reviewcity,
      reviewmsg:a.reviewmsg,
     productId:req.body.productId,
      reviewDate:new Date()
    });
 if (result) {
        res.json({
            status: true
        })
    } else {
        res.json({
            status: false
        })
    }
})

//get review  
app.get("/getreview",async(req,res)=>{
    let review =await reviewvalue.find({})
     if(review){
        res.json({
            status:true,
            allreview:review
        })
    }else{
         res.json({
            status:false,
            
         })
    } 
})

//removereview
 app.post("/removereview",async(req,res)=>{
    console.log(req.body)
    const review = await reviewvalue.findOneAndDelete({ _id: req.body.data._id });
if(review){
        res.json({
            status:true,
        })
    }else{
         res.json({
            status:false,
            
         })
    } 
 })

 //customer address save
 app.post("/addAddress",async(req,res)=>{
    console.log(req.body)
    let a=req.body.formData
    const data=await Address.create({
        firstname:a.firstname,
        lastname:a.lastname,
        email:a.email,
        contact:a.contact,
        address:a.address,
        city:a.city,
        state:a.state,
        zip:a.zip
    })
    if(data){
        res.json({
            status:true
        })
    }else{
        res.json({
            status:false
        })
    } 
 })

//get customer adress
app.get("/getaddress",async(req,res)=>{
    let data=await Address.find({})
     if(data){
        res.json({
            status:true,
            alldata:data
        })
    }else{
         res.json({
            status:false,
            
         })
    } 
})

//edit address details
app.post("/editAddress",async(req,res)=>{
    console.log(req.body);
    const update = await Address.findOneAndUpdate(
        { _id: req.body.edit._id},{$set:{firstname:req.body.data.firstname,
            lastname:req.body.data.lastname, address:req.body.data.address,
            city:req.body.data.city,state:req.body.data.state,
            zip:req.body.data.zip
        }},
     { new: true });
      if (update) {
      res.json({status:true});
    } else {
      res.json({ status:false});
    }
})

 //remove address detail
 app.post("/removeaddress",async(req,res)=>{
    console.log(req.body)
    const result=await  Address.findOneAndDelete({_id: req.body.data._id})
     if(result){
        res.json({
            status:true,
        })
    }else{
         res.json({
            status:false,
            
         })
    }  
 })

 //order bill
app.post("/createOrder", async (req, res) => {
  console.log(req.body);

  let items = req.body.allitem;
  let address = req.body.address;
  let totalAmount = req.body.totalAmount;
   let paymentMode = req.body.paymentMode;

  const data = await order.create({
    items: items,
    address: address,
    totalAmount: totalAmount,
    paymentMode: paymentMode
  });

  if (data) {
    res.json({
      status: true,
      message: "Order saved successfully",
    });
  } else {
    res.json({
      status: false,
    });
  }
});

//get  order bill
app.get("/getOrderBill",async(req,res)=>{
    let data =await Order.find({})
     if(data){
        res.json({
            status:true,
            alldata:data
        })
    }else{
         res.json({
            status:false,
            
         })
    } 
})

// server start (ALWAYS at bottom)
app.listen(8080, () => {
    console.log("Server start");
});








app.get('/', (req, res) => {
  res.send('Hello from backend');
});
