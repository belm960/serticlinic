import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PaymentRoutingModule } from './payment-routing.module';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AllpaymentComponent } from './allpayment/allpayment.component';
import { FormDialogComponent } from './allpayment/dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './allpayment/dialog/delete/delete.component';
import { AllpaymentComponentUnpayed } from './Unpaid Payments/allpayment.component';
import { FormDialogComponentUnpayed } from './Unpaid Payments/dialog/form-dialog/form-dialog.componentUnpayed';
import { DeleteDialogComponentUnpayed } from './Unpaid Payments/dialog/delete/deleteUnpayed.component';
import { PriceComponent } from './price/price.component';
@NgModule({
  declarations: [
    AddPaymentComponent,
    InvoiceComponent,
    AllpaymentComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    AllpaymentComponentUnpayed,
    FormDialogComponentUnpayed,
    DeleteDialogComponentUnpayed,
    PriceComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSortModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
export class PaymentModule {}
