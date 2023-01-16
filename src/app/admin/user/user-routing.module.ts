import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllUserComponent } from './alluser/alluser.component';
import { AddUserComponent } from './add-user/add-user.component';
import { Page404Component } from '../../authentication/page404/page404.component';
const routes: Routes = [
  {
    path: 'alluser',
    component: AllUserComponent,
  },
  {
    path: 'add-user',
    component: AddUserComponent,
  },
  { path: '**', component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
