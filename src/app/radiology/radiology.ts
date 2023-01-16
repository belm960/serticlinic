import { dateSelectionJoinTransformer } from "@fullcalendar/core";
import { Tracing } from "trace_events";

export class Radiology{

    radid: string;
    urgency: string;
    fast:string;
    date: Date;
    testtype:string;
    drugtherapy: string;
    lastdose: string;
    otherinfo: string;
    profiletest: string;
    diabetis: string;
    metformin: string;
    renalFunction: string;
    weight: string;
    previousExam: string;
    reasonForScan: string;
    relevantHistory: string;
    radiologistName: string;
    vid: string;
    examrequested: string;
    examTypeDetail: string;
    clinicalData: string;
    requestedBy: string;
    report: string;
    reportedBy: string;

constructor(radiology){

  this.radid =radiology.radid  || '';
  this.urgency= radiology.urgency || '';
  this.fast= radiology.fast || '';
  this.date= radiology.date || '';
  this.testtype= radiology.testtype || '';
  this.drugtherapy= radiology.drugtherapy || '';
  this.lastdose= radiology.lastdose || '';
  this.otherinfo= radiology.otherinfo || '';
  this.diabetis= radiology.diabetis || '';
  this.metformin= radiology.metformin || '';
  this.renalFunction= radiology.renalFunction || '';
  this.weight= radiology.weight || '';
  this.previousExam=  radiology.previousExam || '';
  this.reasonForScan= radiology.reasonForScan || '';
  this.relevantHistory=  radiology.relevantHistory || '';
  this.radiologistName= radiology.radiologistName || '';

}


}


