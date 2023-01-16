import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/shared/security/doctor';
import { apiUrl } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
  did=window.sessionStorage.getItem('user-id');
  api_Url = apiUrl+'/User/';
  
  doctor: Doctor;
  
  constructor(public httpClient: HttpClient,) { }

  ngOnInit(): void {
    this.getDoctors();
  }
  getAllDoctors(): Observable<any> {
  const url = `${this.api_Url}${this.did}`;
  return this.httpClient.get(url).pipe(
      )
  }
  getDoctors(): void {
  this.getAllDoctors().subscribe(
      data => {
        this.doctor = data;
        console.log(this.doctor)
      },
      _ => console.log('Get Doctor Failed')
  );
  }

}
