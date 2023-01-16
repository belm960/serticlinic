import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/shared/security/doctor';
import { Pat } from 'src/app/shared/security/patient';
import { Patient } from '../allpatients/patient.model';
import {apiUrl} from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.sass'],
})
export class AddPatientComponent implements OnInit, AfterViewInit {

  name = 'Angular Material Table with Material Radio Group';
  public custSource: any = new MatTableDataSource<customer>(customerData) ;
  public gaSource: any = new MatTableDataSource<ga>(gaData) ;
  public mhSource: any = new MatTableDataSource<mh>(mhData) ;
  public customerdisplayedColumns: string[] =['name', 'langselection','remark'];
  public gadisplayedColumns: string[] =['name', 'langselection','remark'];
  public mhdisplayedColumns: string[] =['name', 'langselection','remark'];
  selectedcustomers = new SelectionModel<customer>(true, []);
  selectedga = new SelectionModel<ga>(true, []);
  selectedmh = new SelectionModel<mh>(true, []);
  public mylanguages = languages;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
   ngOnInit() {
    
    this.custSource.sort = this.sort;
    this.custSource.paginator = this.paginator;
    
  }
  ngAfterViewInit() { 
    
  }

  isAllCustSelected(): boolean {
    const numSelected = this.selectedcustomers.selected.length;
    const numRows = this.custSource.data.length;
    return numSelected === numRows;
  }

  isAllGaSelected(): boolean {
    const numSelected = this.selectedcustomers.selected.length;
    const numRows = this.custSource.data.length;
    return numSelected === numRows;
  }
   isAllMhSelected(): boolean {
    const numSelected = this.selectedcustomers.selected.length;
    const numRows = this.custSource.data.length;
    return numSelected === numRows;
  }
  
  SelectAllCustomers() {
    this.isAllCustSelected() ? this.selectedcustomers.clear() :this.custSource.data.forEach(row => this.selectedcustomers.select(row));

  }
  SelectAllGa() {
    this.isAllCustSelected() ? this.selectedcustomers.clear() :this.custSource.data.forEach(row => this.selectedcustomers.select(row));

  }
  SelectAllMh() {
    this.isAllMhSelected() ? this.selectedcustomers.clear() :this.custSource.data.forEach(row => this.selectedcustomers.select(row));

  }
  applycustomFilter(filterValue: string) {
    this.custSource.filter = filterValue.trim().toLowerCase();
  }

  /**  new file */
  patientForm: FormGroup;
  isLinear = false;
  HFormGroup1: FormGroup;
  HFormGroup2: FormGroup;
  VFormGroup1: FormGroup;
  VFormGroup2: FormGroup;
  VFormGroup3: FormGroup;
  constructor(private http:HttpClient,private router:Router,private fb: FormBuilder) {
    this.patientForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: [''],
      gender: ['', [Validators.required]],
      mobile: [''],
      dob: ['', [Validators.required]],
      age: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      maritalStatus: [''],
      address: [''],
      bGroup: [''],
      bPresure: [''],
      sugger: [''],
      injury: [''],
      uploadImg: [''],
    });
    this.HFormGroup1 = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.HFormGroup2 = this.fb.group({
      address: ['', Validators.required],
    });
    this.VFormGroup1 = this.fb.group({
      hpi: [''],
      pahi: [''],
      chco: [''],
    });
    this.VFormGroup2 = this.fb.group({
      bpr: [''],
      hra: [''],
      bra: [''],
      templ: [''],
    });
    this.VFormGroup3 = this.fb.group({
      currentmedication: [''],
      allengied: [''],
      assessment: [''],
      investigation: [''],
      dx: [''],
      treatment: [''],  
      maritalStatus:[''],
      habit: [''],
      workhistory: [''],
      education: [''],
      exercise: [''],
    });
  }

  onSubmit() {

    console.log('Form Value', this.patientForm.value);
    this.http.post(apiUrl+'/Patient/',this.patientForm.value).subscribe(data => {
      console.log(data);
    })
    this.router.navigateByUrl("/admin/patients/all-patients");
    this.router.navigateByUrl("/admin/patients/all-patients");
  }
}
 
/**this is for table 1 */
export const customerData: customer[] = [
{name: 'Mother And Father', remark: '',  language: ''},
{name: 'Sibilings',  remark: '',  language: ''},
{name: 'other', remark: '', language: ''},
];
/**this is for table 2*/
export const gaData: ga[] = [
{name: 'heart', remark: '',  language: ''},
{name: 'LNS',  remark: '',  language: ''},
{name: 'CVS', remark: '', language: ''},
{name: 'Abdomen', remark: '',  language: ''},
{name: 'GUS',  remark: '',  language: ''},
{name: 'MSS', remark: '', language: ''},
{name: 'CNS', remark: '',  language: ''},
{name: 'Other', remark: '', language: ''},
];
/**this is for table 3*/
export const mhData: mh[] = [
{name: 'heart disease', remark: '',  language: ''},
{name: 'Hypertention',  remark: '',  language: ''},
{name: 'dislepedia', remark: '', language: ''},
{name: 'diabtis', remark: '',  language: ''},
{name: 'cancer',  remark: '',  language: ''},
{name: 'Asthma', remark: '', language: ''},
{name: 'Past illness', remark: '',  language: ''},
{name: 'previous addmission', remark: '', language: ''},
{name: 'Other', remark: '', language: ''},
];
export class customer {
  public name: string;
  public remark: string;
  public language: string;
 }
 export class ga {
  public name: string;
  public remark: string;
  public language: string;
 }
export class mh {
  public name: string;
  public remark: string;
  public language: string;
 }

export const languages: Array<string> = ['Normal','Abnormal'];