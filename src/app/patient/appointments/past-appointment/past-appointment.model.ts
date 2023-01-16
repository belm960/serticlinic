import { formatDate } from '@angular/common';
export class PastAppointment {
  id: number;
  img: string;
  patientName: string;
  gender: string;
  mobile: string;
  doctorName: string;
  disease: string;
  status: string;
  date: Date;
  pid: string;
  constructor(appointment) {
    {
      this.id = appointment.id || this.getRandomID();
      this.img = appointment.avatar || 'assets/images/user/user1.jpg';
      this.patientName =appointment.patientName;
      this.gender = appointment.gender || 'male';
      this.mobile = appointment.mobile || '';
      this.doctorName = appointment.doctorName || '';
      this.disease = appointment.disease || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
