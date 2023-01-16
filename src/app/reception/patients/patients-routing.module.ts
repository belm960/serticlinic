import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { AllpatientsComponent } from './allpatients/allpatients.component';
import { Page404Component } from '../../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenpatientsComponent } from './open-patients/open-patients.component';
import { InprogresspatientsComponent } from './inprogress-patients/inprogress-patients.component';

const routes: Routes = [
  {
    path: 'all-patients',
    component: AllpatientsComponent,
  },
  {
    path: 'add-patient',
    component: AddPatientComponent,
  },
  {
    path: 'edit-patient/:id',
    component: EditPatientComponent,
  },
  {
    path: 'patient-profile',
    component: PatientProfileComponent,
  },
  {
    path: 'open-patients',
    component: OpenpatientsComponent,
  },
  {
    path: 'inprogress-patients',
    component: InprogresspatientsComponent,
  },
  
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
