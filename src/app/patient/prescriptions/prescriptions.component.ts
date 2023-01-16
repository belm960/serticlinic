import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Appointment } from 'src/app/admin/appointment/viewappointment/appointment.model';
import { Patient } from 'src/app/admin/patients/allpatients/patient.model';
import { Laboratory } from 'src/app/laboratory/laboratory';
import { Radiology } from 'src/app/radiology/radiology';
import { Visit } from 'src/app/shared/security/visit';
import { apiUrl } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.sass']
})
export class PrescriptionsComponent {

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
  laboratory1: Laboratory = new Laboratory();
  indicate=false;
  indicate1= false;
  appointment: Appointment = new Appointment({});
  appointmentForm: any;
  finished= false;
  room=false;
  title="Your Last Visit";

  radFound= false;
  labFound=false;
  visitFound=false;
 
 constructor(
   public httpClient: HttpClient,
   public dialog: MatDialog,
   private router: Router
 
 
 ) {
 
  this.getPatients();
  this.getVisits();
  this.getLastVisit();
  this.getLastVisitRad();
  this.getLastVisitLab();
 }

 getid(){
   return  window.localStorage.getItem('patientId');
   }
 getvid(){
   return  window.localStorage.getItem('visitpId');
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
 getLastPatientsVisit(): Observable<Visit> {
   const url = this.apiUrl1+'/'+this.getvid();
   return this.httpClient.get<Visit>(url).pipe(
       catchError(_ => {
           console.log("Get Detail Failed");
           return of(new Visit({}));
       })
   );
 }
 getLastPatientsVisitRad(): Observable<Radiology> {
   const url = this.apiUrlRad+'/'+this.getvid();
   return this.httpClient.get<Radiology>(url).pipe(
     catchError(_ => {
       console.log("Get Detail Failed");
       return of(new Radiology({}));
   })
   );
 }
 getLastPatientsVisitLab(): Observable<Laboratory> {
   const url = this.apiUrlLab+'/'+this.getvid();
   return this.httpClient.get<Laboratory>(url).pipe(
     catchError(_ => {
       console.log("Get Detail Failed");
       return of(new Laboratory());
   })
   );
 }
 getPatientsVisit(id): Observable<Visit> {
  const url = this.apiUrl1+'/'+id;
  return this.httpClient.get<Visit>(url).pipe(
      catchError(_ => {
          console.log("Get Detail Failed");
          return of(new Visit({}));
      })
  );
}
getPatientsVisitRad(id): Observable<Radiology> {
  const url = this.apiUrlRad+'/'+id;
  return this.httpClient.get<Radiology>(url).pipe(
    catchError(_ => {
      console.log("Get Detail Failed");
      return of(new Radiology({}));
  })
  );
}
getPatientsVisitLab(id): Observable<Laboratory> {
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
   getLastVisit(): void {
     this.getLastPatientsVisit().subscribe(
         data => {
           this.visit1 = data;
           console.log(this.visit1);
           this.title="Your Last Visit";
           this.visitFound=true;
           if(data==null){
            this.visitFound=false
           }
         },
         _ => console.log('Get Last Visit Failed')
     );
     }
   getLastVisitRad(): void {
     this.getLastPatientsVisitRad().subscribe(
         data => {
           this.radiology1 = data;
           console.log(this.radiology1);
           this.radFound=true;
           },
         _ => console.log('Get radiology Failed')
     );
     }
     getLastVisitLab(): void {
       this.getLastPatientsVisitLab().subscribe(
           data => {
             this.laboratory1 = data;
             console.log(this.laboratory1);
             this.labFound=true;
           },
           _ => console.log('Get radiology Failed')
       );
       }
       getVisit(id): void {
        this.getPatientsVisit(id).subscribe(
            data => {
              this.visit1 = data;
              console.log(this.visit1);
              this.title="On Date "+data.date.toString();
            },
            _ => console.log('Get Last Visit Failed')
        );
        }
      getVisitRad(id): void {
        this.getPatientsVisitRad(id).subscribe(
            data => {
              this.radiology1 = data;
              console.log(this.radiology1);
            },
            _ => console.log('Get radiology Failed')
        );
        }
        getVisitLab(id): void {
          this.getPatientsVisitLab(id).subscribe(
              data => {
                this.laboratory1 = data;
                console.log(this.laboratory1);
              },
              _ => console.log('Get radiology Failed')
          );
          }
    display(id){
        this.getVisit(id);
        this.getVisitRad(id);
        this.getVisitLab(id);
    }
   }
