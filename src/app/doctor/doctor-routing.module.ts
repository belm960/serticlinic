import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patient/patients/patients.component';
import { SettingsComponent } from './settings/settings.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { TastedPatientProfileComponent } from './tasted-patient-profile/tasted-patient-profile.component';
import { TotestPatientsComponent } from './patient/to-test-patients/totestpatients.component';
import { TastedPatientsComponent } from './patient/tasted-patients/tastedpatients.component';
import { HistoryComponent } from './history/history.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
  },
  {
    path: 'patient/patients',
    component: PatientsComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'patientprofile',
    component: PatientProfileComponent,
  },

  
  {
    path: 'tasted-patient-profile',
    component: TastedPatientProfileComponent,
  },

  {
    path: 'patient/to-test-patients',
    component: TotestPatientsComponent,
  },

  {
    path: 'patient/tasted-patients',
    component: TastedPatientsComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
