
import {Component, OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { of } from 'rxjs';
import {Observable } from 'rxjs';
import { catchError} from 'rxjs/operators';

import { Patient } from 'src/app/admin/patients/allpatients/patient.model';

import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { Radiology } from 'src/app/radiology/radiology';
import Swal from 'sweetalert2';
import { Laboratory } from 'src/app/laboratory/laboratory';
import { FormValidationsComponent } from 'src/app/forms/form-validations/form-validations.component';
import { EmailModule } from 'src/app/email/email.module';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Appointment } from 'src/app/admin/appointment/viewappointment/appointment.model';
import { Router } from '@angular/router';
import {apiUrl} from 'src/environments/environment';
import { Visit } from 'src/app/shared/security/visit';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenStorageService } from 'src/app/shared/security/token-storage.service';


@Component({
  selector: 'app-tasted-patient-profile',
  templateUrl: './tasted-patient-profile.component.html',
  styleUrls: ['./tasted-patient-profile.component.sass']
})
export class TastedPatientProfileComponent implements OnInit{
 apiUrl = apiUrl+'/Patient';
 apiUrll = apiUrl+'/Visits';
 apiUrl1 = apiUrl+'/Visit';
 apiUrlRad = apiUrl+'/Radiology/vid';
 apiUrlLab = apiUrl+'/Laboratory/vid';
 patient: Patient = new Patient({});
 visit: Visit;
 visit1: Visit = new Visit({});
 visit2: Visit = new Visit({});
 radiology1: Radiology = new Radiology({});
 laboratory1: Laboratory;
 indicate=false;
 indicate1= false;
 appointment: Appointment = new Appointment({});
 appointmentForm: any;
 finished= false;
 room=false;
 fam=[];
 ph=[];
 iatForm: FormGroup;
 isLab=true;
 isRad=true;
 title= 'Todays Visit';
constructor(
  public httpClient: HttpClient,
  public dialog: MatDialog,
  private router: Router,
  private fb: FormBuilder,
  private token: TokenStorageService,


) {

  

  this.iatForm = this.fb.group({
    investigation: [''],
    dx: [''],
    treatment:[''],
    finished:[true]
  });

}
ngOnInit(){
  this.getLastVisitRad(this.getvid());
  this.getLastVisitLab(this.getvid());
  console.log("ssamuel");
  this.getPatients();
  this.getVisits();
  if(this.getRoom() =="yes"){
    this.room=true;
  }
}
getVistInfo(visit){
  this.visit1 =visit;
  this.getLastVisitLab(visit.id);
  this.getLastVisitRad(this.visit1.id);
  this.title='On Day of: '+ this.visit1.date;  
}
watch(id,rad,lab){
  window.localStorage.removeItem('vid');
  window.localStorage.setItem('vid',id);
  window.localStorage.removeItem('labkey');
  window.localStorage.setItem('labkey',lab);
  window.localStorage.removeItem('radkey');
  window.localStorage.setItem('radkey',rad);
  window.localStorage.removeItem('testkey');
  window.localStorage.setItem('testkey','true');
}
addAppointment(){
    this.indicate1=true;
    console.log(this.patient.patient_ID);
}
closeAppointment(){
    this.indicate1= false;
}
submitAppointment(){
  console.log(this.patient.first +" "+ this.patient.last);
  this.httpClient.post(apiUrl+'/appointement/',{

    "patientName": this.patient.first +" "+ this.patient.last,
    "date": this.appointment.date,
    "email": this.patient.email,
    "mobile": this.patient.mobile,
    "disease": this.appointment.disease,
    "doctorid": window.sessionStorage.getItem('user-id'),
    "pid": this.getid(),
    "status": "PENDING"
  }).subscribe(data => {
      console.log(data);
        });

    this.finished= true;

}
submit(){
  Swal.fire({
    title: 'Are You Sure',
    text: "This Inprogress Patient Will be Passed to Finished.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, transfer it!'
  }).then(result => {
    if (result.value) {
      this.httpClient.put(apiUrl+'/Visit/'+this.getvid(),this.iatForm.value).subscribe(data => {
        Swal.fire('Successfully Finished');
        this.indicate=true;
        },
        error=>{
          Swal.fire('OPS!','There is an Error please try again','error');
        });
}})
}
addRoom(){
  Swal.fire({
    title: 'Are You Sure?',
    text: "This will Sent the patient to Room service Room to get Room!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, transfer it!'
  }).then(result => {
    if (result.value) {
      this.httpClient.put(apiUrl+'/Patient/Rooms/'+this.patient.patient_ID,{"room":"yes"}).subscribe(data => {
      console.log(data);
      this.room=true;
        })
      Swal.fire('Transferd!', 'Success');
      
}})
}
getRad(){
  return  window.localStorage.getItem('radkey');
  }
getLab(){
  return  window.localStorage.getItem('labkey');
}  
getRoom(){
  return  window.localStorage.getItem('roomkey');
       }
getLabState(): boolean{
  if(this.getLab() == "2"){
    return true;
    }
  else{
    return false;
    }
}
getRadState(): boolean{
  if(this.getRad() == "2"){
    return true;
    }
  else{
    return false;
  }
}
getid(){
  return  window.localStorage.getItem('patient_id_tasted');
  }
getvid(){
  return  window.localStorage.getItem('ROW_KEY1');
  }
postLastVisit(){
  console.log(this.iatForm.value.dx);
  this.httpClient.put(apiUrl+'/Visit/'+this.visit1.id,this.iatForm.value).subscribe(data => {
    this.visit1.investigation=this.iatForm.value.investigation;
    this.visit1.dx= this.iatForm.value.dx;
    this.visit1.treatment= this.iatForm.value.treatment;
    this.visit1.finished=this.iatForm.value.finished;
    Swal.fire('Successfully Added');
     });
   }
getAllPatientsVisits(): Observable<Visit> {
  const url = this.apiUrll+'/'+this.getid();
  return this.httpClient.get<Visit>(url).pipe(
      catchError(_ => {
          console.log("Get Detail Failed");
          return of(new Visit({}));
      })
  );
}
getLastPatientsVisit(visitid): Observable<Visit> {
  const url = this.apiUrl1+'/'+visitid;
  return this.httpClient.get<Visit>(url).pipe(
      catchError(_ => {
          console.log("Get Detail Failed");
          return of(new Visit({}));
      })
  );
}
getLastPatientsVisitRad(id): Observable<Radiology> {
  const url = this.apiUrlRad+'/'+id;
  return this.httpClient.get<Radiology>(url).pipe(
    catchError(_ => {
      console.log("Get Detail Failed");
      return of(new Radiology({}));
  })
  );
}
getLastPatientsVisitLab(id): Observable<Laboratory> {
  const url = this.apiUrlLab+'/'+id;
  return this.httpClient.get<Laboratory>(url).pipe(
    catchError(_ => {
      console.log("Get Detail Failed");
      return of(new Laboratory());
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
      this.getLastVisit(data.v);
    },
    _ => console.log('Get Patient Failed')
);
}
getVisits(): void {
  this.getAllPatientsVisits().subscribe(
      data => {
        this.visit = data;
      },
      _ => console.log('Get Visits Failed')
  );
  }
  getLastVisit(visitid): void {
    this.getLastPatientsVisit(visitid).subscribe(
        data => {
          this.visit1 = data;
          console.log(this.visit1.finished)
          console.log(this.visit1);
          this.fam=this.visit1.familyHistory.split('?');
          this.ph=this.visit1.pastHistory.split('?');

        },
        _ => console.log('Get Last Visit Failed')
    );
    }
  getLastVisitRad(id): void {
    this.getLastPatientsVisitRad(id).subscribe(
        data => {
          this.radiology1 = data;
          console.log(this.radiology1);
        },
        error => {
          console.log('Get radiology Failed')
          if(error.error.status==404){
            this.isRad=false;
          }}
    );
    }
    getLastVisitLab(id): void {
      this.getLastPatientsVisitLab(id).subscribe(
          data => {
            this.laboratory1 = data;
            console.log(this.laboratory1);
            if(this.laboratory1==null){
              this.isLab=false;
            }
          },

          error => {
            console.log('Get radiology Failed')
            if(error.error.status==404){
              this.isLab=false;
            }}
      );
      }
    finish(){
      Swal.fire({
        title: 'Are You Sure?',
        text: "This will Back the patient to reception",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, transfer it!'
      }).then(result => {
        if (result.value) {
          this.httpClient.put(apiUrl+'/Patient/Finish/'+this.patient.patient_ID,{}).subscribe(
            data=>{

              console.log(data);
              this.router.navigateByUrl('/doctor/patient/patients')
            }
          );
          Swal.fire('Successfully Finished');
    }})
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
