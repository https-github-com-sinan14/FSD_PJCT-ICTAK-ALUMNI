import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlumniModel } from '../register-alumni/alumni.model';


@Injectable({
  providedIn: 'root'
})
export class AlumniService {
  private FAKE_SERVICE_URL ="/api/"
  constructor(private http:HttpClient) { }
  getUser(id:any){
    return this.http.get("http://localhost:3000/alumni/users/"+id);
  }
  getUsers(){
    return this.http.get("http://localhost:3000/alumni/users");
  }
  Verifyusers(){
    return this.http.get("http://localhost:3000/alumni/verify");
  }
  // newUser(item: ProductModel)
  // {
  //   return this.http.post("http://localhost:3000/insert",{"product":item})
  //   .subscribe(data => {console.log(data);
  //   })
  // }
  deleteUser(id:any)
  {

    return this.http.delete("http://localhost:3000/alumni/remove/"+id)

  }
  editUser(product:any)
  {
    console.log('client update')
    return this.http.put("http://localhost:3000/alumni/update",product)
    .subscribe(data =>{console.log(data)})
  }
  readmore(id:any){
    // console.log("hereeeeeeeeeeeeeee");
    
    return this.http.get("http://localhost:3000/alumni"+id);

  }
  getdetails(id:any){
    return this.http.get("http://localhost:3000/alumni/getuser/"+id);
  }
  updateUser(user:any)
  {
    console.log('client update')
    return this.http.put("http://localhost:3000/alumni/edituserdetails",user)
    .subscribe(data =>{console.log(data)})
  }
  resetpswd(pswd:any,userId:any)
  {
    return this.http.put("http://localhost:3000/alumni/resetpswd",{"job":{pswd,userId}})
    .subscribe(data =>{console.log(data)})
  }
}
