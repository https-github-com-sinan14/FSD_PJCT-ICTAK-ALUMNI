import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlumniService } from 'src/app/alumni/alumni.service';
import { EmployerService } from 'src/app/job-hirer/employer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  user:any;
minDate = new Date(1980, 4, 12); 
JobpostForm!: FormGroup;
submitted = false;
formdata = new FormData();
dob = new Date();  
str = this.dob.toDateString();
  

  constructor(private http: HttpClient,private router:Router ,private empservice:EmployerService, private formBuilder: FormBuilder) {
    //this.alumni=new Alumni();
   
   }
    
  
    ngOnInit(): void {
      let userId: any = localStorage.getItem("user_email");
      this.empservice.getdetails(userId).subscribe((data) =>{
         
        this.user = JSON.parse(JSON.stringify(data));
        console.log(this.user);
        
      });
    
      this.JobpostForm = this.formBuilder.group({
        firstname: [''],
        lastname: [''],
        phone_number: [''],
        companytype: [''],
        website: [''],
        password: [''],
        user_email:[''],
        jobtitle:['']
      })
     
     
   
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    
    
    if (this.JobpostForm.invalid) {

      return;
    }
    else{
      
      
      this.empservice.updateUser(this.user);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Successful!!!',
      showConfirmButton: false,
      timer: 3300
    })
    this.router.navigate(['/dashboard_emp']);

    }
    




  }
}
