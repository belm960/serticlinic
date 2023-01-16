import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

import Swal from 'sweetalert2';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Visit } from 'src/app/shared/security/visit';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Patient } from 'src/app/admin/patients/allpatients/patient.model';
import {apiUrl} from 'src/environments/environment';

@Component({
  selector: 'app-forms1',
  templateUrl: './forms1.component.html',
  styleUrls: ['./forms1.component.sass'],
})
export class Forms1Component {
  action: string;
  dialogTitle: string;
  isDetails = false;
  patient: Patient = new Patient({});
  row: any;
  roomNo: any;
  roomType: any;
  dataChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private readonly API_URL = apiUrl+'/Patient/room/';
  constructor(
    public dialogRef: MatDialogRef<Forms1Component>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    // Set the defaults
      this.roomNo = data.roomNo;
      this.roomType = data.roomType;
      this.isDetails = true;
  }
 ngOnInit(){
  this.getLastVisit(this.roomNo);
 }

getPatientsByRoom(roomNo): Observable<Patient> {
  const url = this.API_URL+roomNo;
  return this.http.get<Patient>(url).pipe(
    catchError(_ => {
      console.log("Get Detail Failed");
      return of(new Patient({}));
  })
  );
}

getLastVisit(row): void {
  this.getPatientsByRoom(row).subscribe(
      data => {
        this.patient = data;
        console.log(this.patient);
      },
      _ => console.log('Get patient Failed')
  );
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
 
  }
}
