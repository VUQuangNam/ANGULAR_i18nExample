import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

import { BaseApiService } from "src/app/shared/services/base.service";
import { PatientImmunizationscheduleModel } from "../model";

@Injectable({
  providedIn: "root",
})
export class PatientImmunizationscheduleService extends BaseApiService<any> {
  constructor(public http: HttpClient) {
    super(http, "api/PatientImmunizationschedule");
  }

  SearchImmunization(keyword?) {
    return this.http
      .get(`api/APITerm?term=${keyword}&category=3`)
      .pipe(map((res: any) => res.Payload));
  }
  getImmuByPatientId(PatientId) {
    return this.http
      .get(`api/PatientImmunizationschedule?PatientId=${PatientId}`)
      .pipe(map((res: any) => res.Payload));
  }
  addPatientImmunizationschedule(data) {
    return this.http.post(`api/PatientImmunizationschedule`, data);
  }
  editImmuPatient(
    PatientImmunizationscheduleId,
    data
  ): Observable<PatientImmunizationscheduleModel> {
    return this.http.put<PatientImmunizationscheduleModel>(
      `api/PatientImmunizationschedule/${PatientImmunizationscheduleId}`,
      data
    );
  }
  getAllPatient() {
    return this.http.get("api/patient").pipe(map((res: any) => res.Payload));
  }
  getPatientById(id) {
    return this.http
      .get(`api/patient?PatientId=${id}`)
      .pipe(map((res: any) => res.Payload));
  }
  delImmuPatient(
    PatientImmunizationscheduleId
  ): Observable<PatientImmunizationscheduleModel> {
    return this.http.delete<PatientImmunizationscheduleModel>(
      `api/PatientImmunizationschedule/${PatientImmunizationscheduleId}`
    );
  }
}
