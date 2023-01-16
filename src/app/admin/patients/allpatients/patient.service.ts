import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Patient } from './patient.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/shared/security/auth.service';
import { PatientProfileComponent } from 'src/app/doctor/patient-profile/patient-profile.component';
import { Visit } from 'src/app/shared/security/visit';
import {apiUrl} from 'src/environments/environment';
@Injectable()
export class PatientService {
  //private readonly API_URL = 'assets/data/patient.json';
  private readonly API_URL = apiUrl+'/Patient';
  private readonly API_URLD = apiUrl+'/patient/';
  private readonly API_URLV = apiUrl+'/Visits';
  username: string;
  dType:number;
  profile: PatientProfileComponent;
  USERNAME_KEY = 'AuthUsername';
  DTYPE_KEY='dkey';

  dataChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  pat:any;
  private authservice: AuthService;
  constructor(private httpClient: HttpClient) {}
  get data(): Patient[] {
    return this.dataChange.value;
  }
  get dat(): Visit[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  public getUsername(): string {
    return localStorage.getItem(this.USERNAME_KEY);
  }
  public getUserId(){
    return sessionStorage.getItem('user-id');
  }
  /** CRUD METHODS */
  getAllPatients(): void {
    this.httpClient.get(this.API_URL).subscribe(
      data => {
        this.dataChange.next(data);
        console.log(data);
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }}
    );
  }
  getAllPatientsVisits(): void {
    this.httpClient.get(this.API_URLV+'/'+this.profile.getid()).subscribe(
      data => {
        this.dataChange.next(data);
        console.log(data);
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }}
    );
  }
  getAllInprogressPatients(): void {
  this.dType=parseInt(this.getUserId());
  this.httpClient.get(apiUrl+'/pat/'+this.dType).subscribe(
      data => {
        this.dataChange.next(data);
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  getRoomPatients(): void {
    this.httpClient.get(apiUrl+'/Patient/rooms/yes').subscribe(
        data => {
          this.dataChange.next(data);
          console.log(data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        }
      );
    }

  getAllInprogressPatientsTad(): void {
    this.dType=parseInt(this.getUserId());
    this.httpClient.get(apiUrl+'/pat/lab/Tad/'+this.dType).subscribe(
        data => {
          this.dataChange.next(data);
          console.log(data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        }
      );
    }

    getAllInprogressPatientsTod(): void {
      this.dType=parseInt(this.getUserId());
      this.httpClient.get(apiUrl+'/pat/lab/Tod/'+this.dType).subscribe(
          data => {
            this.dataChange.next(data);
            console.log(data);
          },
          (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
          }
        );
      }
  


  // DEMO ONLY, you can find working methods below
  addPatient(patient: Patient): void {
    this.dialogData = patient;
  }
  updatePatient(patient: Patient): void {
    this.dialogData = patient;
  }
  deletePatient(id: number): void {
    console.log(id);
  }
}
