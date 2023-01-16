import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { formatDate } from '@angular/common';
import { Laboratory } from '../../laboratory';
import { PatientsLabService } from '../allpatients/patientslab.service';
import Swal from 'sweetalert2';
import { Patient } from '../allpatients/patient.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Visit } from 'src/app/shared/security/visit';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {apiUrl} from 'src/environments/environment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass'],
})
export class FormComponent {
  action: string;
  dialogTitle: string;
  isDetails = false;
  laboratory: Laboratory = new Laboratory();
  patient: Patient;
  row: any;
  visit: any;
  dataChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private readonly API_URL = apiUrl+'/Visit/';
  private readonly API_URL1 = apiUrl+'/Laboratory/vid/';
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    // Set the defaults
      this.patient = data.patient;
      this.row = data.patient.v;
      this.isDetails = true;
      console.log(this.row)
  }
 ngOnInit(){
  this.getLaboratory(this.row);
 }

 print(){
  window.print();
 }
getLastPatientsVisitLab(row): Observable<Laboratory> {
  const url = this.API_URL1+row;
  return this.http.get<Laboratory>(url).pipe(
    catchError(_ => {
      console.log("Get Detail Failed");
      return of(new Laboratory());
  })
  );
}

getLaboratory(row): void {
  this.getLastPatientsVisitLab(row).subscribe(
      data => {
        this.laboratory = data;
        console.log(this.laboratory);
      },
      _ => console.log('Get laboratory Failed')
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
