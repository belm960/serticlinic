import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PatientsopdService } from '../../patientsopd.service';
import {apiUrl} from 'src/environments/environment';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Patient } from '../../patientopd.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/security/user';
import { Staff } from 'src/app/shared/security/staff';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  patientForm: FormGroup;
  patient:Patient;
  id: any;
  doctor: any;
constructor(
    public http: HttpClient,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public patientsService: PatientsopdService,
    private fb: FormBuilder,
    private router:Router
  ) {
    // Set the defaults
       this.id=data.rowid;
       console.log(this.id)
       this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.patient.name;
      this.patient = data.patient;
    } else {
      this.dialogTitle = 'New Patient';
      this.patient = new Patient({});
    }
    this.patientForm = this.createContactForm();
  }
  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getAllDoctors(department): Observable<any> {
    return this.http.get(apiUrl+'/User/role/'+department).pipe(
        )
  }
  getDoctors(department): void {
  this.getAllDoctors(department).subscribe(
      data => {
        this.doctor = data;
      },
      _ => console.log('Get Doctors Failed')
  );
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      doctorid: [''],
      status: ["inprogress"],
      sortDate: [new Date()]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {


    this.http.put(apiUrl+'/Patient/opd/'+this.id,this.patientForm.value).subscribe(data => {
      console.log(data);
    })

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Trasferred successfully',
      showConfirmButton: false,
      timer: 1000
    });

    

  }


  }

