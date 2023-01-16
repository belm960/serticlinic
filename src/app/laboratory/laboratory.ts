import { TokenStorageService } from "../shared/security/token-storage.service";


export class Laboratory{
    [x: string]: any;

    labid: string;
    date: Date;
    vid: string;
    test: string;
    result: string;
    unit: string;
    reference: string;
    nameOfVerifier: string;
    departmentName: string;
    sst: string;
    receivedDate: Date;
    receivedTime: number;
    verificationDate: Date;
    status: boolean;



}