import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    path: 'payment',
    loadChildren: () =>
      import('./payment/payment.module').then((m) => m.PaymentModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptionRoutingModule {}
