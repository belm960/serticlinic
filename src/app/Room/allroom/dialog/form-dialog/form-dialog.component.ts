import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Room1Service } from '../../room1.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Room } from '../../room.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {apiUrl} from 'src/environments/environment';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  roomForm: FormGroup;
  room: Room = new Room({});
  room1: Room;
  data1: any;
  data2: any;
  edit=false;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public roomService: Room1Service,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,

  ) {
    // Set the defaults
    this.action=data.action;
    if (this.action=='edit'){
        this.data1=data.room.id;
        this.edit=true;
        this.room1=data.room;
        this.data2=data.room2;
        this.roomForm= this.createContactForm2();
    }else{
      this.roomForm = this.createContactForm();
    }

    
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  getPid(){
    return window.localStorage.getItem('setPatientId')
  }
  getPName(){
    return window.localStorage.getItem('setPatientName')
  }
  getPSex(){
    return window.localStorage.getItem('setPatientSex')
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      pid:[this.getPid()],
      roomType: [this.room?.roomType],
      admitDate: [this.room?.admitDate],
      dischargeDate: [this.room?.dischargeDate],
      roomNo: [this.room?.roomNo],
      pName: [this.getPName()],
      pSex: [this.getPSex()]

    });
  }

  createContactForm2(): FormGroup {
    return this.fb.group({
      pid:[this.data2],
      roomType: [this.room1.roomType],
      admitDate: [this.room1.admitDate],
      dischargeDate: [this.room1.dischargeDate],
      roomNo: [this.room1.roomNo],
      pName: [this.room1.pName],
      pSex: [this.room1.pSex]

    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  public confirmAdd(): void {
    this.roomService.addRoom(this.roomForm.getRawValue());
    this.http.post(apiUrl+'/Room/',this.roomForm.getRawValue()).subscribe(data => {
        console.log(data);
      })
      
    Swal.fire('You Have successfully Added!');
    this.http.put(apiUrl+'/Patient/Room/'+this.getPid(),{"roomNo":this.roomForm.getRawValue().roomNo,"room":"have"}).subscribe(data => {
        console.log(data);
       
      })
    
  }
  public confirmAddEdit(id): void {
    this.roomService.addRoom(this.roomForm.getRawValue());
    this.http.put(apiUrl+'/Room/'+id,this.roomForm.getRawValue()).subscribe(data => {
        console.log(data);
      })
      
    Swal.fire('You Have successfully Edited!');
    this.http.put(apiUrl+'/Patient/Room/'+this.roomForm.getRawValue().pid,{"roomNo":this.roomForm.getRawValue().roomNo,"room":"have"}).subscribe(data => {
        console.log(data);
       
      })
  }
}
