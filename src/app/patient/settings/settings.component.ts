import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { Observable } from "rxjs";
import { Patient } from "src/app/admin/patients/allpatients/patient.model";
import { PatientService } from "src/app/admin/patients/allpatients/patient.service";
import { Visit } from "src/app/shared/security/visit";
import { apiUrl } from "src/environments/environment";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.sass"],
})
export class SettingsComponent implements OnInit {
  pid = localStorage.getItem("patientId");
  id: any;

  api_Url = apiUrl + "/Patient/";
  patient: Patient = new Patient({});

  visit1: Visit;

  constructor(
    public httpClient: HttpClient,
    public patientService: PatientService
  ) {}
  ngOnInit() {
    console.log(this.pid);
    this.getPatients();
  }

  getAllPatients(): Observable<any> {
    const url = `${this.api_Url}${this.pid}`;
    return this.httpClient.get(url).pipe();
  }
  getPatients(): void {
    this.getAllPatients().subscribe(
      (data) => {
        this.patient = data;
        this.getLastVisit(data.v);
      },
      (_) => console.log("Get Patient Failed")
    );
  }

  getLastPatientsVisit(vid): Observable<Visit> {
    const url = apiUrl + "/Visit/" + vid;
    return this.httpClient.get<Visit>(url).pipe();
  }
  /**VISIT 1 */
  getLastVisit(vid): void {
    this.getLastPatientsVisit(vid).subscribe(
      (data) => {
        this.visit1 = data;
        console.log(this.visit1);
      },
      (_) => console.log("Get Last Visit Failed")
    );
  }
}
