import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-candidatelist',
  templateUrl: './candidatelist.component.html',
  styleUrls: ['./candidatelist.component.css']
})
export class CandidatelistComponent implements OnInit {
  userItem: any;
  fileName= 'Job_Applicants_list.xlsx';
  constructor(private router:Router,private _auth:AuthService,private http: HttpClient,) { }

  ngOnInit(): void {
    let user_email: any = localStorage.getItem("user_email");
    console.log(user_email);
    
      this._auth.getApplicants(user_email).subscribe((data) => {
        this.userItem = JSON.parse(JSON.stringify(data));
        console.log(this.userItem);
      });
  }
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }

}
