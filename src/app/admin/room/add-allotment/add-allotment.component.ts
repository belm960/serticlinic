import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {apiUrl} from 'src/environments/environment';
@Component({
  selector: 'app-add-allotment',
  templateUrl: './add-allotment.component.html',
  styleUrls: ['./add-allotment.component.sass']
})
export class AddAllotmentComponent {
  roomForm: FormGroup;
  constructor(private http:HttpClient,private fb: FormBuilder, private router:Router) {
    this.roomForm = this.fb.group({
      rNo: ['', [Validators.required]],
      rType: ['', [Validators.required]],
      pName: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      aDate: ['', [Validators.required]],
      dDate: ['', [Validators.required]]
    });
  }
  onSubmit() {
    console.log('Form Value', this.roomForm.value);
      this.http.post(apiUrl+'/room',this.roomForm.value).subscribe(data => {
        console.log(data);
        this.router.navigate(['/admin/room/all-allotment']);
      })
    }
}
