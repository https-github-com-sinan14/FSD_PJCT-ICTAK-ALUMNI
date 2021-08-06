const express = require('express');
// const ProductData = require('./src/model/Productdata');
const cors = require('cors');
const Userdata = require('./src/model/Config');
const Alumnidata = require('./src/model/Alumni');
const Employerdata = require('./src/model/Employer');
const Jobdata = require('./src/model/Jobpost');

const multer = require('multer');
const path = require('path');
var bodyparser = require('body-parser');
var nodemailer = require('nodemailer');
var app = new express();
app.use(cors());
app.use(bodyparser.json());

app.use(express.static('./public')); 
//jwt npm install jsonwebtoken
const jwt = require('jsonwebtoken');



//MIDDLEWARE FUNCTION TO VERIFY TOKEN
function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1] //Authorization:`Bearer ${authservice.getToken()}` [0]->> BEARER ,[1]-->> TOKEN
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey') //Regenerating payload with token n secret key
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject   //verified
    next()
  }

  const AlumniRouter = require('./src/Routes/Alumni');
  const EmpRouter = require('./src/Routes/Employer');
  const JobRouter = require('./src/Routes/Jobposts');

  app.use('/alumni',AlumniRouter);

  app.use('/employer',EmpRouter);
  app.use('/jobs',JobRouter);

 //login
app.post('/login', async(req, res) => {
  
  let userData = req.body
  console.log(userData);
  const username1 = userData.uname;
  const password1 = userData.password;
  
     
 
     const userVal = await (Userdata).findOne({user_email : username1 });
     const userVal3 = await (Employerdata).findOne({user_email : username1 });
     const userVal2 = await (Alumnidata).findOne({user_email : username1 });

    if(userVal){
      if (!userVal) {
        res.status(401).send('Invalid Username')
      } 
               
       else if (!(userVal.password === password1)) {
        res.status(401).send('Invalid Password')
      }
      else if(userVal.status == "Unapproved"){
        res.status(404).send('Not Allowed')

      }
       else {
           //jwt token passing on successful login
        // let payload = {subject: username1+password1}
       
        userType = userVal.Role;
       user_email = userVal.user_email;
        // let payload = {subject: userVal.username+userVal.password}
        let payload ={userType:userType,username:userVal.username,user_email:userVal.user_email}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
        
      }

    }
    else if(userVal2){
      if (!userVal2) {
        res.status(401).send('Invalid Username')
      } 
               
       else if (!(userVal2.password === password1)) {
        res.status(401).send('Invalid Password')
      }
      else if(userVal2.status == "Unapproved"){
        res.status(404).send('Not Allowed')

      }
       else {
           //jwt token passing on successful login
        // let payload = {subject: username1+password1}
       
        userType = userVal2.Role;
        username = userVal2.firstname;
       user_email = userVal2.user_email;
        // let payload = {subject: userVal.username+userVal.password}
        let payload ={userType:userType,username:userVal2.firstname,user_email:userVal2.user_email}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
        
      }
    }
    else if(userVal3){
      if (!userVal3) {
        res.status(401).send('Invalid Username')
      } 
               
       else if (!(userVal3.password === password1)) {
        res.status(401).send('Invalid Password')
      }
      else if(userVal3.status == "Unapproved"){
        res.status(404).send('Not Allowed')

      }
       else {
           //jwt token passing on successful login
        // let payload = {subject: username1+password1}
       
        userType = userVal3.Role;
        user_email = userVal3.user_email;
        username = userVal3.firstname;
        // let payload = {subject: userVal.username+userVal.password}
        let payload ={userType:userType,username:userVal3.firstname,user_email:userVal3.user_email}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
        
      }
    }
    else{
      res.status(401).send('Invalid Username/Password')
    }


        
    
})


//REGISTRATION Faculty
app.post('/newuser', function (req,res) {
 
  
  var user = {
     username : req.body.user.firstName,
      user_email : req.body.user.email,
       phone_number: req.body.user.phone,
       password : req.body.user.password
      //image:new_img
  }

  var usernew = new Userdata(user);
  usernew.save();
  
});

//PENDING VERIFY USERS LIST
app.get('/verify',function(req,res){
  res.header("Access-Control-Allow-Origin","*")
  res.header('Access-Control-Allow-Methods: GET, POST, PATCH,PUT,DELETE,OPTIONS');
  Userdata.find({"status":"Unapproved"})
  .then(function (users) {
      res.send(users);
  });
});


app.get('/users',function(req,res){
  res.header("Access-Control-Allow-Origin","*")
  res.header('Access-Control-Allow-Methods: GET, POST, PATCH,PUT,DELETE,OPTIONS');
  Userdata.find()
  .then(function (users) {
      res.send(users);
  });
});
//SINGLE USER ID
app.get('/:id',  (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
    Userdata.findOne({"_id":id})
    .then((user)=>{
        res.send(user);
        console.log(user);
    });
})
//UPDATE  USER
app.put('/update', (req, res) => {
  console.log(req.body)
  id = req.body._id,
    username = req.body.username,
    user_email = req.body.user_email,
    phone_number = req.body.phone_number,
    user_status = "Approved"
  Userdata.findByIdAndUpdate({ "_id": id },
    {
      $set: {
        "username": username,
        "user_email": user_email,
        "phone_number": phone_number,
        "status": user_status

      }
    })
    .then(function () {
      res.send();
    })


})



 
app.delete('/remove/:id',(req,res)=>{
   
    id = req.params.id;
    Userdata.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  })

//MULTER
 //MULTER
 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      // cb(null, path.join('./public/img'));
      cb(null, path.join('../src/assets/img'));

  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
      //new Date().toISOString().replace(/:/g, '-') + '-' +
  }
});

const upload = multer({ storage: storage });
app.post('/file',upload.single("file"),(req,res)=>{
  // console.log(req.file);F:\FSDtraining\ALUMNI_JOB_PORTAL\AlumniJobPortal\Backend\public\img
  const file = req.file;
  
  if(file){
    //res.json(file);
    console.log("knjkbkb");

  }
  else{
    throw new Error("file upload unsuccessful im in /FILE");
  }
 })

 //get details
 //SINGLE USER ID
 app.get('/getuser/:id',  (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
    Userdata.findOne({"user_email":id})
    .then((user)=>{
        res.send(user);
        console.log(user);
    });
})
//edituserdetails JobpostForm
//UPDATE  USER
app.put('/edituserdetails',(req,res)=>{
  //console.log("ityyyy");
  //console.log(req.body)
  id=req.body._id,
  firstname = req.body.username,
   user_email = req.body.user_email,
  phone_number = req.body.phone_number,
//  dob = req.body.str,
//  city = req.body.city,
//  course = req.body.course
//  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Userdata.findByIdAndUpdate({"_id":id},
                              {$set:{"username":firstname,
                              "user_email":user_email,
                              "phone_number":phone_number,
                              // "lastname":lastname,
                              // "dob":dob,
                              // "city":city,
                              // "course":course                             
                              }})
 .then(function(){
  //console.log("perfect")
     res.send();
 })
// }

});
app.put('/resetpswd',(req,res)=>{
  
  console.log("perfect")
  console.log(req.body.job)
  id=req.body.job.userId._id;
  
  password = req.body.job.pswd.password,

 
//  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Userdata.findByIdAndUpdate({"_id":id},
                              {$set:{"password":password
                                                        
                              }})
 .then(function(){
  console.log("perfect")
     res.send();
 })
// }
});



app.listen(3000,function () {
    console.log('Listening to PORT 3000');
    
});
