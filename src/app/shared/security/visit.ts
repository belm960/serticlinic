import { StaffRoutingModule } from "src/app/admin/staff/staff-routing.module";

export class Visit {
    id: string;
    name: string;
    doctorName: string;
    date: Date;
    noteDetails:string;
    labDiagnosis: string;
    radDiagnosis: string;
    pid: string;
    prescription: string;
    conditions: string;
    disease: string;
    familyHistory: string;
    bp: string;
    pr: string;
    rr: string;
    temp: string;
    pastHistory: string;
    hpi:string;
    cc: string;
    heent: string;
    lns:string;
    cvs:string;
    abdomen: string;
    gus:string;
    mss: string;
    cns: string;
    investigation: string;
    dx: string;
    treatment: string;
    finished: boolean;

    constructor(visit) {
      {
        this.id = this.getRandomID();
        this.name = visit.name || '';
        this.doctorName=visit.doctorName || '';
        this.date = visit.date || '';
        this.noteDetails=visit.noteDetails || '';
        this.labDiagnosis= visit.labDiagnosis || '';
        this.radDiagnosis = visit.radDiagnosis || '';
        this.pid= visit.pid || this.getid();
        this.conditions= visit.conditions; 
        this.disease = visit.disease;
        this.prescription = visit.prescrition;

      }
    }

   getid(){
     return window.localStorage.getItem('ROW_KEY');
  }


    public getRandomID(): string {
      var S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4();
    }
  }