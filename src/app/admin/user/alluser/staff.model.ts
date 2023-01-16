import { NullTemplateVisitor } from "@angular/compiler";
import { Role } from "src/app/shared/security/role.enum";

export class Staff {
  id: number;
  address: string; 
  dType: string;
  department: string;
  designation: string;
  dob: Date;
  email: string;
  first: string;
  gender: string;
  last: string;
  mobile: string;
  username : string;
  age : string;
  enrolldate : string;
  gfname : string;
  status:any;
  password: string;
  constructor(user) {
    {
      this.id = user.id || this.getRandomID();
      this.first = user.first || '';
      this.last = user.last || '';
      this.gender = user.gender || '';
      this.email = user.email || '';
      this.dob = user.dob || new Date(), 'yyyy-MM-dd', 'en' || '';
      this.mobile = user.mobile || '';
      this.address = user.address || '';
      this.department = user.department || '';
      this.designation = user.designation || '';
      this.age = user.age || ''; 
      this.enrolldate = user.enrolldate || '';
      this.gfname = user.gfname || '';
      this.status = user.status || '' ;
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
