export class Patient {
  patient_ID: number;
  img: string;
  name: string;
  first:string;
  last: string;
  address: string;
  dob:string;
  email:string;
  gender: string;
  bGroup: string;
  date: string;
  mobile: string;
  treatment: string;
  sortDate: Date;
  constructor(patient) {
    {
      this.patient_ID = patient.patient_ID || this.getRandomID();
      this.img = patient.avatar || 'assets/images/user/user1.jpg';
      this.name = patient.name || '';
      this.first = patient.first || '';
      this.gender = patient.gender || 'male';
      this.email = patient.email || '';
      this.bGroup = patient.bGroup || '';
      this.date = patient.date || '';
      this.mobile = patient.mobile || '';
      this.treatment = patient.treatment || '';
      this.dob = patient.dob || '' ;
    }
  }
  public getRandomID(): string {
    var S4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
