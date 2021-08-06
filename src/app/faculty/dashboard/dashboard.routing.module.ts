import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildGuard } from 'src/app/child.guard';
import { RoleGuard } from 'src/app/role.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { JobpostComponent } from './components/jobpost/jobpost.component';
import { PswdchangeComponent } from './components/pswdchange/pswdchange.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';


const routes: Routes = [
  {path:'',canActivate:[RoleGuard],data: {userType: 'Faculty'},component:WrapperComponent,canActivateChild:[ChildGuard],
  children:[
      {path:'dashboard_faculty',component:DashboardComponent},
      {path:'jobpostt',component:JobpostComponent},
      {path:'profile',component:EditprofileComponent},
      {path:'pswd',component:PswdchangeComponent},
    
  ]},
  {path:'**',redirectTo:'/dashboard_faculty',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
