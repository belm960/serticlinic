import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Payment } from './payment.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { apiUrl } from 'src/environments/environment';
@Injectable()
export class PaymentReceptionService {
  private readonly API_URL = apiUrl+'/PaidPayment';
  dataChange: BehaviorSubject<Payment[]> = new BehaviorSubject<Payment[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): Payment[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllPayments(): void {
    this.httpClient.get<Payment[]>(this.API_URL).subscribe(
      data => {
        console.log(data)
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  getAllPaymentsOfVisit(vid): void {
    this.httpClient.get<Payment[]>(apiUrl+'/AllPaymentOfVisit/'+vid).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  // DEMO ONLY, you can find working methods below
  addPayment(payment: Payment): void {
    this.dialogData = payment;
  }
  updatePayment(payment: Payment): void {
    this.dialogData = payment;
  }
  deletePayment(id: number,status:string): void {
    if(status=="PAYED"){
    this.httpClient.put(apiUrl+'/paymentStatus/'+id,{"status": "VOIDP"}).subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.log(error);
      });
    console.log(id);
    }else if(status=="VOIDP"){
      this.httpClient.put(apiUrl+'/paymentStatus/'+id,{"status": "PAYED"}).subscribe(
      data=>{
      console.log(data);
      },
      error=>{
      console.log(error);
    });
  console.log(id);}
}

  pay(id){
    this.httpClient.put(apiUrl+'/paymentStatus/'+id,{"status": "NOT_PAYED"}).subscribe(
      data=>{
      console.log(data);
      },
      error=>{
      console.log(error);
    });
  }
}