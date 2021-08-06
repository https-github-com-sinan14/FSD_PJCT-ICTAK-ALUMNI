const mongoose = require('mongoose');
const { StringDecoder } = require('string_decoder');
mongoose.connect('mongodb+srv://ictakalumni:ictakalumni@fsd-file.hq5hz.mongodb.net/ICTAKALUMNI?retryWrites=true&w=majority', {useNewUrlParser: true}, { useUnifiedTopology: true });
//'mongodb://localhost:27017/AlumniDb'
const Schema = mongoose.Schema;//To Access the schema from Mongoose package

const LoginSchema = new Schema({
    username : String,
    user_email :{type: String,unique : true,dropDups: true},
    password : String,
    phone_number : {type:String,unique : true,dropDups: true},
    role : {type: Number,default: 0,required: true} ,
    status:{type: String,default: "Unapproved",required: true},
    Role : {type: String,default: "Faculty",required: true}
   
    

});//structure saved to db
//Model Creation----->Each Model is instance of Document
var Userdata = mongoose.model('User',LoginSchema);
module.exports = Userdata;