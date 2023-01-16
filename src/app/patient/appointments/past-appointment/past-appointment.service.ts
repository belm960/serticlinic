import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PastAppointment } from './past-appointment.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { apiUrl } from 'src/environments/environment';
@Injectable()
export class PastAppointmentService {
  pid=localStorage.getItem('patientId');
  dataChange: BehaviorSubject<PastAppointment[]> = new BehaviorSubject<
    PastAppointment[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): PastAppointment[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  
  getAllPastAppointment(): void {
    this.httpClient.get<PastAppointment[]>(apiUrl+'/appointement/'+this.pid+'/PS/APPROVED').subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  // DEMO ONLY, you can find working methods below
  addPastAppointment(appointment: PastAppointment): void {
    this.dialogData = appointment;
  }
  updatePastAppointment(appointment: PastAppointment): void {
    this.dialogData = appointment;
  }
  deletePastAppointment(id: number): void {
    console.log(id);
  }
}
