import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./layout/header/header.component";
import { PageLoaderComponent } from "./layout/page-loader/page-loader.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { RightSidebarComponent } from "./layout/right-sidebar/right-sidebar.component";
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { DynamicScriptLoaderService } from "./shared/services/dynamic-script-loader.service";
import { ConfigService } from "./shared/services/config.service";
import { CalendarService } from "./calendar/calendar.service";
import { AppointmentService } from "./admin/appointment/viewappointment/appointment.service";
import { AppointmentsService } from "./doctor/appointments/appointments.service";
import { UpcomingAppointmentService } from "./patient/appointments/upcoming-appointment/upcoming-appointment.service";
import { PastAppointmentService } from "./patient/appointments/past-appointment/past-appointment.service";
import { DoctorsService } from "./admin/doctors/alldoctors/doctors.service";
import { StaffService } from "./admin/staff/allstaff/staff.service";
import { PatientService } from "./admin/patients/allpatients/patient.service";
import { PatientsService } from "./reception/patients/allpatients/patients.service";
import { RoomService } from "./admin/room/allroom/room.service";
import { PaymentService } from "./admin/payment/allpayment/payment.service";
import { ContactsService } from "./contacts/contacts.service";
import { RightSidebarService } from "./shared/services/rightsidebar.service";
import { AuthGuard } from "./shared/security/auth.guard";
import { AuthService } from "./shared/security/auth.service";
import { NgxSpinnerModule } from "ngx-spinner";
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from "ngx-perfect-scrollbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { NgxMaskModule } from "ngx-mask";
import { MatListModule } from "@angular/material/list";
import { SimpleDialogComponent } from "./ui/modal/simpleDialog.component";
import { DialogformComponent } from "./ui/modal/dialogform/dialogform.component";
import { BottomSheetOverviewExampleSheet } from "./ui/bottom-sheet/bottom-sheet.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { HttpClientModule } from "@angular/common/http";
import { ClickOutsideModule } from "ng-click-outside";
import { httpInterceptorProviders } from './shared/security/auth-interceptor';
import { PatientsopdService } from "./opd/patients/allpatients/patientsopd.service";
import { PatientsLabService } from "./laboratory/patients/allpatients/patientslab.service";
import { Room1Service } from "./Room/allroom/room1.service";
import { PaymentServiceUnpayed } from "./admin/payment/Unpaid Payments/paymentUnpayed.service";
import { PaymentServiceUnpayedR } from "./reception/payment/Unpaid Payments/paymentRUnpayed.service";
import { PaymentReceptionService } from "./reception/payment/allpayment/paymentReceptionservice";
import { UserService } from "./admin/user/alluser/user.service";
import { PatientsRadService } from "./laboratory copy/patients/allpatients/patientsrad.service";



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageLoaderComponent,
    SidebarComponent,
    RightSidebarComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    SimpleDialogComponent,
    DialogformComponent,
    BottomSheetOverviewExampleSheet,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonToggleModule,
    NgxSpinnerModule,
    ClickOutsideModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [httpInterceptorProviders,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    DynamicScriptLoaderService,
    ConfigService,
    RightSidebarService,
    AppointmentService,
    DoctorsService,
    StaffService,
    PatientService,
    RoomService,
    Room1Service,
    PatientsService,
    PatientsRadService,
    PatientsLabService,
    PaymentService,
    ContactsService,
    CalendarService,
    AppointmentsService,
    UpcomingAppointmentService,
    PastAppointmentService,
    AuthService,
    PatientsopdService,
    PaymentServiceUnpayed,
    PaymentServiceUnpayedR,
    PaymentReceptionService,
    UserService,
    AuthGuard,
  ],
  entryComponents: [
    SimpleDialogComponent,
    DialogformComponent,
    BottomSheetOverviewExampleSheet,
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
