import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PatientsService } from '../../patients.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Patient } from '../../patient.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {apiUrl} from 'src/environments/environment';
import Swal from 'sweetalert2';
import { TokenStorageService } from 'src/app/shared/security/token-storage.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  patientForm: FormGroup;
  patient: Patient;
  selection = new SelectionModel<any>(true, []);
  item=[
    {
    name: "Hematology",
    subItem:[
      {name : "WBC Count",price: 50,selected: false},
      {name : "Differential Count",price: 60,selected: false},
      {name : "Haemoglobin",price: 90,selected: false},
      {name : "Hematocrit",price: 50,selected: false},
      {name : "Platelet count ",price: 60,selected: false},
      {name : "CBC",price: 90,selected: false},
      {name : "ESR",price: 50,selected: false},
      {name : "Reticulocyte ",price: 60,selected: false},
      {name : "Blood Morphology",price: 90,selected: false},
      {name : "Blood Group & Rh",price: 90,selected: false},
            ]},
    {
    name: "Coagulation",
    subItem:[
      {name : "Bleeding Time",price: 50,selected: false},
      {name : "Clotting Time",price: 80,selected: false},
      {name : "Cross-match",price: 50,selected: false},
      {name : "Prothrombin Time  (PT)",price: 60,selected: false},
      {name : "aPTT",price: 90,selected: false},
      {name : "Fibrinogen",price: 50,selected: false},
      {name : "INR ",price: 60,selected: false},
            ]},
    {
    name: "Parasitology",
    subItem:[
      {name: "Blood Film Test",price: 40,selected: false},
      {name: "Stool Examination direct",price: 70,selected: false},
      {name: "Stool Examination concentration ",price: 70,selected: false},
      {name: "Cryptosporidium ",price: 70,selected: false},
      {name: "Skin snip",price: 70,selected: false}
      
    ]},
    {
    name: "Urinanalysis",
    subItem: [
      {name: "Macroscopic Examination",price: 120,selected: false},
      {name: "Chemical Examination",price: 100,selected: false},
      {name: "Microscopic examination ",price: 100,selected: false},
    ]},
    {
    name: "SEROLOGY",
    subItem: [
      {name: "VDRL/RPR",price: 120,selected: false},
      {name: "TPHA",price: 100,selected: false},
      {name: "Widal",price: 100,selected: false},
      {name: "Wel felix",price: 120,selected: false},
      {name: "Brucella",price: 100,selected: false},
      {name: "HBsAg ",price: 100,selected: false},
      {name: "Anti HCV",price: 120,selected: false},
      {name: "HIV divice",price: 100,selected: false},
      {name: "HIV Viral load ",price: 100,selected: false},
      {name: "VDRL/RPR",price: 120,selected: false},
      {name: "ASO (qualitative)",price: 100,selected: false},
      {name: "ASO (quantitative)",price: 100,selected: false},
      {name: "RF (qualitative)",price: 100,selected: false},
      {name: "RF (quantitative)",price: 100,selected: false},
      {name: "CRP (qualitative)",price: 120,selected: false},
      {name: "CRP (quantitative)",price: 100,selected: false},
      {name: "ANA",price: 100,selected: false},
      {name: "Urine HCG",price: 120,selected: false},
      {name: "Beta HCG  (qualitative)",price: 100,selected: false},
      {name: "Beta HCG (quantitative)",price: 100,selected: false},
      {name: "H. Paylori Ab- serum ",price: 100,selected: false},
      {name: "H. Paylori Ag- stool",price: 100,selected: false},
      {name: "Troponin qualitative",price: 100,selected: false},
      {name: "RF (quantitative)",price: 100,selected: false},
      {name: "Coombs – Direct ",price: 120,selected: false},
      {name: "Coombs – Inirect ",price: 100,selected: false}
      
    ]},
    //chemistry
    {
    name: "SUGAR GLUCOSE",
    subItem: [
      {name: "FBS",price: 120,selected: false},
      {name: "RBS",price: 100,selected: false},
      {name: "OGTT (Oral glucose tolerance test) ",price: 100,selected: false},
      {name: "Glycated haemoglobin  HgA1C",price: 100,selected: false},
    ]},
  
    {
    name: "LIVER FUNCTION TEST ",
    subItem: [
      {name: "AST/SGOT",price: 120,selected: false},
      {name: "ALT/SGOPT",price: 100,selected: false},
      {name: "ALP",price: 100,selected: false},
      {name: "Bilirubin Total",price: 100,selected: false},
      {name: "Bilirubin Direct",price: 100,selected: false},
      {name: "Bilirubin Indirect",price: 100,selected: false},
    ]},
    {
    name: "RENAL FUNCTION TEST  ",
    subItem: [
      {name: "BUN",price: 120,selected: false},
      {name: "Creatinin",price: 100,selected: false},
      {name: "Uric acid",price: 100,selected: false},
    ]},
    
    {
    name: "LIPID PROFILE",
    subItem: [
      {name: "T. Cholesterol",price: 120,selected: false},
      {name: "Triglyceride",price: 100,selected: false},
      {name: "HDL",price: 100,selected: false},
      {name: "LDL",price: 100,selected: false},
    ]},
  
    {
    name: "PANCRITIC FUNCTIONAL TEST",
    subItem: [
      {name: "Lipase",price: 120,selected: false},
      {name: "Amylase",price: 100,selected: false},
      
    ]},
  
    {
    name: "ELECTROLYTE TEST",
    subItem: [
      {name: "Sodium (Na)",price: 120,selected: false},
      {name: "Potassium (K)",price: 100,selected: false},
      {name: "Calcium (Ca)",price: 100,selected: false},
      {name: "Chloride (Cl)",price: 100,selected: false},
      {name: "Phosphorus (Po4)",price: 100,selected: false},
      {name: "Magnesium (Mg)",price: 100,selected: false},
      {name: "Calcium ionized",price: 100,selected: false},
    ]},
  
    
    {
    name: "CARDIAC MARKER TEST",
    subItem: [
      {name: "CK-MB",price: 120,selected: false},
      {name: "CK- total",price: 100,selected: false},
      {name: "Troponin",price: 100,selected: false},
      
    ]},
  
    {
    name: "OTHER CHEMISTRY TESTS",
    subItem: [
      {name: "TIBC",price: 120,selected: false},
      {name: "Total protein",price: 100,selected: false},
      {name: "Albumin",price: 100,selected: false},
      {name: "Iorn (Fe)",price: 100,selected: false},
      {name: "Feritine",price: 100,selected: false},
      {name: "Transferin saturation",price: 100,selected: false},
      {name: "Serum folate",price: 100,selected: false},
      {name: "Acid phosphatise",price: 100,selected: false},
      {name: "24 hour urine protein",price: 100,selected: false},
      {name: "GGT",price: 100,selected: false},
      {name: "LDH (lactate dehydrogenise)",price: 100,selected: false},
    ]},
  
    {
    name: "ENDOCRINOLOGY",
    subItem: [
      {name: "TSH",price: 120,selected: false},
      {name: "Total T3",price: 100,selected: false},
      {name: "Total T4",price: 100,selected: false},
      {name: "Free T3",price: 100,selected: false},
      {name: "Free T4",price: 100,selected: false},
      {name: "FSH",price: 100,selected: false},
      {name: "LH",price: 100,selected: false},
      {name: "Prolactin",price: 100,selected: false},
      {name: "Testosterone",price: 100,selected: false},
      {name: "Progesterone",price: 100,selected: false},
      {name: "Estradiol",price: 100,selected: false},
      {name: "Serum calcitonin",price: 100,selected: false},
      {name: "Vitamin B12",price: 100,selected: false},
      {name: "Vitamin D",price: 100,selected: false},
    ]},
  {
    name: "MICROBIOLOGY",
    subItem: [
      {name: "Gram stain",price: 120,selected: false},
      {name: "KOH",price: 100,selected: false},
      {name: "Indian Ink",price: 100,selected: false},
      {name: "AFB (acid fast bacilli)",price: 100,selected: false},
      {name: "Body fluid",price: 100,selected: false},
      {name: "CSF",price: 100,selected: false},
      {name: "Semen analysis",price: 100,selected: false},
      {name: "Prulural fluid",price: 100,selected: false},
      {name: "Peritoneal fluid",price: 100,selected: false},
      {name: "Pericardial fluid",price: 100,selected: false},
      {name: "Nasal swab",price: 100,selected: false},
      {name: "Ear swab",price: 100,selected: false},
      {name: "Eye swab",price: 100,selected: false},
    ]},
    {
    name: "TUMOR MARKER",
    subItem: [
      {name: "PSA",price: 120,selected: false},
      {name: "AFP",price: 100,selected: false},
      {name: "CEA",price: 100,selected: false},
      {name: "CA 125",price: 100,selected: false},
      {name: "CA 19.9",price: 100,selected: false},
      {name: "CA 15.3",price: 100,selected: false},
      
    ]},
    {
    name: "PATHOLOGY",
    subItem: [
      {name: "Fluid cytology FNA",price: 120,selected: false},
      {name: "Histopathology",price: 100,selected: false},
      {name: "Punch biopsy",price: 100,selected: false},
      {name: "PAP smear",price: 100,selected: false},
      {name: "Bone marrow",price: 100,selected: false},
      
    ]},
    
  ];
  
  itemRadiology=[
    {
    name: "X-Ray",
    subItem:[{name: "X-ray",price: 200,selected: false}]},
    {
    name: "Echocardiography",
    subItem:[{name: "Echocardiography",price: 150,selected: false}]},
    {
    name: "Ultrasound",
    subItem:[
      {name: "Abdominal Ultrasound",price: 150,selected: false},
      {name: "Pelvic Ultrasound",price: 110,selected: false},
      {name: "Obsteric Ultrasound",price: 140,selected:false},
      {name: "Other Ultrasound",price: 170,selected:false}
    ]}, 
    {
    name: "ECG",
    subItem: [{name: "ECG",price: 320,selected: false}]}
  ];
  lab=false;
  rad= false;
  visitid= this.getRandomID();
  id: any;
  radPrice: any;
  constructor(
    public http: HttpClient,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public patientsService: PatientsService,
    private fb: FormBuilder,
    private router:Router,
    private httpClient: HttpClient,
    private token: TokenStorageService
  ) {
    // Set the defaults
    this.action = data.action;
    this.id=data.patient.patient_ID
    if (this.action === 'Add Procedure') {
      this.dialogTitle = data.patient.name;
      this.patient = data.patient;
    } else {
      this.dialogTitle = 'Add Procedure';
      this.patient = new Patient({});
    }
    this.patientForm = this.createContactForm();
    this.getRadPrice();
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
  public getRandomID(): string {
    var S4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
  createContactForm2(): FormGroup {
    return this.fb.group({
      v: [this.visitid],
      sortDate: [new Date()],
      status: ["procedure"]
    })
  }
  clicked(subItem){
    if(subItem.selected){
      subItem.selected=false;
    }else if(!subItem.selected){
    subItem.selected=true;}
    console.log(subItem)
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.patient.id],
      img: [this.patient.img],
      first: [this.patient.first],
      dob: [this.patient.dob],
      email: [this.patient.email],
      gender: [this.patient.gender],
      date: [this.patient.date],
      bGroup: [this.patient.bGroup],
      mobile: [this.patient.mobile],
      treatment: [this.patient.treatment],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    
    console.log('Form Value', this.patientForm.value);
    this.http.post(apiUrl+'/Patient/',this.patientForm.value).subscribe(data => {
      console.log(data);
    })

  }
  submitAssessment(){
    this.httpClient.post(apiUrl+'/Payment/',
                  { "cost": 100,
                    "total": 100,
                    "title": "Registration",
                    "date": new Date(),
                    "pid": this.id,
                    "vid": this.visitid}
                ).subscribe(
                  data=>{
                    this.httpClient.put(apiUrl+'/Patient/Payment/'+this.id,{"pStatus":"PENDING"}).subscribe();
                  },error=>{console.log(error)});
    this.item.forEach(item=>{item.subItem.forEach(sub=>{if(sub.selected){
            this.lab=true;
            this.httpClient.post(apiUrl+'/Laboratory/',{"test": sub.name,"requestedBy": this.token.getUsername(), "receivedDate":new Date(),"vid": this.visitid}).subscribe(
              data=>{
                this.httpClient.post(apiUrl+'/Payment/',
                  { "cost": sub.price,
                    "total": 100,
                    "title": sub.name + " Test",
                    "date": new Date(),
                    "pid": this.id,
                    "vid": this.visitid}
                ).subscribe(
                  data=>{
                    this.httpClient.put(apiUrl+'/Patient/Payment/'+this.id,{"pStatus":"PENDING"}).subscribe();
                  },error=>{console.log(error)});
              },
              error=>{console.log(error);}
            );
            
            }
          }
        );
      }
    );
    this.itemRadiology.forEach(
      item=>{
        item.subItem.forEach(
          sub=>{
            if(sub.selected){
              this.rad=true;
              this.httpClient.post(apiUrl+'/Radiology/',{"examRequested": sub.name,"requestedBy": this.token.getUsername(), "vid": this.visitid}).subscribe(
                data=>{
              this.httpClient.post(apiUrl+'/Payment/',
            { "cost": sub.price,
              "total": 100,
              "title": sub.name + " Test",
              "date": new Date(),
              "pid": this.id,
              "vid": this.visitid}
          ).subscribe(
            data=>{
              this.httpClient.put(apiUrl+'/Patient/Payment/'+this.id,{"pStatus":"PENDING"}).subscribe();
            }
          );
            },error=>{console.log(error);}
          );
        }
          }
        );
      }
    );
    this.PostFirstVisit();
    this.routingPatient();
    
  }
  routingPatient(){
    if(this.rad&&this.lab){
      this.httpClient.put(apiUrl+'/Patient/Rad/'+this.id,{"rad":"1","sortDate":new Date()}).subscribe(
        data=>{
          this.httpClient.put(apiUrl+'/Patient/Lab/'+this.id,{"lab":"1","sortDate":new Date()}).subscribe(
  
            data=>{Swal.fire('Successfull','Tell the patient to Pay the bill','success');
            this.router.navigateByUrl('/reception/payment/all-payment-unpayed');}
          );
        }
      );
    }else if(this.rad){this.httpClient.put(apiUrl+'/Patient/Rad/'+this.id,{"rad":"1","sortDate":new Date()}).subscribe(
      data=>{
        Swal.fire('Successfull','Tell the patient to Pay the bill','success');
        this.router.navigateByUrl('/reception/payment/all-payment-unpayed');}
    );}else if(this.lab){this.httpClient.put(apiUrl+'/Patient/Lab/'+this.id,{"lab":"1","sortDate":new Date()}).subscribe(
      data=>{
        Swal.fire('Successfull','Tell the patient to Pay the bill','success');
        this.router.navigateByUrl('/reception/payment/all-payment-unpayed');}
    );}else {
      Swal.fire('Choose','Choose at least One please','warning');
    }
  }
  PostFirstVisit(){
   this.httpClient.post(apiUrl+'/Visit/',{
      "id": this.visitid,
      "doctorName": this.token.getUsername(),
      "date": new Date(),
      "pid": this.id,
   }).subscribe(data => { 
      this.httpClient.put(apiUrl+'/Patient/v/'+this.id,this.createContactForm2().value).subscribe(
        data=> {
      }
    );});
   
  }

  getRadPrice(){
    this.httpClient.get(apiUrl+'/RadPrice').subscribe(
      data=>{
        this.radPrice=data;
        this.assignPrice();
        console.log(this.itemRadiology);
      },
      error=>{
        alert(error);
      }
    );
  }

  assignPrice(){
    this.radPrice.forEach(element => {
      this.itemRadiology.forEach(item=>{
        item.subItem.forEach(subitem=>{
          if(subitem.name==element.name){
            subitem.price=element.price;
          }
        })
      })
    });
  }
}
