import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from 'src/environments/environment';
import { Laboratory } from '../laboratory';
import { Patient } from '../patients/allpatients/patient.model';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.sass']
})
export class TestResultComponent implements OnInit {
  laboratory: Laboratory = new Laboratory();
  patient: Patient = new Patient({});
  date1: string;
  private readonly API_URL = apiUrl+'/Visit/';
  private readonly API_URL1 = apiUrl+'/Laboratory/vid/';
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getPatientInfo(this.getid());
    this.getLaboratory(this.getvid());
  }
  getid(){
    return window.localStorage.getItem('patient_id_lab_tasted');
  }
  getvid(){
    return window.localStorage.getItem('patient_vid_lab_tasted');
  }
  print(){
    window.print();
   }
  getLastPatientsVisitLab(row): Observable<Laboratory> {
    const url = this.API_URL1+row;
    return this.http.get<Laboratory>(url).pipe(
      catchError(_ => {
        console.log("Get Detail Failed");
        return of(new Laboratory());
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
    this.getLastPatientsVisitLab(row).subscribe(
        data => {
          this.laboratory = data;

          this.date1=this.laboratory[0].verificationDate;
          console.log(this.laboratory);
        },
        _ => console.log('Get laboratory Failed')
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
