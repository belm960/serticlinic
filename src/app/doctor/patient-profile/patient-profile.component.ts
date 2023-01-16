
import {Component,OnInit,ElementRef,ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { merge, of } from 'rxjs';
import { fromEvent } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Patient } from 'src/app/admin/patients/allpatients/patient.model';
import { PatientService } from 'src/app/admin/patients/allpatients/patient.service';
import { Visit } from 'src/app/shared/security/visit';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import {apiUrl} from 'src/environments/environment';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.sass']
})
export class PatientProfileComponent implements OnInit {
 apiUrl = apiUrl+'/Patient';
 apiUrll = apiUrl+'/Visits';
 patient: Patient;
 visit: Visit;
constructor(
  public httpClient: HttpClient,
  public patientService: PatientService,
  public dialog: MatDialog,

) {}

ngOnInit() {
  console.log(this.getid());
  this.getAllPatients();
  this.getPatients();
  this.getVisits();
}

getid(){
  return  window.localStorage.getItem('patient-id');
  }

goToLink(url: string){
  window.open(url, "_blank");
}
getAllPatientsVisits(): Observable<Visit> {
  const url = this.apiUrll+'/'+this.getid();
  return this.httpClient.get<Visit>(url).pipe(
      catchError(_ => {
          console.log("Get Detail Failed");
          return of(new Visit(this.patient));
      })
  );
}
getAllPatients(): Observable<any> {
  const url = `${this.apiUrl}/${this.getid()}`;
  return this.httpClient.get(url).pipe(
      )
}
getPatients(): void {
this.getAllPatients().subscribe(
    data => {
      this.patient = data;
    },
    _ => console.log('Get Patient Failed')
);
}
getVisits(): void {
  this.getAllPatientsVisits().subscribe(
      data => {
        this.visit = data;
      },
      _ => console.log('Get Patient Failed')
  );
  }
watch(id,rad,lab){
    window.localStorage.removeItem('vid');
    window.localStorage.setItem('vid',id);
    window.localStorage.removeItem('labkey');
    window.localStorage.setItem('labkey',lab);
    window.localStorage.removeItem('radkey');
    window.localStorage.setItem('radkey',rad);
    window.localStorage.removeItem('testkey');
    window.localStorage.setItem('testkey','false');
}
  addNew() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        patient: this.patient,
        action: 'add',
      },
    });
    dialogRef.afterClosed().subscribe();
  }
 /** editCall(row) {
    this.id = row.id;
    console.log(this.id);
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        patient: row,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe();
  }
*/
}
