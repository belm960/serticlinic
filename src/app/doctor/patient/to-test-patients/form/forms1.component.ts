import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

import Swal from 'sweetalert2';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Visit } from 'src/app/shared/security/visit';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {apiUrl} from 'src/environments/environment';
import { Laboratory } from 'src/app/laboratory/laboratory';
import { Radiology } from 'src/app/radiology/radiology';

@Component({
  selector: 'app-forms1',
  templateUrl: './forms1.component.html',
  styleUrls: ['./forms1.component.sass'],
})
export class Forms1Component {
  action: string;
  dialogTitle: string;
  isDetails = false;
  visit: Visit = new Visit({});
  row: any;
  laboratory: Laboratory;
  radiology: Radiology;
  dataChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private readonly API_URL = apiUrl+'/Visit/';
  private readonly API_URL1 = apiUrl+'/Radiology/vid/';
  private readonly API_URL2 = apiUrl+'/Laboratory/vid/';
  constructor(
    public dialogRef: MatDialogRef<Forms1Component>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    // Set the defaults

      this.row = data.patient.v;
      this.isDetails = true;
  }
 ngOnInit(){
  this.getLastVisit(this.row);
  this.getLaboratoryDetail(this.row);
  this.getRadiologyDetail(this.row);
 }

getLastPatientsVisit(row): Observable<Visit> {
  const url = this.API_URL+row;
  return this.http.get<Visit>(url).pipe(
    catchError(_ => {
      console.log("Get Detail Failed");
      return of(new Visit({}));
  })
  );
}

getLastVisit(row): void {
  this.getLastPatientsVisit(row).subscribe(
      data => {
        this.visit = data;
        console.log(this.visit);
      },
      _ => console.log('Get radiology Failed')
  );
  }
  getLaboratory(row): Observable<Laboratory> {
    const url = this.API_URL2+row;
    return this.http.get<Laboratory>(url).pipe(
      catchError(_ => {
        console.log("Get Detail Failed");
        return of(new Laboratory());
    })
    );
  }
  
  getRadiologyDetail(row): void {
    this.getRadiology(row).subscribe(
        data => {
          this.radiology = data;
          console.log(this.radiology);
        },
        _ => console.log('Get radiology Failed')
    );
    }
  getRadiology(row): Observable<Radiology> {
    const url = this.API_URL1+row;
    return this.http.get<Radiology>(url).pipe(
      catchError(_ => {
        console.log("Get Detail Failed");
        return of(new Radiology({}));
    })
    );
  }
    
  getLaboratoryDetail(row): void {
    this.getLaboratory(row).subscribe(
        data => {
          this.laboratory = data;
          console.log(this.laboratory);
        },
        _ => console.log('Get radiology Failed')
    );
    }

  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
 
  }
}
