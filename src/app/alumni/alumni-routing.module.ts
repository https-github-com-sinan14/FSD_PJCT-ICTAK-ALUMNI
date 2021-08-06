import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumniComponent } from './alumni.component';

const routes: Routes = [
  {
    path:'alumnipage',
  loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumniRoutingModule { }
