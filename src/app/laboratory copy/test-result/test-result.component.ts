import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from 'src/environments/environment';
import { Radiology } from '../radiology';
import { Patient } from '../patients/allpatients/patient.model';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.sass']
})
export class TestResultComponent implements OnInit {
  radiology: Radiology = new Radiology();
  patient: Patient = new Patient({});
  date1: string;
  private readonly API_URL = apiUrl+'/Visit/';
  private readonly API_URL1 = apiUrl+'/Radiology/vid/';
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getPatientInfo(this.getid());
    this.getLaboratory(this.getvid());
  }
  getid(){
    return window.localStorage.getItem('patient_id_rad_tasted');
  }
  getvid(){
    return window.localStorage.getItem('patient_vid_rad_tasted');
  }
  print(){
    window.print();
   }
  getLastPatientsVisitRad(row): Observable<Radiology> {
    const url = this.API_URL1+row;
    return this.http.get<Radiology>(url).pipe(
      catchError(_ => {
        console.log("Get Detail Failed");
        return of(new Radiology());
    })
    );
  }
  getPatient(row): Observable<Patient> {
    const url = apiUrl+'/Patient/'+row;
    return this.http.get<Patient>(url).pipe(
      catchError(_ => {
        console.log("Get Detail Failed");
        return of(new Patient({}));
    })
    );
  }
  getLaboratory(row): void {
    this.getLastPatientsVisitRad(row).subscribe(
        data => {
          this.radiology = data;

          this.date1=this.radiology[0].date;
          console.log(this.radiology);
        },
        _ => console.log('Get radiology Failed')
    );
    }
    getPatientInfo(row): void {
      this.getPatient(row).subscribe(
          data => {
            this.patient = data;
            console.log(this.patient);
          },
          _ => console.log('Get Patient Failed')
      );
      }
}
