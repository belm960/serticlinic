export class Room{
    id: string;
    roomNo: string;
    roomType: string;
    admitDate: Date;
    dischargeDate: Date;

    constructor(room){
        
        this.id=room.id || '';
        this.roomNo=room.roomNo || '';
        this.roomType=room.roomType || '';
        this.admitDate = room.admitDate || '';
        this.dischargeDate = room.dischargeDate || '';
    }
}