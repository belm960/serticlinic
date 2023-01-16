import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointment } from 'src/app/admin/appointment/viewappointment/appointment.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {apiUrl} from 'src/environments/environment';
@Injectable()
export class AppointmentsService {
  private readonly API_URL = apiUrl+'/appointment/'+window.sessionStorage.getItem('user-id');
  private readonly API_URL1 = apiUrl+'/appointement'
  dataChange: BehaviorSubject<Appointment[]> = new BehaviorSubject<
    Appointment[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): Appointment[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAppointmentss(): void {
    this.httpClient.get<Appointment[]>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  updateAppStatus(id): void {
    this.httpClient.put(this.API_URL1+'/status/'+id,{"status":"APROVED"}).subscribe(
      (data) => { 
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  cancelApp(id): void{
    this.httpClient.put(this.API_URL1+'/status/'+id,{"status":"CANCELLED"}).subscribe(
      (data) => { console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  // DEMO ONLY, you can find working methods below
  addAppointments(appointments: Appointment): void {
    this.dialogData = appointments;
  }
  updateAppointments(appointments: Appointment): void {
    this.dialogData = appointments;
  }
  deleteAppointments(id: number): void {
    console.log(id);
  }
}
