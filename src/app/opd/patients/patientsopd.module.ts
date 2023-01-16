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
import { PatientsopdRoutingModule } from './patientsopd-routing.module';
import { AllpatientsopdComponent } from './allpatients/allpatientsopd.component';
import { EditPatientopdComponent } from './edit-patient/edit-patient.component';
import { DeleteComponent } from './allpatients/dialog/delete/delete.component';
import { FormDialogComponent } from './allpatients/dialog/form-dialog/form-dialog.component';
import { OpenpatientsComponent } from './open-patients/open-patients.component';
import { InprogresspatientsComponent } from './inprogress-patients/inprogress-patients.component';

@NgModule({
  declarations: [
    AllpatientsopdComponent,
    EditPatientopdComponent,
    DeleteComponent,
    FormDialogComponent,    
    OpenpatientsComponent,
    InprogresspatientsComponent
  ],
  imports: [
    CommonModule,
    PatientsopdRoutingModule,
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
  ],
})
export class PatientsopdModule {}
