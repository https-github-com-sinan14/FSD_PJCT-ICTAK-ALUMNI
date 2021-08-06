import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantModel } from 'src/app/alumni/dashboard/components/applicaton/applicant.model';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-applicants-list',
  templateUrl: './applicants-list.component.html',
  styleUrls: ['./applicants-list.component.css']
})
export class ApplicantsListComponent implements OnInit {
    
    user:any;
  applicants: any;
  orderdetails: any;
  showJobs:boolean = false;
  constructor(private router:Router,public _auth:AuthService,) { }

  ngOnInit(): void {
    this._auth.ViewApplicantlist().subscribe((data) =>{
      let length = (Object.keys(data).length);
     if(length != 0){
      this.showJobs=true;
    console.log("hello");
    
      this.applicants = JSON.parse(JSON.stringify(data));
     }
      console.log(this.applicants)
     
     
     
            
      })
      
      
  }
  editjob(product:any)
  {
   // localStorage.setItem("editjobId", job._id.toString());
    this._auth.editjob(product);
    
    
        // Swal.fire({
        //   position: 'top-end',
        //   icon: 'success',
        //   title: 'Done!!!',
        //   showConfirmButton: false,
        //   timer: 1500
        // })
        // this.router.navigate(['dashboard']);
    
    
   

  }
  // deletejob(product:any)
  // {
  //   this._auth.deletejob(product._id)
  //     .subscribe((data1) => {
  //       this.products = this.products.filter(p => p !== product);
  //     })
  //   }
  getProoduct(isSelected: any, product: any){
    if(isSelected){
      this._auth.fwd_applicants(product);
       Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Done!!!',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['dashboard']);
    }
    console.log(isSelected, product)
    // this.router.navigate(['/applicants_list']);
  }
  deleteEmployer(product:any)
  {
    this._auth.deleteApplicant(product._id)
      .subscribe((data2) => {
        this.applicants = this.applicants.filter(p => p !== product);
      })
    }
     

}
