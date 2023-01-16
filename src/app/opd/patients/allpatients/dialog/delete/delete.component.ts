import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PatientsopdService } from '../../patientsopd.service';
import { AllpatientsopdComponent } from '../../allpatientsopd.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass'],
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public patientsService: PatientsopdService,
    public Allpatientsopd: AllpatientsopdComponent
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
   this.Allpatientsopd.deleteItem;
  }
}
