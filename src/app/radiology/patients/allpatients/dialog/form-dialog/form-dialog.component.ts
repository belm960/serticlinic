import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PatientsRadService } from '../../patientsrad.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Patient } from '../../patient.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Radiology } from 'src/app/radiology/radiology';
import Swal from 'sweetalert2';
import { InprogresspatientsComponent } from '../../../inprogress-patients/inprogress-patients.component';
import {apiUrl} from 'src/environments/environment';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  radiologyForm: FormGroup;
  radiology1: Radiology;
  row: any;
  visit: any;
  radiology: any;
  id: any;
  dataChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private readonly API_URL = apiUrl+'/Visit/';
  thing=false;
  sami: any;
  
  constructor(
    public http: HttpClient,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private router:Router
  ) {
    // Set the defaults
    this.action = data.action;

    if (this.action === 'new') {
      this.row = data.patient.v;
      this.id = data.patient.patient_ID;
      this.radiology1 = new Radiology({});
      this.thing= true;
    }
    if (this.action === 'edit'){
      this.row = data.patient.v;
      this.id = data.patient.patient_ID;
      this.radiology1 = data.rad;
      

    }

    this.radiologyForm = this.createContactForm();
  }
  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  ngOnInit() {
    this.getRadiologyD(this.row);
    
  }
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  getRadiologyD(row): void {
    console.log(row);
      this.http.get(this.API_URL+row).subscribe(
        data => {
          this.dataChange.next(data);
          console.log(data);
          this.visit = data;
          console.log(this.visit.radDiagnosis);
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
      diabetis:[''],
      metformin:[''],
      renalFunction:[''],
      weight:[''],
      previousExam:[''],
      reasonForScan:[''],
      relevantHistory:[''],
      radiologistName:[''],
      vid: [this.row]
    });
  }


  submit() {
    console.log('Form Value', this.radiologyForm.value);
    this.http.put(apiUrl+'/Radiology/',this.radiologyForm.value).subscribe(data => {
      console.log(data);
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

        this.http.put(apiUrl+'/Patient/Rad/'+this.id,{"rad":"2","sortDate":new Date()}).subscribe(data=>{
          console.log(data);
        });

        Swal.fire('Transferd!', 'the patient is now in the Tested Patients.', 'success');
        this.onNoClick();
      }
    });
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    console.log('Form Value', this.radiologyForm.value);
    this.http.post(apiUrl+'/Radiology/',this.radiologyForm.value).subscribe(data => {

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

        this.http.put(apiUrl+'/Patient/Rad/'+this.id,{"rad":"2","sortDate":new Date()}).subscribe();

        Swal.fire('Transferd!', 'the patient is now in the Tested Patients.', 'success');
        this.onNoClick();
      }
    });
    

  }

}
