import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllroomComponent } from './allroom/allroom.component';
import { AddAllotmentComponent } from './add-allotment/add-allotment.component';
import { EditAllotmentComponent } from './edit-allotment/edit-allotment.component';
import { Page404Component } from '../authentication/page404/page404.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientsComponent } from './patients/patients.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'all-rooms',
    component: AllroomComponent,
  },
  {
    path: 'add-allotment',
    component: AddAllotmentComponent,
  },
  {
    path: 'patients',
    component: PatientsComponent,
  },

  { path: '**', component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomRoutingModule {}
