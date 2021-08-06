const express = require('express');
const JobRouter = express.Router();//Creating seperate router handler
const Jobdata = require('./../model/Jobpost');
const Applicantdata = require('./../model/Job-Apply');
module.exports = {
  Applicantdata: require("./../model/Job-Apply"),
  Jobdata: require("./../model/Jobpost")
};

//JOB POSTING

JobRouter.post('/jobposting', function (req, res) {


  var jobs = {
    jobidcard: req.body.job.jobid,
    jobtitle: req.body.job.jobtitle,
    company: req.body.job.company,
    requirements: req.body.job.requirements,
    joblocation: req.body.job.joblocation,
    exdate: req.body.job.exdate,
    qualification: req.body.job.qualification,
    type: req.body.job.type,
    nojobs: req.body.job.nojobs,
    email: req.body.job.email,
    description: req.body.job.description,
    postOwner: req.body.user_email,
    posted_by: req.body.userType

  }

  var jobnew = new Jobdata(jobs);
  jobnew.save();

});
  
  //GET JOB POSTS
  JobRouter.get('/viewjobs',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH,PUT,DELETE,OPTIONS');
    Jobdata.find({ status : "Verified"})
    .then(function (jobs) {
        res.send(jobs);
    });
  });
      
  //GET LIST OF NOT VERIFIED JOB POSTS
JobRouter.get('/jobverify', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods: GET, POST, PATCH,PUT,DELETE,OPTIONS');
  Jobdata.find({ "status": "Not Verified" })
    .then(function (jobs) {
      res.send(jobs);
    });
});

//Verification
//UPDATE  USER
JobRouter.put('/update', (req, res) => {

  console.log(req.body._id)
  id = req.body._id,

    job_status = "Verified"
  Jobdata.findByIdAndUpdate({ "_id": id },
    {
      $set: {
        "status": job_status
      }
    })
    .then(function () {
      res.send();
    })
})


//SINGLE USER ID
JobRouter.get('/users/:id', (req, res) => {

  const id = req.params.id;
  console.log(req.params.id);
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Jobdata.findOne({ "_id": id })
      .then((job) => {
        res.send(job);

      });
  }
})
/////////////DElete
JobRouter.delete('/remove/:id',(req,res)=>{
   
  id = req.params.id;
  Jobdata.findByIdAndDelete({"_id":id})
  .then(()=>{
      console.log('success')
      res.send();
  })
});

//*****************Applicantsdata************************ *//
JobRouter.post('/applicants-new', function (req,res) {
 
  console.log("HELLO INSIDE APPLICANT")
  console.log(req.body.job);
  var applicants = {
     jobId : req.body.job.jobitem3,
    // jobtitle: req.body.job.jobtitle,
    skills: req.body.job.jobitem2.skills,
    experience: req.body.job.jobitem2.experience,
    qualifications: req.body.job.jobitem2.qualifications,
    Applicantfname: req.body.job.jobitem.firstCtrl,
    Applicantlname: req.body.job.jobitem.lastName,
    applicant_email: req.body.job.jobitem.email,
    phone:req.body.job.jobitem.phone,
    resume:req.body.job.jobitem4
 
  }
console.log(applicants);
  var applicantnew = new Applicantdata(applicants);
  applicantnew.save();
  
});

//GET JOB POSTS
JobRouter.get('/applicantlist',function(req,res){
  res.header("Access-Control-Allow-Origin","*")
  res.header('Access-Control-Allow-Methods: GET, POST, PATCH,PUT,DELETE,OPTIONS');
    //******************JOIN OPERATIONS********************/

  Applicantdata.aggregate([
    { $match : { status : "Not Verified" } },
    { $lookup:
      
       {
         from: 'jobdatas',
         localField: 'jobId',
         foreignField: 'jobidcard',
         as: 'orderdetails',
         
       },
       
     },
     { $sort : { jobId : 1,_id: 1 } },
    //  { "$group": {
    //            "_id": "$orderdetails.jobtitle",
              
    //         }}
     {
      "$unwind": "$orderdetails",
  },
    //{"$group": {"_id": {"jobId": "$jobId"}}},
    ]).exec(function(err, result) {
    if (err) throw err;
    if(result){
      // console.log(JSON.stringify(res));
      console.log(JSON.stringify(result))
      res.send(result)
    }
    
   
  });
});
  //**********UPDATE APPLICANTS N FWD**************/
  //UPDATE  USER
  JobRouter.put('/fwd_applicants', (req, res) => {
    // console.log(req.body)
    console.log(`HW\FDDDDDDDDDDDDDDDD${req.body._id}`)
    id = req.body._id,
      console.log(req.body.orderdetails.postOwner);
    hirer_name = req.body.orderdetails.postOwner;

    job_status = "Verified"
    Applicantdata.findByIdAndUpdate({ "_id": id },
      {
        $set: {
          "status": job_status,
          "hirer_name": hirer_name
        }
      })
      .then(function () {
        res.send();
      })
  })
  



 //SINGLE USER ID
 JobRouter.get('/get_list/:user_email',  (req, res) => {
  console.log(req.params.user_email);
  const email = req.params.user_email;
  Applicantdata.find({"hirer_name":email})
  .then(function (users) {
    console.log(JSON.stringify(users))
      res.send(users);
  });
});

JobRouter.delete('/remove-applicant/:id',(req,res)=>{
   
  id = req.params.id;
  Applicantdata.findByIdAndDelete({"_id":id})
  .then(()=>{
      console.log('success')
      res.send();
  })
});

//SINGLE USER ID
JobRouter.get('/applied-jobs/:user_email',  (req, res) => {
  console.log(req.params.user_email);
  const email = req.params.user_email;
  // Applicantdata.find({"applicant_email":email})
  // .then(function (users) {
  //   console.log(JSON.stringify(users))
  //     res.send(users);
  // });
  Applicantdata.aggregate([
    { $match : { applicant_email : email } },
    { $lookup:
      
       {
         from: 'jobdatas',
         localField: 'jobId',
         foreignField: 'jobidcard',
         as: 'orderdetails',
         
       },
       
     },
     { $sort : { jobId : 1,_id: 1 } },
    //  { "$group": {
    //            "_id": "$orderdetails.jobtitle",
              
    //         }}
     {
      "$unwind": "$orderdetails",
  },
    //{"$group": {"_id": {"jobId": "$jobId"}}},
    ]).exec(function(err, result) {
    if (err) throw err;
    if(result){
      // console.log(JSON.stringify(res));
      console.log(JSON.stringify(result))
      res.send(result)
    }
    
   
  });
});
module.exports = JobRouter;
