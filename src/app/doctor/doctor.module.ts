import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartsModule as chartjsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { FormComponent } from './appointments/form/form.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patient/patients/patients.component';
import { SettingsComponent } from './settings/settings.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { TastedPatientProfileComponent } from './tasted-patient-profile/tasted-patient-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { TaskRoutingModule } from '../task/task-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { TastedPatientsComponent } from './patient/tasted-patients/tastedpatients.component';
import { TotestPatientsComponent } from './patient/to-test-patients/totestpatients.component';
import { Forms1Component } from './patient/to-test-patients/form/forms1.component';
import { HistoryComponent } from './history/history.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AppointmentsComponent,
    FormComponent,
    DoctorsComponent,
    PatientsComponent,
    TastedPatientsComponent,
    TotestPatientsComponent,
    PatientProfileComponent,
    TastedPatientProfileComponent,
    SettingsComponent,
    FormDialogComponent,
    Forms1Component,
    HistoryComponent

  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    NgApexchartsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSortModule,
    MatTabsModule,
    MatMenuModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MaterialFileInputModule,

    
    TaskRoutingModule,
    MatSidenavModule,
    MatTooltipModule,
    MatCardModule,
  ],
})
export class DoctorModule {}
