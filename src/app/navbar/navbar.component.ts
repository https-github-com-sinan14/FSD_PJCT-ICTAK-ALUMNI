import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }
  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('editUserId');
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'You are Logged out',
      showConfirmButton: false,
      timer: 3300
    })
    this._router.navigate([''])
  }
  loggedUser() {
    this._router.navigate(['/add'])

  }
  display_jobs() {
    this._router.navigate([''])

  }
  usertype(){
    var ut =localStorage.getItem("userType");
    if(ut == "Admin")
    {
      this._router.navigate(['adminhome/dashboard'])
    }
    else if(ut == "Faculty")
    {
      this._router.navigate(['facultyhome/dashboard_faculty'])
    }
    else if(ut == "Employer")
    {
      this._router.navigate(['Hirerhome/dashboard_emp'])
    }
    else{
      this._router.navigate(['alumnipage/alumnidashboard'])
    }
    
  }

}
