import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlumniModel } from './register-alumni/alumni.model';
import { EmployerModel } from './register-employer/employer.model';
import { UserModel } from './register/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private FAKE_SERVICE_URL ="/api/"
  loginUser(user: any) {
    return this.http.post<any>("http://localhost:3000/login", user)
  }

  constructor(private http: HttpClient) { }
  loggedIn() {

    return !!localStorage.getItem('token') //if token value exists when user logged in this value rturned is boolean !! is used Present /not
  }
  getToken() {
    return localStorage.getItem('token')
  }
  newUser(userItem: UserModel) {

    //console.log(userItem);

    return this.http.post("http://localhost:3000/newuser", { "user": userItem })
      .subscribe(data => {
        console.log(data);
      })
  }

  //FOR ALUMNI

  newAlumni(AlumniItem: AlumniModel) {

    console.log(AlumniItem);

    return this.http.post("http://localhost:3000/alumni/newuser", { "user": AlumniItem })
      .subscribe(data => {
        console.log(data);
      })
  }
  //for Employer
  newEmployer(empItem: EmployerModel) {

    //console.log(userItem);

    return this.http.post("http://localhost:3000/employer/newuser", { "user": empItem })
      .subscribe(data => {
        console.log(data);
      })
  }
  //JOB POSTING
  jobPost(jobitem: any, userType: any, user_email: any) {
    return this.http.post("http://localhost:3000/jobs/jobposting", { "job": jobitem, "userType": userType, "user_email": user_email })
      .subscribe(data => { console.log(data) })
  }
  // //View jobs
  Viewjobs() {
    return this.http.get("http://localhost:3000/jobs/viewjobs");
  }

  Verifyjobs() {
    return this.http.get("http://localhost:3000/jobs/jobverify");
  }
  deletejob(id: any) {

    return this.http.delete("http://localhost:3000/jobs/remove/" + id)

  }
  editjob(job: any) {
    console.log(job)
    return this.http.put("http://localhost:3000/jobs/update", job)
      .subscribe(data => { console.log(data) })
  }
  getjob(id: any) {
    return this.http.get("http://localhost:3000/jobs/users/" + id);
  }
  //JOB POSTING
  Apply_job(jobitem: any, jobitem2: any, jobitem3: any, jobitem4: any) {
    //console.log(jobitem);



    return this.http.post("http://localhost:3000/jobs/applicants-new", { "job": { jobitem, jobitem2, jobitem3, jobitem4 } })
      .subscribe(data => { console.log(data) })
  }
  // //View jobs
  ViewApplicantlist() {
    return this.http.get("http://localhost:3000/jobs/applicantlist");
  }
  //fwd_applicants
  fwd_applicants(product: any) {
    console.log("whatseyyyyyyyyyyyyyyyy");

    console.log(product)
    return this.http.put("http://localhost:3000/jobs/fwd_applicants", product)
      .subscribe(data => { console.log(data) })
  }
  ///*********////
  getApplicants(user_email: any) {
    return this.http.get("http://localhost:3000/jobs/get_list/" + user_email);
  }
  getdetails(id: any) {
    return this.http.get("http://localhost:3000/getuser/" + id);
  }
  updateUser(user: any) {
    console.log('client update')
    return this.http.put("http://localhost:3000/edituserdetails", user)
      .subscribe(data => { console.log(data) })
  }
  resetpswd(pswd: any, userId: any) {
    return this.http.put("http://localhost:3000/resetpswd", { "job": { pswd, userId } })
      .subscribe(data => { console.log(data) })
  }
  deleteApplicant(id: any) {

    return this.http.delete("http://localhost:3000/jobs/remove-applicant/" + id)

  }
  gethistory(user_email: any) {
    return this.http.get("http://localhost:3000/jobs/applied-jobs/" + user_email);
  }
}
