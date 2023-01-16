import { NgbPaginationNumber } from "@ng-bootstrap/ng-bootstrap";


export class Patient {
  id: number;
  img: string;
  patient_ID: string;
  name: string;
  first:string;
  last: string;
  dob:string;
  email:string;
  gender: string;
  bGroup: string;
  date: string;
  address: string;
  mobile: string;
  treatment: string;
  v: number;
  lab: number;
  rad: number;
  sortDate: Date;
  roomNo: string;
  room: string;
  constructor(patient) {
    {
      this.id = patient.id || '';
      this.id = patient.patient_ID || '';
      this.img = patient.avatar || 'assets/images/user/user1.jpg';
      this.name = patient.name || '';
      this.first = patient.first || '';
      this.first = patient.last  || '';
      this.gender = patient.gender || 'male';
      this.email = patient.email || '';
      this.bGroup = patient.bGroup || '';
      this.date = patient.date || '';
      this.address = patient.address || '';
      this.mobile = patient.mobile || '';
      this.treatment = patient.treatment || '';
      this.dob = patient.dob || '' ;
      this.v = patient.v || '' ;
      this.roomNo =patient.roomNo || '' ;
      this.room = patient.room || '' ;
      
    }
  }
  public getRandomID(): string {
    var S4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
