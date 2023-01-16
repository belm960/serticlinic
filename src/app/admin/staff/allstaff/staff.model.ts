import { formatDate } from '@angular/common';
export class Staff {
  id: number;
  first: string;
  last: string;
  gender: string;
  email: string;
  dob: Date;
  mobile: string;
  address: string;
  department: string;
  designation: string;
  education: string;

  constructor(staff) {
    {
      this.id = staff.id || this.getRandomID();
      this.first = staff.first || '';
      this.last = staff.last || '';
      this.gender = staff.gender || '';
      this.email = staff.email || '';
      this.dob = staff.dob || new Date(), 'yyyy-MM-dd', 'en' || '';
      this.mobile = staff.mobile || '';
      this.address = staff.address || '';
      this.department = staff.department || '';
      this.designation = staff.designation || '';
      this.education = staff.education || ''; 
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
