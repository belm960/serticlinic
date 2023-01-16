import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Staff } from './staff.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { apiUrl } from 'src/environments/environment';
@Injectable()
export class UserService {
  private readonly API_URL = apiUrl +'/User';
  private readonly API_URLL = apiUrl;
  dataChange: BehaviorSubject<Staff[]> = new BehaviorSubject<Staff[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {}
  get data(): Staff[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllStaff(): void {
    this.httpClient.get<Staff[]>(this.API_URL).subscribe(
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
  

  updateStaff(id,staff): void {
    this.dialogData = staff;
    this.httpClient.put(apiUrl+'/Update/'+id,this.dialogData)
    .subscribe(

      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  
  updateStatus(status: boolean,id: number){
    this.httpClient.put(this.API_URLL+'/updateStatus/'+id,{"status": status}).subscribe(
      data=> {
        console.log(data)
        
      }
    );
  }

  deleteStaff(id: number): void {
    console.log(id);
    this.httpClient.delete(apiUrl+'/User/{id}'+id)
    .subscribe(

      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
