
import { EditPatientopdComponent } from './edit-patient/edit-patient.component';
import { Page404Component } from '../../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenpatientsComponent } from './open-patients/open-patients.component';
import { InprogresspatientsComponent } from './inprogress-patients/inprogress-patients.component';
import { AllpatientsopdComponent } from './allpatients/allpatientsopd.component';

const routes: Routes = [
 

  {
    path: 'edit-patient/:id',
    component: EditPatientopdComponent,
  },
  {
    path: 'open-patients',
    component: OpenpatientsComponent,
  },
  {
    path: 'inprogress-patients',
    component: InprogresspatientsComponent,
  },
  {
    path: 'allpatients',
    component: AllpatientsopdComponent,
  },
    
 
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsopdRoutingModule {}
