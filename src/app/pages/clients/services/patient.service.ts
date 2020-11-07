import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

//base
import { BaseApiService } from "../../../shared/services/base.service";

//service
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

//models
import { PatientModel } from "../models/patient.model";

@Injectable({
  providedIn: "root",
})
export class PatientService extends BaseApiService<PatientModel> {
  constructor(public http: HttpClient) {
    super(http, "api/patient");
  }
  getPatientByPatientId(patientId): Observable<PatientModel> {
    return this.http
      .get<PatientModel>(`api/patient?PatientId=${patientId}`)
      .pipe(map((res: any) => res.Payload));
  }
  searchPatient(keyword) {
    return this.http
      .get<PatientModel>(`api/patient/search?keyword=${keyword}&pagenumber=1`)
      .pipe(map((res: any) => res.Payload));
  }
}
