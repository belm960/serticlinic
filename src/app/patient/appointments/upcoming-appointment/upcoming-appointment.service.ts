import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UpcomingAppointment } from './upcoming-appointment.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { apiUrl } from 'src/environments/environment';
@Injectable()
export class UpcomingAppointmentService {
  pid=localStorage.getItem('patientId');
  dataChange: BehaviorSubject<UpcomingAppointment[]> = new BehaviorSubject<
    UpcomingAppointment[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): UpcomingAppointment[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllUpcomingAppointment(): void {
    this.httpClient.get<UpcomingAppointment[]>(apiUrl+'/appointement/'+this.pid+'/PS/PENDING').subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  // DEMO ONLY, you can find working methods below
  addUpcomingAppointment(appointment: UpcomingAppointment): void {
    this.dialogData = appointment;
  }
  updateUpcomingAppointment(appointment: UpcomingAppointment): void {
    this.dialogData = appointment;
  }
  deleteUpcomingAppointment(id: number): void {
    console.log(id);
  }
}
