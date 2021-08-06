import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildGuard } from 'src/app/child.guard';
import { RoleGuard } from 'src/app/role.guard';
import { CandidatelistComponent } from './components/candidatelist/candidatelist.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';

import { JobpostComponent } from './components/jobpost/jobpost.component';
import { PswdchangeComponent } from './components/pswdchange/pswdchange.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';



const routes: Routes = [
  {path:'',component:WrapperComponent,canActivate:[RoleGuard], data: {userType: 'Employer'},canActivateChild:[ChildGuard],
  children:[
      {path:'dashboard_emp',component:DashboardComponent},
      {path:'jobpost',component:JobpostComponent},
      {path:'candidate-list',component:CandidatelistComponent},
      {path:'profilechange',component:EditprofileComponent},
      {path:'change-password',component:PswdchangeComponent}
      
  ]},
  {path:'**',redirectTo:'/dashboard_emp',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule{ }