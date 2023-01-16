import { formatDate } from "@angular/common";
export class Appointment {
  id: number;
  img: string;
  patientName: string;
  email: string;
  gender: string;
  date: Date;
  time: string;
  mobile: string;
  doctor: string;
  injury: string;
  disease: string;
  constructor(appointment) {
    {
      this.id = appointment.id || this.getRandomID();
      this.img = appointment.avatar || "assets/images/user/user1.jpg";
      this.patientName = appointment.patientName || "";
      this.email = appointment.email || "";
      this.gender = appointment.gender || "male";
      this.date = new Date(), "yyyy-MM-dd", "en" || "";
      this.time = appointment.time || "";
      this.mobile = appointment.mobile || "";
      this.doctor = appointment.doctor || "";
      this.injury = appointment.injury || "";
      this.disease = appointment.disease || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
