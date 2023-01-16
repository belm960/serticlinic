import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Room } from '../allroom/room.model';
import { Patient } from 'src/app/admin/patients/allpatients/patient.model';
import {apiUrl} from 'src/environments/environment';
@Component({
  selector: 'app-add-allotment',
  templateUrl: './add-allotment.component.html',
  styleUrls: ['./add-allotment.component.sass']
})
export class AddAllotmentComponent {
  roomForm: Room = new Room({});
  indicate=false;
  patient: any;
  constructor(private http:HttpClient,private fb: FormBuilder, private router:Router) {}
  onSubmit() {
      this.http.post(apiUrl+'/Room/',{
        "pName": this.patient.first + " " + this.patient.last,
        "pSex": this.patient.gender,
        "pid":this.roomForm.pid,
        "roomNo":this.roomForm.roomNo,
        "roomType":this.roomForm.roomType,
        "admitDate":this.roomForm.admitDate,
        "dischargeDate":this.roomForm.dischargeDate
    }).subscribe(data => {
        console.log(data);
        this.router.navigate(['/Room/all-rooms']);
      })
      
      this.http.put(apiUrl+'/Patient/Room/'+this.roomForm.pid,{"roomNo":this.roomForm.roomNo,"room":"have"}).subscribe(data => {
        console.log(data);
        this.router.navigate(['/Room/all-rooms']);
      })
    }
  onSubmit1() {
      this.http.get(apiUrl+'/Patient/'+this.roomForm.pid).subscribe(data => {
        console.log(data);
        this.patient = data;
            this.indicate = true;
        }
      )
    }
}
