import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { UserService } from '../../user.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Staff } from '../../staff.model';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  userForm: FormGroup;
  user: Staff;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.user.name;
      this.user = data.user;
    } else {
      this.dialogTitle = 'New Staff';
      this.user = new Staff({});
    }
    this.userForm = this.createContactForm();
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
      id: [this.user.id],
      first: [this.user.first],
      email: [this.user.email],
      department: [this.user.department],
      gender: [this.user.gender],
      username: [this.user.username],
      age : [this.user.age],
      designation: [this.user.designation],
      address: [this.user?.address],
      mobile: [this.user.mobile],
      password:[this.user.password]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.userService.updateStaff(this.user.id,this.userForm.getRawValue());
  }
}
