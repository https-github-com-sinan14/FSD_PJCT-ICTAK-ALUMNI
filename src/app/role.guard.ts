import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  jwtHelper = new JwtHelperService();
  token:any;
  constructor(
    public auth: AuthService,public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
    let userTypedata = route.data.userType as Array<string>;
    //console.log(userTypedata);let userTypedata = route.data.userType as Array<string>;
   
 
    
     this.token = localStorage.getItem('token')
    const tokenPayLoad = this.jwtHelper.decodeToken(this.token)
    console.log(tokenPayLoad.userType);
    localStorage.setItem('user_email',tokenPayLoad.user_email);
    localStorage.setItem('userType',tokenPayLoad.userType);
    localStorage.setItem('username',tokenPayLoad.username);
    console.log(tokenPayLoad.user_email);
    console.log(tokenPayLoad.username);
    

//||tokenPayLoad.userType !==
    if (!this.auth.loggedIn || !(userTypedata.includes(tokenPayLoad.userType)) ) {
     
        alert("no permission");
        return false
        
     
      
      
    }
    
console.log("INSIDE ROLE GUARD");

    return true  
      //   let Role = localStorage.getItem("userType");
      //   if(Role == "Admin"){
      //     return true;
      //   }
      //   alert("no permission");
      //   return false;
    
      }
  
  
}
