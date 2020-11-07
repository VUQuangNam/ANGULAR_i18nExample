import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { BaseApiService } from "src/app/shared/services/base.service";

import { MedicalHistoryModel } from "../model";

@Injectable({
  providedIn: "root",
})
export class MedicalHistoryService extends BaseApiService<any> {
  constructor(public http: HttpClient) {
    super(http, "api/PatientMedicalfactor");
  }

  SearchMdeical(keyword?) {
    return this.http
      .get(`api/APITerm?term=${keyword}&category=3`)
      .pipe(map((res: any) => res.Payload));
  }
  SearchSurgical(keyword?) {
    return this.http
      .get(`api/APITerm?term=${keyword}&category=6`)
      .pipe(map((res: any) => res.Payload));
  }
  getPatientMedical(patientId) {
    return this.http
      .get(`api/PatientMedicalfactor?PatientId=${patientId}`)
      .pipe(map((res: any) => res.Payload));
  }
  putPatientMedical(
    patientMedicalfactorId,
    data
  ): Observable<MedicalHistoryModel> {
    return this.http.put<MedicalHistoryModel>(
      `api/PatientMedicalfactor/${patientMedicalfactorId}`,
      data
    );
  }
  deletePatientMedical(patientMedicalfactorId) {
    return this.http.delete(
      `api/PatientMedicalfactor/${patientMedicalfactorId}`
    );
  }
}
