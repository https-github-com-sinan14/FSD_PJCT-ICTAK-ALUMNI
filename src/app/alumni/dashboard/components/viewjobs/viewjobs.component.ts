import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { JobpostModel } from 'src/app/job.model';

@Component({
  selector: 'app-viewjobs',
  templateUrl: './viewjobs.component.html',
  styleUrls: ['./viewjobs.component.css']
})
export class ViewjobsComponent implements OnInit {
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
  constructor(private router:Router,public _auth:AuthService) {
    
  }

  ngOnInit(): void {
    this._auth.Viewjobs().subscribe((data) =>{
         
      this.jobs = JSON.parse(JSON.stringify(data));
      
    });
  

   
    let jobId: any = localStorage.getItem("editjobIdt");
    
   this._auth.getjob(jobId).subscribe((data2) =>{
    
    this.jobnw = JSON.parse(JSON.stringify(data2));
       this.jobdate = this.jobnw.exdate;
   //console.log(this.jobnw.exdate);
   
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
  display(job:any)
  {
   
    localStorage.setItem("editjobIdt", job._id.toString());
    this.showjob=true;
    this.router.navigate(['job']);
    
  }
  Applyjob(job:any)
  {
 
    localStorage.setItem("JobId", job._id.toString());   
    localStorage.setItem("ApplyId", job.jobidcard); 
    this.router.navigate(['/application-form']);
    
  }

}
