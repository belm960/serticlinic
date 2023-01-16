import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {apiUrl} from 'src/environments/environment';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.sass'],
})
export class EditPatientopdComponent {
  patientForm: FormGroup;
  id: any;
  formdata :any;
  constructor(private http:HttpClient,private router:Router,private fb: FormBuilder,private snackBar: MatSnackBar,private actRoute:ActivatedRoute) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.formdata = this.createContactForm(this.id);
    console.log('in the constructor')
    console.log(this.formdata);
    
  }
  ngOnInit() {
    console.log('i am on ng on init');
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.createContactForm(this.id);
  }
  onSubmit() {
    console.log('Form Value', this.patientForm.value);
    console.log(this.id);
    const rooturl = apiUrl+'/Patient';      
    this.http.put(rooturl + '/' + this.id,this.patientForm.value).subscribe(data => {        
           
      console.log(data);
      this.showNotification(
        'snackbar-danger',
        'Updating Recorded Successfully...!!!',
        'bottom',
        'center')                  
       });
    this.router.navigateByUrl("/reception/patients/all-patients");
  }


  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  createContactForm(id:any) : any {
    console.log(id)
    console.log('this is the id');
    const rooturl = apiUrl+'/Patient';      
     this.http.get(rooturl + '/' + id).subscribe(data => {        
      this.formdata = data; 
     this.patientForm = this.fb.group({
      first:  [ this.formdata.first],
      last: [this.formdata.last],
      gender: [this.formdata.gender, [Validators.required]],
      mobile: [this.formdata.mobile, [Validators.required]],
      age: [this.formdata.age],
      
      email: [
        this.formdata.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      bGroup: [this.formdata.bGroup],
      bPresure: [this.formdata.bPresure],
      address: [this.formdata.address[0].address_detail],
      dob: [this.formdata.dob, [Validators.required]],
      sugger: [this.formdata.sugger],
      injury: [this.formdata.injury],
                         
        });
     
  })
  
  
}
}