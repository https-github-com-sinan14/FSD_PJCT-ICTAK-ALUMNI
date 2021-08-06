import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobpostModel } from 'src/app/job.model';
import Swal from 'sweetalert2';
import { ApplicantModel } from './applicant.model';

@Component({
  selector: 'app-applicaton',
  templateUrl: './applicaton.component.html',
  template: `<script src="/assets/js/progressivebars.js"></script>`,
  styleUrls: ['./applicaton.component.css']
})
export class ApplicatonComponent implements OnInit {
  applicantItem: ApplicantModel[] = [];
  title:String = "You are applying for";
  job:any
  job2:any
  jobnw:any;
  showjob:boolean = false;

  submitted = false;
  finalPostArray = [];
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  formJoin!: FormGroup;
  isOptional = false;
  firstCtrl:String;
  lastName:String;
  phone:String;
  email:String;
  qualifications:String;
  skills:String;
  experience:String;
  secondCtrl:String;
  jobId: any 
  showid:any;
  file:any
  filename :any
  url =""
  image: any;
  private FAKE_SERVICE_URL ="/api/"
  constructor(private router:Router,public _auth:AuthService, private http: HttpClient,private formBuilder: FormBuilder) {
  let applicantItem = new ApplicantModel("","","",0,"",0,"","",""); //template validate
  
    this.firstCtrl="";
    this.lastName="";
    this.email="";
    this.phone="";
    this.secondCtrl="";
    this.qualifications="";
    this.skills="";
    this.experience="";
    
    this.showid = localStorage.getItem("ApplyId");
    
  }
  ngOnInit(): void {
    
    this.jobId = localStorage.getItem("jobId");
  

    this._auth.getjob(this.jobId).subscribe((data2) => {

      this.jobnw = JSON.parse(JSON.stringify(data2));
      console.log(this.jobnw);

    });
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
      lastName: ['', Validators.required],
      phone:['',[Validators.required,Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)]],
      email: ['',[Validators.required,Validators.email]],
          
    });
    this.secondFormGroup = this.formBuilder.group({
      
      secondCtrl: [''],
      qualifications: ['', Validators.required],
      skills: ['', Validators.required],
      experience: ['', [Validators.required,Validators.pattern("^[0-9]*$"), Validators.maxLength(2)]]
    });
  }
  get f() { return this.firstFormGroup.controls; }
  get g() { return this.secondFormGroup.controls; }
  onSubmit() {
    this.submitted = true;
   
    // stop here if form is invalid
    if (this.firstFormGroup.invalid) {
      return;
    }
  }
  onSubmit2() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.secondFormGroup.invalid) {
      return;
    }
  }
    jobsubmit(){
      const formdata = new FormData();
  formdata.append('file', this.file);

  this.http.post("http://localhost:3000/file", formdata).subscribe((d) => {
    console.log(d);
  });    

    this.image=this.filename;
    console.log(this.image);
      this.jobId = localStorage.getItem("ApplyId");
  this._auth.Apply_job(this.firstFormGroup.value,this.secondFormGroup.value,this.jobId,this.image);
     
      
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Completed Application Process',
      showConfirmButton: false,
      timer: 3300
    })
    this.router.navigate(['/alumnipage']);
  }

 //image upload
 upload(event: any) {
 
  this.file = event.target.files[0];
                  if (event.target.files) {
                    var reader = new FileReader()
                    reader.readAsDataURL(event.target.files[0])
                    reader.onload = (event: any) => {
                      this.url = event.target.result
                    }
                  }

  this.filename = event.target.files[0].name;
  console.log(this.filename);
  
 

}

}
  
 
    




  

