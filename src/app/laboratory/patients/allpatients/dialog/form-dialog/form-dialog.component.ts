import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PatientsLabService } from '../../patientslab.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Patient } from '../../patient.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';
import { Laboratory } from 'src/app/laboratory/laboratory';
import { OpenpatientsComponent } from '../../../open-patients/open-patients.component';
import { Visit } from 'src/app/shared/security/visit';
import {apiUrl} from 'src/environments/environment';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  laboratoryForm: FormGroup;
  laboratory1: Laboratory;
  row: any;
  visit: any;
  laboratory: any;
  id: any;
  dataChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private readonly API_URL = apiUrl+'/Visit/';
  thing=false;

  
  constructor(
    public http: HttpClient,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private router:Router,
  ) {
    // Set the defaults
    this.action = data.action;

    if (this.action === 'new') {
      this.row = data.patient.v;
      this.id = data.patient.patient_ID;
      this.laboratory1 = new Laboratory();
      this.thing= true;
    }
    if (this.action === 'edit'){
      this.row = data.patient.v;
      this.id = data.patient.patient_ID;
      this.laboratory1 = data.rad;
      
    }

    this.laboratoryForm = this.createContactForm();
  }
  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  ngOnInit() {
    this.getLaboratoryD(this.row);
    

  }
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  getLaboratoryD(row): void {
    console.log(row);
      this.http.get(this.API_URL+row).subscribe(
        data => {
          this.dataChange.next(data);
          console.log(data);
          this.visit = data;
          console.log(this.visit.labDiagnosis);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        }
      );
    }

    

  createContactForm(): FormGroup {
    return this.fb.group({
      urgency: [''],
      fast:[''],
      date:[''],
      testtype:[''],
      drugtherapy:[''],
      lastdose:[''],
      otherinfo:[''],
      profiletest:[''],
      biochem: [''],
      hematology: [''],
      microbio: [''],
      anatomicalpathology: [''],
      laboratoristName:[''],
      vid: [this.row]
    });
  }


  submit() {
    console.log('Form Value', this.laboratoryForm.value);
    this.http.put(apiUrl+'/Laboratory/',this.laboratoryForm.value).subscribe(data => {

    })
    Swal.fire({
      title: 'Confirm By Clicking Yes?',
      text: "If you do this it will be transfered to the doctor again.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, transfer it!'
    }).then(result => {
      if (result.value) {

        this.http.put(apiUrl+'/Patient/Lab/'+this.id,{"lab":"2","sortDate":new Date()}).subscribe();

        Swal.fire('Transferd!', 'the patient is now in the Tested Patients.', 'success');
        this.onNoClick();
      }
    });
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    console.log('Form Value', this.laboratoryForm.value);
    this.http.post(apiUrl+'/Laboratory/',this.laboratoryForm.value).subscribe(data => {

    })
    Swal.fire({
      title: 'Confirm By Clicking Yes?',
      text: "If you do this it will be transfered to the doctor again.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, transfer it!'
    }).then(result => {
      if (result.value) {

        this.http.put(apiUrl+'/Patient/Lab/'+this.id,{"lab":"2","sortDate":new Date()}).subscribe();

        Swal.fire('Transferd!', 'the patient is now in the Tested Patients.', 'success');
        this.onNoClick();
      }
    });
    

  }

}
