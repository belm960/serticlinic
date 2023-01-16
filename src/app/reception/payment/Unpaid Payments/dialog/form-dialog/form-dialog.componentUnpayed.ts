import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PaymentServiceUnpayedR } from '../../paymentRUnpayed.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { PaymentUnpayed } from '../../payment.model';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponentUnpayed {
  action: string;
  dialogTitle: string;
  paymentForm: FormGroup;
  payment: PaymentUnpayed;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponentUnpayed>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public paymentService: PaymentServiceUnpayedR,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.payment.first + data.payment.last;
      this.payment = data.payment;
    } else {
      this.dialogTitle = 'New Payment';
      this.payment = new PaymentUnpayed({});
    }
    this.paymentForm = this.createContactForm();
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
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.payment.payment_id],
      first: [this.payment.first],
      last: [this.payment.last],
      charges: [this.payment.cost],
      date: [this.payment.date],
      title: [this.payment.title],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.paymentService.addPayment(this.paymentForm.getRawValue());
  }
}
