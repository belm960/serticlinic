import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UserRoutingModule } from './user-routing.module';
import { AllUserComponent } from './alluser/alluser.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormDialogComponent } from './alluser/dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './alluser/dialog/delete/delete.component';
import { AddUserComponent } from './add-user/add-user.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

@NgModule({
  declarations: [
    FormDialogComponent,
    DeleteDialogComponent,
    AddUserComponent,
    AllUserComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MaterialFileInputModule,
    MatTabsModule,
    UserRoutingModule,
    MatSlideToggleModule
  ],
})
export class UserModule {}
