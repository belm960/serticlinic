import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StaffService } from '../allstaff/staff.service';
import {apiUrl} from 'src/environments/environment';
@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.sass']
})
export class AddStaffComponent {
  staffForm: FormGroup;
  hide3 = true;
  agree3 = false;
  constructor(private fb: FormBuilder,
              private staffService: StaffService,
              private httpClient: HttpClient,
              private router: Router) {
    this.staffForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      designation: [''],
      department: [''],
      address: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      dob: ['', [Validators.required]],
      education: ['']
    });
  }
  addStaff(staff): void {
    this.httpClient.post(apiUrl+'/Staff/',staff).subscribe(data=>{
      console.log(data);
      this.router.navigateByUrl('/admin/staff/all-staff')
    });
  }
  onSubmit() {
    console.log('Form Value', this.staffForm.value);
    this.addStaff(this.staffForm.value);
    }
}
