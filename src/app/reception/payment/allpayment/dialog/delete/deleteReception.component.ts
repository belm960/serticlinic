import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PaymentReceptionService } from '../../paymentReceptionservice';
@Component({
  selector: 'app-deleteReception',
  templateUrl: './deleteReception.component.html',
  styleUrls: ['./deleteReception.component.sass']
})
export class DeleteReceptionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteReceptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public paymentService: PaymentReceptionService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.paymentService.deletePayment(this.data.payment_id,this.data.status);
  }
}
