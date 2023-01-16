import { formatDate } from '@angular/common';
export class Room {
  id: number;
  pid: string;
  roomNo: string;
  pName: string;
  pSex: string;
  roomType: string;
  admitDate: Date;
  dischargeDate: Date;
  constructor(room) {
    {
      this.id = room.id || this.getRandomID();
      this.pid = room.pid || ''
      this.roomNo = room.rNo || '';
      this.pName = room.pName || '';
      this.pSex = room.pSex || '';
      this.roomType = room.rType || '';
      this.admitDate = new Date(), 'yyyy-MM-dd', 'en' || '';
      this.dischargeDate = new Date(), 'yyyy-MM-dd', 'en' || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
