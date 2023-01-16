import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/shared/security/token-storage.service';
import { apiUrl } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Laboratory } from '../laboratory';
import { Patient } from '../patients/allpatients/patient.model';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  laboratory: Laboratory;
  laboratory1: Laboratory = new Laboratory();
  patient: Patient = new Patient({});
  hideRequiredControl = new FormControl(false);
  row:any;
  labForm: FormGroup;
  sign= false;
  last=false;
  constructor(private token: TokenStorageService,private http: HttpClient,private fb: FormBuilder,private router: Router) {
    this.getLaboratory(window.localStorage.getItem('visit_id5'));
    this.getPatient(window.localStorage.getItem('patient_id_lab'));
    
    this.labForm = this.fb.group(
      {
        result:[this.laboratory1?.result],
        unit:[this.laboratory1?.unit],
        reference:[this.laboratory1?.reference],
        sst: [this.laboratory1?.sst],
        nameOfVerifier:[this.token.getUsername()],
        reportedTime:[new Date().getTime()],
        verificationDate: [new Date()]
      }
    
    )
  }
  onSubmit(){
    
    this.http.put(apiUrl+'/Laboratory/'+this.laboratory1.labid,this.labForm.value).subscribe(
      data=>{
        this.getLaboratory(window.localStorage.getItem('visit_id5'));
        console.log(data);
        this.laboratory1.status=true;
        this.laboratory1.result=this.labForm.value.result;
        this.laboratory1.unit=this.labForm.value.unit;
        this.laboratory1.reference=this.labForm.value.reference;
        this.laboratory1.sst=this.labForm.value.sst;
        this.laboratory1.nameOfVerifier=this.token.getUsername();
        this.laboratory1.verificationDate= new Date();
        this.laboratory1.reportedTime=new Date().getTime();
        this.labForm.value.result = '';
        this.labForm.value.unit = '';
        this.labForm.value.reference = '';
        this.labForm.value.sst = '';

      },
      error=>{
        console.log(error);
      }
    );
  }
  finish(){
    if(this.last&&this.laboratory1.status){
      this.http.put(apiUrl+'/Patient/Lab/'+window.localStorage.getItem('patient_id_lab'),{"lab":"2","sortDate":new Date()}).subscribe(
        data=>{
          Swal.fire('Successfull','success');
          this.router.navigateByUrl('/laboratory/patients/open-patients');
        }
      );
    }else if(!this.last){
      Swal.fire('Warning','Please fill all the forms','warning');
    }
  }
  getLastPatientsVisitLab(row): Observable<Laboratory> {
    const url = apiUrl+'/Laboratory/vid/'+row;
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

    
    getLaboratoryOne(row,last): void {
      this.laboratory1 = row;
      console.log(this.laboratory1);
      this.sign=true;
      if(last==true){
        this.last=true;
      }else if(last==false){
        this.last=false;
      }
      }
      getOnePatient(row): Observable<Patient> {
        const url = apiUrl+'/Patient/'+row;
        return this.http.get<Patient>(url).pipe(
          catchError(_ => {
            console.log("Get Detail Failed");
            return of(new Patient({}));
        })
        );
      }
      
      getPatient(row): void {
        this.getOnePatient(row).subscribe(
            data => {
              this.patient = data;
              console.log(this.patient);
            },
            _ => console.log('Get laboratory Failed')
        );
        }
  
}
