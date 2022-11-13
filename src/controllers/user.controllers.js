let { hash, passCheck } = require('./../helper/PasswordHash')
var jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const { compare } = require('bcrypt');
var nodemailer = require('nodemailer');
let { details } = require('./../helper/mailer');
const { use } = require('../routes/user.routes');
// Retrieve and return all users from the database.


exports.findAll = (req, res) => {
  User.find()
    .then(users => {
    res.send(users);
  }).catch(err => {
    res.status(500).send({
    message: err.message || "Something went wrong while getting list of users."
  });
  });
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


// Create and Save a new User
exports.create = async (req, res) => {
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
exports.findOne = (req, res) => {
 User.findById(req.params.id)
  .then(user => {
  if(!user) {
   return res.status(404).send({
   message: "User not found with id " + req.params.id
 });
}
 res.send(user);
}).catch(err => {
  if(err.kind === 'ObjectId') {
    return res.status(404).send({
    message: "User not found with id " + req.params.id
  });
}
return res.status(500).send({
  message: "Error getting user with id " + req.params.id
});
});
};
// Update a User identified by the id in the request
exports.update = (req, res) => {
// Validate Request
if(!req.body) {
  return res.status(400).send({
  message: "Please fill all required field"
});
}
// Find user and update it with the request body
User.findByIdAndUpdate(req.params.id, {
  first_name: req.body.first_name,
  last_name: req.body.last_name,
  email: req.body.last_name,
  phone: req.body.last_name
}, {new: true})
.then(user => {
 if(!user) {
   return res.status(404).send({
   message: "user not found with id " + req.params.id
 });
}
res.send(user);
}).catch(err => {
if(err.kind === 'ObjectId') {
  return res.status(404).send({
  message: "user not found with id " + req.params.id
});
}
return res.status(500).send({
  message: "Error updating user with id " + req.params.id
});
});
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
User.findByIdAndRemove(req.params.id)
.then(user => {
if(!user) {
  return res.status(404).send({
  message: "user not found with id " + req.params.id
});
}
res.send({message: "user deleted successfully!"});
}).catch(err => {
if(err.kind === 'ObjectId' || err.name === 'NotFound') {
  return res.status(404).send({
  message: "user not found with id " + req.params.id
});
}
return res.status(500).send({
  message: "Could not delete user with id " + req.params.id
});
});

};