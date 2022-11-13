let { hash, passCheck } = require('./../helper/PasswordHash')
const User = require('../models/user.model.js');
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
  