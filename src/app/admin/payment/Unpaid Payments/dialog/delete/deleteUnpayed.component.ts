import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PaymentServiceUnpayed } from '../../paymentUnpayed.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteDialogComponentUnpayed {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponentUnpayed>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public paymentService: PaymentServiceUnpayed
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.paymentService.deletePayment(this.data.id);
  }
}
