import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Patient } from './patientopd.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {apiUrl} from 'src/environments/environment';
@Injectable()
export class PatientsopdService {
  //private readonly API_URL = 'assets/data/patient.json';
  private readonly API_URL = apiUrl+'/patient/opened';

  dataChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  pat:any;
  constructor(private httpClient: HttpClient) {}
  get data(): Patient[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllPatients(): void {
    this.httpClient.get(this.API_URL).subscribe(
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
