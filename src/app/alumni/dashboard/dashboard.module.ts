import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule} from '@angular/material/card';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ApplicatonComponent } from './components/applicaton/applicaton.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ViewjobsComponent } from './components/viewjobs/viewjobs.component';

import { EditprofileComponent } from './components/editprofile/editprofile.component';

// import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule} from '@angular/material/core';
import { PswdchangeComponent } from './components/pswdchange/pswdchange.component';
import { DisplayjobComponent } from './components/displayjob/displayjob.component';
import { HistoryComponent } from './components/history/history.component';

@NgModule({
  declarations: [
    DashboardComponent,
    WrapperComponent,
    ApplicatonComponent,
    ViewjobsComponent,
    EditprofileComponent,
    PswdchangeComponent,
    DisplayjobComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
     // NG Material Modules
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule,
  FlexLayoutModule,
  MatCardModule,
  MDBBootstrapModule.forRoot(),
  FormsModule,
  ReactiveFormsModule,
  MatStepperModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatInputModule,
  MatDatepickerModule,
  FormsModule,
ReactiveFormsModule,
  
  
  ],
  exports: [
    
  ]
})
export class DashboardModule { }
