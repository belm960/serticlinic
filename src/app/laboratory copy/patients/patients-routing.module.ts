import { Page404Component } from '../../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenpatientsComponent } from './open-patients/open-patients.component';
import { InprogresspatientsComponent } from './inprogress-patients/inprogress-patients.component';
import { AllpatientsComponent } from './allpatients/allpatients.component';

const routes: Routes = [
  {
    path: 'open-patients',
    component: OpenpatientsComponent,
  },
  {
    path: 'inprogress-patients',
    component: InprogresspatientsComponent,
  },
  
  {
    path: 'all-patients',
    component: AllpatientsComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
