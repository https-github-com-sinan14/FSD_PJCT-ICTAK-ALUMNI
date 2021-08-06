import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { JobpostModel } from 'src/app/job.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jobpost',
  templateUrl: './jobpost.component.html',
  styleUrls: ['./jobpost.component.css']
})
export class JobpostComponent implements OnInit {
  minDate = new Date(2010, 4, 12); 
  JobpostForm!: FormGroup;
  submitted = false;
  oppoSuits:any
  id:any;
  jobi:string="JKY";
  idt = Math.random().toString(32).substring(2,6);
  userType: any;
  user_email:any;

  constructor(private formBuilder: FormBuilder,private authService:AuthService,public router:Router) {
    this.oppoSuits = ['Full-time', 'Part-time', 'Internship','Contract','Volunteer','Work from home']
    
  }

  
   
   
  iItem = new JobpostModel("","","","","","","","",0,"",""); //template validate
  formdata = new FormData();
  date = new Date();  
  str = this.date.toDateString();  
 
  
  ngOnInit(): void {

    this.JobpostForm = this.formBuilder.group({
      jobid: [this.jobi+this.idt, Validators.required],
      jobtitle: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      joblocation: ['', Validators.required],
      exdate: ['', Validators.required],
      qualification: ['', Validators.required],
      type: ['Select', Validators.required],
      requirements:['',Validators.required],
      nojobs: ['', Validators.required],
      description: ['', Validators.required]
      

    });
    this.userType = localStorage.getItem("userType");
    this.user_email = localStorage.getItem("user_email");
  }

  

  get f() { return this.JobpostForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.JobpostForm.invalid) {
      return;
    }
    else{

      this.authService.jobPost(this.JobpostForm.value,this.userType,this.user_email);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Successful!!!',
      showConfirmButton: false,
      timer: 3300
    })
    this.router.navigate(['Hirerhome']);

    }
    




  }
}
