const express = require('express');
const AlumniRouter = express.Router();//Creating seperate router handler
const Alumnidata = require('./../model/Alumni');

console.log("INSIDE ALUMNI JS")
const { google } = require('googleapis');

//REGISTRATION 
AlumniRouter.post('/newuser', function (req,res) {
    console.log("ARRIVEDDDDDDDD")
  
    var user = {
        firstname : req.body.user.firstName,
        lastname : req.body.user.lastName,
         user_email : req.body.user.email,
         phone_number: req.body.user.phone,
         password : req.body.user.password,
         gender : req.body.user.gender,
         dob : req.body.user.dob,
         city: req.body.user.city,
         course : req.body.user.course,
         date : req.body.user.date,
        //image:new_img
    }
  
    var usernew = new Alumnidata(user);
    usernew.save();
    
  });
  
  AlumniRouter.get('/users',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH,PUT,DELETE,OPTIONS');
    Alumnidata.find()
    .then(function (users) {
        res.send(users);
    });
  });
  //SINGLE USER ID
  AlumniRouter.get('/users/:id',  (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
      Alumnidata.findOne({"_id":id})
      .then((user)=>{
          res.send(user);
          console.log(user);
      });
  })
  //get users
  //SINGLE USER ID
  AlumniRouter.get('/getuser/:id',  (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
      Alumnidata.findOne({"user_email":id})
      .then((user)=>{
          res.send(user);
          console.log(user);
      });
  })
  //PENDING VERIFY USERS LIST
  AlumniRouter.get('/verify',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH,PUT,DELETE,OPTIONS');
    Alumnidata.find({"status":"Unapproved"})
    .then(function (users) {
        res.send(users);
    });
  });



  //UPDATE  USER
  AlumniRouter.put('/update',(req,res)=>{
    console.log("iuiiiiiiiii");
    console.log(req.body)
    id=req.body._id,
    username = req.body.username,
    user_email = req.body.user_email,
    phone_number = req.body.phone_number,
    user_status = "Approved"
      Alumnidata.findByIdAndUpdate({"_id":id},
                                {$set:{"username":username,
                                "user_email":user_email,
                                "phone_number":phone_number,
                                "status":user_status
                               
                                }})
   .then(function(){
       res.send();
   })
   
  
  })
  
  
 
AlumniRouter.delete('/remove/:id',(req,res)=>{
   
    id = req.params.id;
    Alumnidata.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  });

//edituserdetails JobpostForm
//UPDATE  USER
AlumniRouter.put('/edituserdetails',(req,res)=>{
  console.log("ityyyy");
  console.log(req.body)
  id=req.body._id,
  firstname = req.body.firstname,
  lastname = req.body.lastname,
  user_email = req.body.user_email,
  phone_number = req.body.phone_number,
 dob = req.body.str,
 city = req.body.city,
 course = req.body.course
//  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Alumnidata.findByIdAndUpdate({"_id":id},
                              {$set:{"firstname":firstname,
                              "user_email":user_email,
                              "phone_number":phone_number,
                              "lastname":lastname,
                              "dob":dob,
                              "city":city,
                              "course":course                             
                              }})
 .then(function(){
  console.log("perfect")
     res.send();
 })
// }

});
AlumniRouter.put('/resetpswd',(req,res)=>{
  
  console.log("perfect")
  console.log(req.body.job)
  id=req.body.job.userId._id;
  
  password = req.body.job.pswd.password,

 
//  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Alumnidata.findByIdAndUpdate({"_id":id},
                              {$set:{"password":password
                                                        
                              }})
 .then(function(){
  console.log("perfect")
     res.send();
 })
// }
});
module.exports = AlumniRouter;