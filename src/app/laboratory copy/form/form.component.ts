import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/shared/security/token-storage.service';
import { apiUrl } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Radiology } from '../radiology';
import { Patient } from '../patients/allpatients/patient.model';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  radiology: Radiology;
  radiology1: Radiology = new Radiology();
  patient: Patient = new Patient({});
  hideRequiredControl = new FormControl(false);
  row:any;
  radForm: FormGroup;
  sign= false;
  last=false;
  router: any;
  constructor(private token: TokenStorageService,private http: HttpClient,private fb: FormBuilder) {
    this.getRadiology(window.localStorage.getItem('visit_id5'));
    this.getPatient(window.localStorage.getItem('patient_id_rad'));
    
    this.radForm = this.fb.group(
      {
        report: [this.radiology1?.report],
        reportedBy:[this.token.getUsername()],
        date: [new Date()]
      }
    
    )
  }
  onSubmit(){
    this.http.put(apiUrl+'/Radiology/'+this.radiology1.radid,this.radForm.value).subscribe(
      data=>{
        console.log(data);
        this.getRadiology(window.localStorage.getItem('visit_id5'));
        this.radiology1.report=this.radForm.value.report;
        this.radiology1.date= new Date();
        this.radiology1.reportedBy=this.token.getUsername();
        this.radiology1.finished=true;
        this.radForm.value.report= '';
      },
      error=>{
        console.log(error);
      }
    );
  }
  finish(){
        if(this.last){
          this.http.put(apiUrl+'/Patient/Rad/'+window.localStorage.getItem('patient_id_rad'),{"rad":"2","sortDate": new Date()}).subscribe(
            data=>{
              Swal.fire('Successfull','success');
              this.router.navigateByUrl('/radiology/patients/open-patients');}
          );      
        }else if(!this.last){
          Swal.fire('Warning','please fill all the forms, if not available fill none','warning')
        }
  }
  getLastPatientsVisitRad(row): Observable<Radiology> {
    const url = apiUrl+'/Radiology/vid/'+row;
    return this.http.get<Radiology>(url).pipe(
      catchError(_ => {
        console.log("Get Detail Failed");
        return of(new Radiology());
    })
    );
  }
  getRadiology(row): void {
    this.getLastPatientsVisitRad(row).subscribe(
        data => {
          this.radiology = data;
          console.log(this.radiology);
        },
        _ => console.log('Get radiology Failed')
    );
    }
  getRadiologyOne(row,last): void {
    this.radiology1 = row;
    console.log(this.radiology1);
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
            _ => console.log('Get radiology Failed')
        );
        }
  
}
