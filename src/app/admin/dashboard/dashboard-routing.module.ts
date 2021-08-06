import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumniRoutingModule } from 'src/app/alumni/alumni-routing.module';
import { ApplicatonComponent } from 'src/app/alumni/dashboard/components/applicaton/applicaton.component';
import { ChildGuard } from 'src/app/child.guard';
import { RoleGuard } from 'src/app/role.guard';
import { AdminApprovalComponent } from '../admin-approval/admin-approval.component';
import { AdminComponent } from '../admin.component';
import { ApplicantsListComponent } from './components/applicants-list/applicants-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InfoComponent } from './components/info/info.component';
import { JobComponent } from './components/job/job.component';
import { JobsVerifyComponent } from './components/jobs-verify/jobs-verify.component';
import { JobsViewComponent } from './components/jobs-view/jobs-view.component';
import { UserComponent } from './components/user/user.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';


const routes: Routes = [
    {path:'',component:WrapperComponent,canActivate:[RoleGuard],data: {userType: 'Admin'} ,canActivateChild:[ChildGuard],
children:[
      {path:'dashboard',component:DashboardComponent,canActivateChild:[ChildGuard]},
    {path:'info',component:InfoComponent},
    {path:'user',component:AdminComponent},
    {path:'allusers',component:UserComponent},
    {path:'adminapproval',component: AdminApprovalComponent},
    {path:'job_verify',component: JobsVerifyComponent},
    {path:'applicants_list',component: ApplicantsListComponent},
   
    // {path:'job_view',component: JobsViewComponent },
    // {path:'job',component: JobComponent },
    //children:[{path:'job',component: JobComponent },]
   
]},
 {path:'application-form',component: ApplicatonComponent },
 {path:'job',component: JobComponent },
  
 {path:'job_view',component: JobsViewComponent, },
//{path:'**',redirectTo:'/adminhome',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }