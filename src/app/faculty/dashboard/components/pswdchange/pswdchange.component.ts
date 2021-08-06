import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlumniService } from 'src/app/alumni/alumni.service';
import { AuthService } from 'src/app/auth.service';
import { MustMatch } from 'src/app/register-alumni/mustmatch';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pswdchange',
  templateUrl: './pswdchange.component.html',
  styleUrls: ['./pswdchange.component.css']
})
export class PswdchangeComponent implements OnInit {
  userId:any;
  user:any;
   submitted = false;
 
  user_id:any;
   registerForm!: FormGroup;
 
 
   constructor(private http: HttpClient, private router: Router, private alumniservice: AuthService, private formBuilder: FormBuilder) {
     //this.alumni=new Alumni();
 
   }
 
 
   ngOnInit(): void {
     let userId: any = localStorage.getItem("user_email");
     this.alumniservice.getdetails(userId).subscribe((data) =>{
          
       this.user = JSON.parse(JSON.stringify(data));
       console.log(this.user);
       
     });
     
     this.registerForm = this.formBuilder.group({
       password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
 
       confirmPassword: ['', Validators.required]
     }, {
       validator: MustMatch('password', 'confirmPassword')
     });
   }
   get f() { return this.registerForm.controls; }
 
   onSubmit() {
     this.submitted = true;
     // stop here if form is invalid
     if (this.registerForm.invalid) {
       return;
     }
     else {
       let userId: any = localStorage.getItem("user_email");
       console.log("ggggg");
       console.log(userId);
       
       
       this.alumniservice.resetpswd(this.registerForm.value,this.user);
       Swal.fire({
         position: 'top-end',
         icon: 'success',
         title: 'Successful!!!',
         showConfirmButton: false,
         timer: 3300
       })
       this.router.navigate(['/facultyhome']);
 
     }
   }
 
 

}
