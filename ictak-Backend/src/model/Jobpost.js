const mongoose = require('mongoose');
const { StringDecoder } = require('string_decoder');
// mongoose.connect('mongodb://localhost:27017/AlumniDb', {useNewUrlParser: true}, { useUnifiedTopology: true });
mongoose.connect('mongodb+srv://ictakalumni:ictakalumni@fsd-file.hq5hz.mongodb.net/ICTAKALUMNI?retryWrites=true&w=majority', {useNewUrlParser: true}, { useUnifiedTopology: true });
const Schema = mongoose.Schema;//To Access the schema from Mongoose package

const JobpostingSchema = new Schema({
   jobidcard : String,
    jobtitle : String,
    company:String,
    requirements:String,
    joblocation:String,
    exdate:String,
    qualification:String,
    type:String,
    nojobs:Number,
    email:String,
    description:String,
    postOwner:String,
    posted_by:String,
    status:{type: String,default: "Not Verified",required: true},
    
});

var Jobdata = mongoose.model('jobdata',JobpostingSchema);

module.exports = Jobdata;