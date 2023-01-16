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
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { PatientsRoutingModule } from './patients-routing.module';
import { OpenpatientsComponent } from './open-patients/open-patients.component';
import { InprogresspatientsComponent } from './inprogress-patients/inprogress-patients.component';
import { AllpatientsComponent } from './allpatients/allpatients.component';
import { FormDialogComponent } from './allpatients/dialog/form-dialog/form-dialog.component';
import { DeleteComponent } from './allpatients/dialog/delete/delete.component';
import { FormComponent } from './form/form.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardContent, MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    OpenpatientsComponent,
    InprogresspatientsComponent,
    AllpatientsComponent,
    FormDialogComponent,
    FormComponent,
    DeleteComponent
 
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
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
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    MatMenuModule,
    MatCheckboxModule,
    MaterialFileInputModule,
    MatTooltipModule,
    MatCardModule
  ],
})
export class PatientsModule {}
