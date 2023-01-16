import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { AppointmentsService } from '../appointments.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

import { formatDate } from '@angular/common';
import { Appointment } from 'src/app/admin/appointment/viewappointment/appointment.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass'],
})
export class FormComponent {
  action: string;
  dialogTitle: string;
  isDetails = false;
  appointmentsForm: FormGroup;
  appointments: Appointment;
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public appointmentsService: AppointmentsService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'details') {
      this.appointments = data.appointments;
      this.isDetails = true;
    } else {
      this.isDetails = false;
      this.dialogTitle = 'New Appointments';
      this.appointments = new Appointment({});
      this.appointmentsForm = this.createContactForm();
    }
  }
  formControl = new FormControl('', [
    Validators.required,
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
      id: [this.appointments.id],
      img: [this.appointments.img],
      name: [this.appointments.patientName],
      email: [
        this.appointments.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      dateTime: [
        formatDate(this.appointments.date, 'yyyy-MM-dd, HH:mm', 'en'),
        [Validators.required],
      ],
      mobile: [this.appointments.mobile],
      disease: [this.appointments.disease],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.appointmentsService.addAppointments(
      this.appointmentsForm.getRawValue()
    );
  }
}
