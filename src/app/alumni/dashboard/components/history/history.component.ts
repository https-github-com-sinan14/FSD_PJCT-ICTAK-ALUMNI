import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  userItem: any;
   
user:any;
applicants: any;
orderdetails: any;
showJobs:boolean = false;
  constructor(private router:Router,private _auth:AuthService,private http: HttpClient,) { }

  ngOnInit(): void {
    let user_email: any = localStorage.getItem("user_email");
    //console.log(user_email);
    
      this._auth.gethistory(user_email).subscribe((data) => {
        this.applicants = JSON.parse(JSON.stringify(data));
      });
  }

}

