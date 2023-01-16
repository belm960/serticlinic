import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/shared/security/doctor';
import { Pat } from 'src/app/shared/security/patient';
import Swal from 'sweetalert2';
import { Patient } from '../allpatients/patient.model';
import {apiUrl} from 'src/environments/environment';
import { User } from 'src/app/shared/security/user';
import { Patientsr } from '../allpatients/patientsr.model';
import { V } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.sass'],
})
export class AddPatientComponent {
  patientForm: FormGroup;
  id=Math.floor((1+Math.random())*10000000);
  constructor(private http:HttpClient,private router:Router,private fb: FormBuilder) {
    this.patientForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: [''],
      gender: ['', [Validators.required]],
      mobile: [''],
      dob: ['', [Validators.required]],
      age: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      maritalStatus: [''],
      address: [''],
      bGroup: [''],
      bPresure: [''],
      sugger: [''],
      injury: [''],
      uploadImg: [''],
      username:['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['patient', [Validators.required]],
    });
  }

  
  onSubmit() {
  const {first,last,gender,mobile,dob,age,email,address,username,password,role} = this.patientForm.value;

  const userData: User = {id:this.id,username:username,email:email,password:password,role: [role]};
  const patientData: Patientsr = {first:first,last:last,gender:gender,mobile:mobile,dob:dob,age:age,address:address,email:email,userid: this.id};

  this.http.post(apiUrl +'/api/auth/signup',userData).subscribe(data => {
    console.log(data); 
  });
  console.log('Form Value', patientData);
  this.http.post(apiUrl+'/Patient/',patientData).subscribe(data => {
    console.log(data);
    this.router.navigateByUrl("/reception/patients/all-patients");
  }) 
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Patient Recorded successfully',
    showConfirmButton: false,
    timer: 1500
  });   
}
}
