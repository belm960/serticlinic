
import {Component} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { of } from 'rxjs';
import {Observable } from 'rxjs';
import { catchError} from 'rxjs/operators';

import { Patient } from 'src/app/admin/patients/allpatients/patient.model';
import { Visit } from 'src/app/shared/security/visit';
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


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent {
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
 indicate3=false;
 appointment: Appointment = new Appointment({});
 appointmentForm: any;
 finished= false;
 room=false;

constructor(
  public httpClient: HttpClient,
  public dialog: MatDialog,
  private router: Router


) {

  this.getPatients();
  this.getVisits();
  this.getLastVisit();
  if(!(this.getRad() == "")){
    this.getLastVisitRad();
    }
  if(!(this.getLab() == "")){
    this.getLastVisitLab();
      }
  if(this.getTasted()=='true'){
      this.indicate=true;
    }
}
getTasted(){
  return  window.localStorage.getItem('testkey');
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
  if(!(this.getLab() == "")){
    return true;
    }
  else{
    return false;
    }
}
getRadState(): boolean{
  if(!(this.getRad() == "")){
    return true;
    }
  else{
    return false;
  }
}
getid(){
  return  window.localStorage.getItem('ROW_KEY');
  }
getvid(){
  return  window.localStorage.getItem('vid');
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
        },
        _ => console.log('Get Last Visit Failed')
    );
    }
  getLastVisitRad(): void {
    this.getLastPatientsVisitRad().subscribe(
        data => {
          this.radiology1 = data;
          console.log(this.radiology1);
        },
        _ => console.log('Get radiology Failed')
    );
    }
    getLastVisitLab(): void {
      this.getLastPatientsVisitLab().subscribe(
          data => {
            this.laboratory1 = data;
            console.log(this.laboratory1);
          },
          _ => console.log('Get radiology Failed')
      );
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
