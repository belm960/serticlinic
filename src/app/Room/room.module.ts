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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RoomRoutingModule } from './room-routing.module';
import { AllroomComponent } from './allroom/allroom.component';
import { DeleteDialogComponent } from './allroom/dialog/delete/delete.component';
import { FormDialogComponent } from './allroom/dialog/form-dialog/form-dialog.component';
import { EditAllotmentComponent } from './edit-allotment/edit-allotment.component';
import { AddAllotmentComponent } from './add-allotment/add-allotment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { Forms1Component } from './allroom/form/forms1.component';
import { MatCardModule } from '@angular/material/card';
import { PatientsComponent } from './patients/patients.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [
    AllroomComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    Forms1Component,
    EditAllotmentComponent,
    AddAllotmentComponent,
    DashboardComponent,
    PatientsComponent
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
    MatCheckboxModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    RoomRoutingModule,
    NgxEchartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    PerfectScrollbarModule,
    NgApexchartsModule,
    MatTabsModule,
    MatTooltipModule,
    MatRadioModule,
    MatCardModule,
    MatMenuModule,
    DragDropModule,
    MaterialFileInputModule,
  ],
})
export class RoomModule {}
