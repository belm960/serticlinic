import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PaymentReceptionService } from '../../paymentReceptionservice';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Payment } from '../../payment.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
@Component({
  selector: 'app-forminvoice-dialog',
  templateUrl: './forminvoice-dialog.component.html',
  styleUrls: ['./forminvoice-dialog.component.sass']
})
export class FormInvoiceDialogComponent {
  action: string;
  dialogTitle: string;
  paymentForm: FormGroup;
  payment: Payment;
  payments: Payment;
  vid: any;
  pay: any;
  sum: number;
  constructor(
    public dialogRef: MatDialogRef<FormInvoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public paymentService: PaymentReceptionService,
    private fb: FormBuilder,
    private httpClient: HttpClient
  ) {
    // Set the defaults
    
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.payment.first +" "+ data.payment.last;
      this.vid= data.payment.vid;
      this.payments = data.payment;
    } else {
      this.dialogTitle = 'New Payment';
      this.payments = new Payment({});
    }
    this.getPayments();
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
 
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getAllPayments(): Observable<any> {
    const url = `${apiUrl}/AllPaymentOfVisit/${this.vid}`;
    return this.httpClient.get(url).pipe(
        )
  }
  getPayments(): void {
  this.getAllPayments().subscribe(
      data => {
        this.payment = data;
        this.pay = data;
        this.add();
      },
      _ => console.log('Get Patient Failed')
  );
  }
print(){
  console.log('samuel')
  window.print();
}
add(){
  this.sum = 0;
  console.log(this.pay);
  this.pay.forEach((payment)=>{
      this.sum+=payment.cost;
  });
}
}
