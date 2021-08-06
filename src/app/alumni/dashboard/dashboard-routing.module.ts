import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobComponent } from 'src/app/admin/dashboard/components/job/job.component';
import { ChildGuard } from 'src/app/child.guard';
import { RoleGuard } from 'src/app/role.guard';
import { ApplicatonComponent } from './components/applicaton/applicaton.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DisplayjobComponent } from './components/displayjob/displayjob.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { HistoryComponent } from './components/history/history.component';

import { PswdchangeComponent } from './components/pswdchange/pswdchange.component';
import { ViewjobsComponent } from './components/viewjobs/viewjobs.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';


const routes: Routes = [
  {path:'',component:WrapperComponent,canActivate:[RoleGuard],data: {userType: 'Alumni'},canActivateChild:[ChildGuard],
  children:[
      {path:'alumnidashboard',component:DashboardComponent},
      {path:'view_jobs',component: ViewjobsComponent,children: [
       
      ] },
      {path:'editprofile',component: EditprofileComponent },
      {path:'pswdchange',component: PswdchangeComponent },
      {path:'application-form',component: ApplicatonComponent },
      {path:'select_job',component:DisplayjobComponent},
      {path:'history',component:HistoryComponent}
    
  ]},
  {path:'',redirectTo:'view_jobs',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule{ }