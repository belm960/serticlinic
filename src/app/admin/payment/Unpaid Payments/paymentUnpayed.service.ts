import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaymentUnpayed } from './payment.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class PaymentServiceUnpayed {
  private readonly API_URL = 'assets/data/payment.json';
  dataChange: BehaviorSubject<PaymentUnpayed[]> = new BehaviorSubject<PaymentUnpayed[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): PaymentUnpayed[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllPayments(): void {
    this.httpClient.get<PaymentUnpayed[]>(this.API_URL).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  // DEMO ONLY, you can find working methods below
  addPayment(payment: PaymentUnpayed): void {
    this.dialogData = payment;
  }
  updatePayment(payment: PaymentUnpayed): void {
    this.dialogData = payment;
  }
  deletePayment(id: number): void {
    console.log(id);
  }
}
