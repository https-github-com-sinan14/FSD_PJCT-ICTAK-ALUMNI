const mongoose = require('mongoose');
const { StringDecoder } = require('string_decoder');
mongoose.connect('mongodb://localhost:27017/AlumniDb', {useNewUrlParser: true}, { useUnifiedTopology: true });

const Schema = mongoose.Schema;//To Access the schema from Mongoose package

const JobApplicantSchema = new Schema({
    jobId :{type: String, ref: "jobdata"},
    Applicantfname:String,
    Applicantlname:String,
    applicant_email:String,
    phone:Number,
    qualifications:String,
    experience:Number,
    skills:String,
    resume:String,
    status:{type: String,default: "Not Verified",required: true},
    hirer_name:{type: String,default: "Not Applicable",required: true},
    
});

var Applicantdata = mongoose.model('Applicantdata',JobApplicantSchema);

module.exports = Applicantdata;
