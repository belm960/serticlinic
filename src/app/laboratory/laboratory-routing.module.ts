import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { TestResultComponent } from './test-result/test-result.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  {
    path: 'patients',
    loadChildren: () =>
      import('./patients/patients.module').then((m) => m.PatientsModule),
  },
  
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'test-result',
    component: TestResultComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaboratoryRoutingModule {}
