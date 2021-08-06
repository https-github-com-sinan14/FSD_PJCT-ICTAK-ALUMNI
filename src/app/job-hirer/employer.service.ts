import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private FAKE_SERVICE_URL ="/api/"

  constructor(private http:HttpClient) { }
  getUser(id:any){
    return this.http.get("http://localhost:3000/employer/users/"+id);
  }
  getUsers(){
    return this.http.get("http://localhost:3000/employer/users");
  }
  Verifyusers(){
    return this.http.get("http://localhost:3000/employer/verify");
  }
    deleteUser(id:any)
  {

    return this.http.delete("http://localhost:3000/employer/remove/"+id)

  }
  editUser(product:any)
  {
    console.log('client update')
    return this.http.put("http://localhost:3000/employer/update",product)
    .subscribe(data =>{console.log(data)})
  }
  readmore(id:any){
    console.log("hereeeeeeeeeeeeeee");
    
    return this.http.get("http://localhost:3000/employer"+id);

  }
  getdetails(id:any){
    return this.http.get("http://localhost:3000/employer/getuser/"+id);
  }
  updateUser(user:any)
  {
    console.log('client update')
    return this.http.put("http://localhost:3000/employer/edituserdetails",user)
    .subscribe(data =>{console.log(data)})
  }
  resetpswd(pswd:any,userId:any)
  {
    return this.http.put("http://localhost:3000/employer/resetpswd",{"job":{pswd,userId}})
    .subscribe(data =>{console.log(data)})
  }
 
}
