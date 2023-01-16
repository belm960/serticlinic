import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { apiUrl } from 'src/environments/environment';
import { Payment } from '../allpayment/payment.model';
@Injectable()
export class PaymentServiceUnpayedR {
  private readonly API_URL = apiUrl+'/NotPaidPayment';
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
    console.log("how are you")
    this.httpClient.get<Payment[]>(this.API_URL).subscribe(
      data => {
        this.dataChange.next(data);
        console.log(data);
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
    if(status=="NOT_PAYED"){
    this.httpClient.put(apiUrl+'/paymentStatus/'+id,{"status": "VOID"}).subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.log(error);
      });
    console.log(id);
    }else if(status=="VOID"){
      this.httpClient.put(apiUrl+'/paymentStatus/'+id,{"status": "NOT_PAYED"}).subscribe(
      data=>{
      console.log(data);
      },
      error=>{
      console.log(error);
    });
  console.log(id);}
}

  pay(id,pid){
    this.httpClient.put(apiUrl+'/paymentStatus/'+id,{"status": "PAYED"}).subscribe(
      data=>{
      console.log(data);
        this.httpClient.put(apiUrl+'/Patient/Payment/'+pid,{"pStatus":"PAYED"}).subscribe();
      },
      error=>{
      console.log(error);
      this.httpClient.put(apiUrl+'/Patient/Payment/'+pid,{"pStatus":"PAYED"}).subscribe();
    });
  }
}