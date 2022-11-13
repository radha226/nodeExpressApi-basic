let { hash, passCheck } = require('./../helper/PasswordHash')
const User = require('../models/user.model.js');
let { details } = require('./../helper/mailer');
var jwt = require('jsonwebtoken');
exports.login=async (req, res)=>{
    console.log(req.body)
    const user= await User.find({email:req.body.email});
    console.log(user);
    if(user.length === 0){
        return res.status(403).json({"msg":"user not found, Please Register"});
    };
    var userData =user[0];
    check=await passCheck(req.body.password,userData.password);
    console.log("check", check);
    if(!check){
        return res.status(403).json({"msg":"INVALID USER|PASSWORD"});
    }
    if(!user.is_verified){
        return res.status(403).json({"msg":"Pls Verify your email first"});
    }

    var token = jwt.sign(userData.toJSON(), 'secret');
    return res.status(200).json({"msg":"Logged In","token":token});
  };

  // Create and Save a new User
exports.create = async (req, res) => {
  console.log("erhkerjkekdjfkdfj register")
    // Validate request
    if(!req.body) {
      return res.status(400).send({
      message: "Please fill all required field"
    });
    }
    let otp=this.test(req, res);
    console.log(otp);
    // Create a new User
    };

    exports.test = async (req, res) => {
      mailData = await details(req.body.email,"Sending Email using Node.js", "yo yo yo",`Hey there! This is our first message sent with ${Math.floor(100000 + Math.random() * 900000)}`);
      console.log("mailData:", mailData);
      //  mailData ? res.json({"status":200,"message":"pls check you email for verification"}):res.json({"status":400,"message":"Unable to send message"});
  
       if(mailData ==true){
       const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        otp: req.body.otp,
        password : await hash(req.body.password),
      });
      // Save user in the database
      user.save()
        .then(data => {
        // res.send(data);
        res.json({"status":200,"message":"pls check you email for verification"})
        // res.status(200).send({})
      }).catch(err => {
        res.status(500).send({
        message: err.message || "Something went wrong while creating new user."
      });
      });
    }
      //  return mailData ? Math.floor(100000 + Math.random() * 900000) : "";
  };




  // Find a single User with a id
exports.verify= async (req, res) => {
  const user= await User.findOne({email:req.body.email});
  console.log(user);

  if(!user){
    return res.status(401).send({"message":"User not found"});
  }

  if(req.body.otp != user.opt){
    return res.status(401).send({"message":"Otp did't match"})
  }

  await User.updateOne({email:req.body.email},{is_verified:true})

  return res.status(200).send({"message":"User updated"});
}
  

    
  