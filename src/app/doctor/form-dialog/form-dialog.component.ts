import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Visit } from 'src/app/shared/security/visit';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Patient } from 'src/app/admin/patients/allpatients/patient.model';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { formatDate } from '@fullcalendar/core';
import {apiUrl} from 'src/environments/environment';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent {
  taskForm: FormGroup;
  showFiller = false;
  isNewEvent = false;
  isNewEvent1 = false;
  dialogTitle: string;
  userImg: string;

  action: string;
  visitForm: FormGroup;
  patientForm: FormGroup;
  patient: Patient;
  visit: Visit;
  id :string;
  
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'Edit') {
      this.dialogTitle = data.visit.name;
      this.visit = data.visit;
    } else {
      this.dialogTitle = 'New Visit';
      this.visit = new Visit({});
    }
    this.visitForm = this.createContactForm();
    this.patientForm= this.createContactForm2();
    
  }

  

  getid(){
    return  window.localStorage.getItem('ROW_KEY');
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

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.visit.id],
      name: [this.visit.name],
      doctorName: [this.visit.doctorName],
      date: [this.visit.date],
      noteDetails: [this.visit.noteDetails],
      labDiagnosis: [this.visit.labDiagnosis],
      radDiagnosis: [this.visit.radDiagnosis],
      pid: [this.visit.pid],
    });
  }

 

  createContactForm2(): FormGroup {
    return this.fb.group({
      v: [this.visit.id],
      sortDate: [new Date()],
      status: ["inprogress"]
    })
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if(this.visitForm.getRawValue().radDiagnosis=="" && this.visitForm.getRawValue().labDiagnosis==""){
      this.patientForm.value.status="NORL";
    }
    this.http.post(apiUrl+'/Visit/',this.visitForm.value).subscribe(data => {
    })
    console.log(this.patientForm.value);
    this.http.put(apiUrl+'/Patient/v/'+this.getid(),this.patientForm.value).subscribe(data => {
      console.log(data);
    })


    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Visit Recorded successfully',
      showConfirmButton: false,
      timer: 1500
    });

  }

  addNewRad() {
    this.isNewEvent1 = true;
  }
  addNewLab() {
    this.isNewEvent = true;
  }
  closeNewRad() {
    this.isNewEvent1 = false;
  }
  closeNewLab() {
    this.isNewEvent = false;
  }

 addRadiology(){

  this.http.put(apiUrl+'/Patient/Rad/'+this.getid(),{"rad":"1"}).subscribe();

 Swal.fire({
  position: 'center',
  icon: 'success',
  title: 'Radiology test Sent successfully',
  showConfirmButton: false,
  timer: 1000
});

 }

 addLaboratory(){
    console.log(this.getid());
    this.http.put(apiUrl+'/Patient/Lab/'+this.getid(),{"lab":"1"}).subscribe(data => {
    console.log(data);
  })

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Laboratory test Sent successfully',
    showConfirmButton: false,
    timer: 1000
  });


 }
 
  }
