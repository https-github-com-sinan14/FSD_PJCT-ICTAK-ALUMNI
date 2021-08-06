//CREATING THE SCHEMA
export class ApplicantModel{
    constructor(
       public firstName : String,
       public lastName  : String,
        public email : String,
        public phone : Number,
        public qualifications : String,
        public experience : Number,
        public skills  : String,
        public jobId : String,
        public fileName : String
        
       
    ){}
}