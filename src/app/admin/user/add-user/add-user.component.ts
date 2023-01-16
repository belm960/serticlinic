import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/security/auth.service';
import { Staff } from 'src/app/shared/security/staff';
import { apiUrl } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { forEachLeadingCommentRange } from 'typescript';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})
export class AddUserComponent {
  userForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dialogData: any;
  id= Math.floor(Math.random()*10000000);
  constructor(private http:HttpClient,private fb: FormBuilder,private authservice:AuthService,  private snackBar: MatSnackBar, private router:Router) {
    this.userForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
      conformPassword: ['', [Validators.required]],
      designation: [''],
      department: [''],
      address: [''],
      age: [''],
      enrolldate: [''],
      gfname: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      dob: ['', [Validators.required]],
      role:['',[Validators.required]],
      username:['',[Validators.required]],
      status: true
    });
  }
  get roles(): FormArray {
    return this.userForm.get('roles') as FormArray;
}
showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, '', {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}
  onSubmit() {
    const {first,last,gfname,username,gender,dob,age,department,mobile,designation,
      address,email,enrolldate,password,status,role} = this.userForm.value;

    const staffData: Staff = {
      id: this.id,first: first, last: last, gfname: gfname, dob: dob, age: age, username: username, gender: gender, department: department, mobile: mobile, designation: designation,
      address: address, email: email, password: password, status: status, role: [role],
      enrolldate: enrolldate
    };
    //const userData: User = {name:first,username:username,email:email,password: password,role: [role]};
    
    console.log('Form Value', staffData);
    this.http.post(apiUrl+'/api/auth/signup',staffData).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl("/admin/staff/all-staff");
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'staff Recorded successfully',
        showConfirmButton: false,
        timer: 1500
      });
    });
     
  }
}

