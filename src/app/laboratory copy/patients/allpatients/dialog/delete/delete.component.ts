import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PatientsRadService } from '../../patientsrad.service';
import { FormGroup } from '@angular/forms';
import { apiUrl } from 'src/environments/environment';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass'],
})
export class DeleteComponent { 
  httpClient: any;
  docForm: FormGroup;
  patient_ID: any;
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public patientsService: PatientsRadService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
  const rooturl = apiUrl+'/Patient';
  this.httpClient.delete(rooturl + '/' + this.patient_ID,this.docForm.value).subscribe(data => {        
    console.log(data);
     });
  }
}