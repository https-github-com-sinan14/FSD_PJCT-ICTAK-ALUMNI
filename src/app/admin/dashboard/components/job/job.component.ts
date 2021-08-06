import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { JobpostModel } from 'src/app/job.model';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  jobs: JobpostModel[] = [];
  title:String = "Verify Jobs";
  job:any
  job2:any
  jobnw:any;
  showjob:boolean = false;
  myDate = new Date();
  currentDate:any= new Date();
  diff:any;
  jobdate:any;
  disable_btn:boolean = false;
name:any;
  
  constructor(private router:Router,public _auth:AuthService, private http: HttpClient) {}
  ngOnInit(): void {
    let jobId: any = localStorage.getItem("editjobIdt");
    // this._auth.Viewjobs().subscribe((data) =>{
         
    //   this.jobs = JSON.parse(JSON.stringify(data));
      
    // });
  
   
    this._auth.getjob(jobId).subscribe((data2) =>{
     
     this.jobnw = JSON.parse(JSON.stringify(data2));
        this.jobdate = this.jobnw.exdate;
    this.diff =  Math.ceil(( Date.parse(this.jobdate) - Date.parse(this.currentDate) ) / 86400000);
    if(this.diff < 0){
      this.diff = 0;
      this.disable_btn = false;
      console.log("dis btn");
      
    }
    else{
      this.disable_btn = true;
      console.log("allw btn");
    }
   
    
   
  });
  }
  Applyjob(job:any)
  {
 
    this.name=localStorage.setItem("JobId", job._id.toString());   
    localStorage.setItem("ApplyId", job.jobidcard); 
    this.router.navigate(['/application-form']);
    
  }

}
