import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DoctorsService } from '../../doctors.service';
import { FormGroup } from '@angular/forms';
import {apiUrl} from 'src/environments/environment';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteDialogComponent {
  httpClient: any;
  docForm: FormGroup;
  id :any;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public doctorsService: DoctorsService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
  const rooturl = apiUrl+'/User';
  this.httpClient.delete(rooturl + '/' + this.id,this.docForm.value).subscribe(data => {        
    console.log(data);
     });
  }
}
