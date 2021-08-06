import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/admin/users.service';
import { AlumniService } from 'src/app/alumni/alumni.service';
import { AuthService } from 'src/app/auth.service';
import { EmployerService } from 'src/app/job-hirer/employer.service';
import { JobpostModel } from 'src/app/job.model';
import { AlumniModel } from 'src/app/register-alumni/alumni.model';
import { EmployerModel } from 'src/app/register-employer/employer.model';
import { UserModel } from 'src/app/register/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  gridColumns = 3;
  jobs: JobpostModel[] = [];
  length:number=0;
  length2:number=0;
  length3:number=0;
  length4:number=0;

  shownotif:boolean=false;
  shownotifuser:boolean=false;
  users: UserModel[] = [];
  alumnis: AlumniModel[] = [];
  emps: EmployerModel[] = [];

  constructor(private router:Router,public _auth:AuthService,
    private alumniservice: AlumniService,
    private empservice: EmployerService,
    private userservice: UsersService) { 
    
      
  }

  ngOnInit(): void {
   
    //COUNT OF PENDING JOB VERIFICATIONS
    this._auth.Verifyjobs().subscribe((data) =>{
      
      this.jobs = JSON.parse(JSON.stringify(data));
      
      this.length = (Object.keys(this.jobs).length);
      if(this.length != 0){
        this.shownotif = true;
      }
      else{
        this.shownotif = false;
      }
    });
    //COUNT OF PENDING USER VERIFICATION
    this.userservice.Verifyusers().subscribe((data) =>{
            
       this.users = JSON.parse(JSON.stringify(data));
       this.length2 = (Object.keys(this.users).length);
       //console.log(this.length2);
       
            
             
       })
     this.alumniservice.Verifyusers().subscribe((data1) =>{
         this.alumnis = JSON.parse(JSON.stringify(data1));
         this.length3 = this.length2 + (Object.keys(this.alumnis).length);
         //console.log(this.length3);
       
      
     })
     this.empservice.Verifyusers().subscribe((data2) =>{
      
       this.emps = JSON.parse(JSON.stringify(data2));
       this.length4 = this.length3 + (Object.keys(this.emps).length);
       //console.log(this.length4);
       
      
     //console.log(this.length4);
        if(this.length4!= 0){
         this.shownotifuser = true;
       }
       else{
         this.shownotifuser = false;
       }    
     })   
      

  }
view(){
  this._auth.Viewjobs().subscribe((data) =>{
         
    this.jobs = JSON.parse(JSON.stringify(data));
    
  });
}

}
