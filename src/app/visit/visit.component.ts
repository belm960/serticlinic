import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { PatientsComponent } from '../doctor/patient/patients/patients.component';
import { WindowScrollController } from '@fullcalendar/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Visit } from '../shared/security/visit';
import {apiUrl} from 'src/environments/environment';
import { PatientVisits } from './patientvisit.model';
import { TokenStorageService } from '../shared/security/token-storage.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Radiology } from '../radiology/radiology';
import { catchError } from 'rxjs/operators';
import { Patient } from '../admin/patients/allpatients/patient.model';
import { RightSidebarService } from '../shared/services/rightsidebar.service';
import { Appointment } from '../admin/appointment/viewappointment/appointment.model';
@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.sass']
})
export class VisitComponent implements OnInit {
  visit: Visit;
  visitid= this.getRandomID();
  panelOpenState = false;
  selection = new SelectionModel<any>(true, []);
  step = 0;
  patient: Patient = new Patient({});
  ccForm: FormGroup;
  physicalExamination: FormGroup;
  iatForm: FormGroup;
  room=true;
  itemlab=[
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
  subItem:[{name: "X-Ray",price: 200,selected: false}]},
  {
  name: "Echocardiography",
  subItem:[{name: "Echocardiography",price: 150,selected: false}]},
  {
  name: "Ultrasound",
  subItem:[
    {name: "Abdominal Ultrasound",price: 150,selected: false},
    {name: "Pelvic Ultrasound",price: 110,selected: false},
    {name: "Obstetric Ultrasound",price: 140,selected:false},
    {name: "Other Ultrasound",price: 170,selected:false}
  ]}, 
  {
  name: "ECG",
  subItem: [{name: "ECG",price: 320,selected: false}]}
];
lab=false;
rad= false;
radPrice: any;
labPrice: any;
  indicate1=false;
  appointment: Appointment= new Appointment({});
  constructor(private fb: FormBuilder, private httpClient: HttpClient,private token: TokenStorageService,private router: Router) {
    this.ccForm = this.fb.group({
      cc: [''],
      hpi: [''],
      chi1:[''],
      chi2:[''],
      adi1: [''],
      adi2: [''],
      obsteric1: [''],
      obsteric2: [''],
      psi1:[''],
      psi2:[''],
      other1:[''],
      other2:[''],
      maf1:[''],
      maf2:[''],
      siblings1:[''],
      siblings2:[''],
      other3:[''],
      other4:['']      
    });

    this.physicalExamination = this.fb.group({
      heent1: [''],
      heent2: [''],
      lns1:[''],
      lns2:[''],
      cvs1: [''],
      cvs2: [''],
      abdomen1: [''],
      abdomen2: [''],
      gus1:[''],
      gus2:[''],
      mss1:[''],
      mss2:[''],
      cns1:[''],
      cns2:[''],
      bp:[''],
      hr:[''],
      br:[''],
      temp:[''],       
    });

    this.iatForm = this.fb.group({
      investigation: [''],
      dx: [''],
      treatment:[''],
    });

  }
  ngOnInit(): void {
    this.getPatient();
    this.getVisits();
    this.getRadPrice();
    this.getLabPrice();
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
  getLabPrice(){
    this.httpClient.get(apiUrl+'/LabPrice').subscribe(
      data=>{
        this.labPrice=data;
        this.assignPricelab();
        console.log(this.itemlab);
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
  assignPricelab(){
    this.labPrice.forEach(element => {
      this.itemlab.forEach(item=>{
        item.subItem.forEach(subitem=>{
          if(subitem.name==element.name){
            subitem.price=element.price;
          }
        })
      })
    });
  }


  display(){
    console.log(this.ccForm);
  }
  getid(){
    return window.localStorage.getItem('patient_id');
 }
 setStep(index: number) {
  this.step = index;
}
nextStep() {
  this.step++;
}
prevStep() {
  this.step--;
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
    status: ["inprogress"]
  })
}
clicked(subItem){
  if(subItem.selected){
    subItem.selected=false;
  }else if(!subItem.selected){
  subItem.selected=true;}
  
  
  console.log(subItem)
}
submitAssessment(){
  this.itemlab.forEach(item=>{item.subItem.forEach(sub=>{if(sub.selected){
          this.lab=true;
          this.httpClient.post(apiUrl+'/Laboratory/',{"test": sub.name,"requestedBy": this.token.getUsername(), "receivedDate":new Date(),"vid": this.visitid}).subscribe(
            data=>{
              this.httpClient.post(apiUrl+'/Payment/',
                { "cost": sub.price,
                  "total": 100,
                  "title": sub.name + " Test",
                  "date": new Date(),
                  "pid": this.getid(),
                  "vid": this.visitid}
              ).subscribe(
                data=>{
                  this.httpClient.put(apiUrl+'/Patient/Payment/'+this.getid(),{"pStatus":"PENDING"}).subscribe();
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
            "pid": this.getid(),
            "vid": this.visitid}
        ).subscribe(
          data=>{
            this.httpClient.put(apiUrl+'/Patient/Payment/'+this.patient.patient_ID,{"pStatus":"PENDING"}).subscribe(
              data=>{
                console.log(data);
              }
            );
          }
        );
          },error=>{console.log(error);}
        );
      }
        }
      );
    }
  );
  if(this.rad&&this.lab){
    this.httpClient.put(apiUrl+'/Patient/Rad/'+this.getid(),{"rad":"1","sortDate":new Date()}).subscribe(
      data=>{
        this.httpClient.put(apiUrl+'/Patient/Lab/'+this.getid(),{"lab":"1","sortDate":new Date()}).subscribe(

          data=>{Swal.fire('Successfull','Tell the patient to Pay the bill','success');
          this.router.navigateByUrl('/doctor/patient/to-test-patients');}
        );
      }
    );
  }else if(this.rad){this.httpClient.put(apiUrl+'/Patient/Rad/'+this.getid(),{"rad":"1","sortDate":new Date()}).subscribe(
    data=>{
      Swal.fire('Successfull','Tell the patient to Pay the bill','success');
      this.router.navigateByUrl('/doctor/patient/to-test-patients');}
  );}else if(this.lab){this.httpClient.put(apiUrl+'/Patient/Lab/'+this.getid(),{"lab":"1","sortDate":new Date()}).subscribe(
    data=>{
      Swal.fire('Successfull','Tell the patient to Pay the bill','success');
      this.router.navigateByUrl('/doctor/patient/to-test-patients');}
  );}else {
    Swal.fire('Choose','Choose at least One please','warning');
  }
}
  PostFirstVisit(){
    const{cc,hpi,chi1,chi2,adi1,adi2,obsteric1,obsteric2,psi1,psi2,other1,other2,maf1,maf2,siblings1,siblings2,other3,other4}=this.ccForm.value;
    const {heent1,heent2,lns1,lns2,cvs1,cvs2,abdomen1,abdomen2,gus1,gus2,mss1,mss2,cns1,cns2,bp,hr,br,temp} = this.physicalExamination.value;
    const PhysicalData: PatientVisits = {
      id: this.visitid,
      doctorName: this.token.getUsername(),
      date: new Date(),
      pid: this.getid(),
      conditions: "first",
      cc: cc,
      hpi: hpi,
      pastHistory: chi1+": "+chi2+"?"+
                  adi1+": "+adi2+"?"+
                  obsteric1+": "+obsteric2+"?"+
                  psi1+": "+psi2+"?"+
                  other1+": "+other2,
      familyHistory: maf1+": "+maf2+"?"+
                    siblings1+": "+siblings2+"?"+
                    other3+": "+other4,
      heent:heent1+", "+heent2,
      lns:lns1+", "+lns2,
      cvs: cvs1+", "+cvs2,
      abdomen: abdomen1+","+abdomen2,
      gus: gus1+", "+gus2,
      mss: mss1+", "+mss2,
      cns: cns1+", "+cns2,
      bp:bp,
      pr:hr,
      rr:br,
      temp: temp,
    };
   this.httpClient.post(apiUrl+'/Visit/',PhysicalData).subscribe(data => { 
      this.httpClient.put(apiUrl+'/Patient/v/'+this.getid(),this.createContactForm2().value).subscribe(
        data=> {
        this.httpClient.put(apiUrl+'/paymentvid/'+this.getid(),{"vid": this.visitid})
        console.log(data);
      }
    );
    });
   console.log(PhysicalData);
   
  }

  PostLastVisit(){
   this.httpClient.put(apiUrl+'/Visit/'+this.visitid,this.iatForm.value).subscribe(data => {
    Swal.fire('Successfully Finished');
    },
    error=>{
      Swal.fire('OPS!','There is an Error please try again','error');
    });
  }

  Finish(){
    Swal.fire({
      title: 'Are You Sure?',
      text: "This will Back the patient to reception",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, transfer it!'
    }).then(result => {
      if (result.value) {
        this.httpClient.put(apiUrl+'/Patient/Finish/'+this.patient.patient_ID,{}).subscribe(
          data=>{
            console.log(data);
            this.router.navigate(['/doctor/patient/patients']);
          }
        );
        Swal.fire('Successfully Finished');
  }}) 
}
  getAllPatientsVisits(): Observable<Visit> {
    const url = apiUrl+'/Visits/'+this.getid();
    return this.httpClient.get<Visit>(url).pipe(
        catchError(_ => {
            console.log("Get Detail Failed");
            return of(new Visit(this.patient));
        })
    );
  }

  getVisits(): void {
    this.getAllPatientsVisits().subscribe(
        data => {
          this.visit = data;
        },
        _ => console.log('Get Patient Failed')
    );
    }

  getAllPatient(): Observable<Patient> {
      const url = apiUrl+'/Patient/'+this.getid();
      return this.httpClient.get<Patient>(url).pipe(
          catchError(_ => {
              console.log("Get Detail Failed");
              return of(new Patient(this.patient));
          })
      );
    }
    getPatient(): void {
      this.getAllPatient().subscribe(
          data => {
            this.patient = data;
          },
          _ => console.log('Get Patient Failed')
      );
      }
  addAppointment(){
    this.indicate1=true;
    console.log(this.patient.patient_ID);
}
  closeAppointment(){
        this.indicate1= false;
    }
  addRoom(){
        Swal.fire({
          title: 'Are You Sure?',
          text: "This will Sent the patient to Room service Room to get Room!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, transfer it!'
        }).then(result => {
          if (result.value) {
            this.httpClient.put(apiUrl+'/Patient/Rooms/'+this.patient.patient_ID,{"room":"yes"}).subscribe(data => {
            console.log(data);
            this.patient.room='no';
              })
            Swal.fire('Transferd!', 'Success');
            
      }})
      }
      submitAppointment(){
        console.log(this.patient.first +" "+ this.patient.last);
        this.httpClient.post(apiUrl+'/appointement/',{
      
          "patientName": this.patient.first +" "+ this.patient.last,
          "date": this.appointment.date,
          "email": this.patient.email,
          "mobile": this.patient.mobile,
          "disease": this.appointment.disease,
          "doctorid": window.sessionStorage.getItem('user-id'),
          "pid": this.getid(),
          "status": "PENDING"
        }).subscribe(data => {
            console.log(data);
            Swal.fire('Successful','You Have Added Appointment Successfully','success');
            this.indicate1= false;
            this.appointment= new Appointment({})
              }
              ,error=>{
                Swal.fire('Error','There is an Error Please Try Again','error');
              }
              );
      
      }
  }