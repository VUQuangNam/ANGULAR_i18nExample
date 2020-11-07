import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

import { FamilyHistoryModel } from "../models/family-history.model";
import { Observable } from "rxjs";
import { BaseApiService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class FamilyHistoryService extends BaseApiService<any> {
  constructor(public http: HttpClient) {
    super(http, "api/PatientFamilyfactor");
  }
  getFamilyHistory(patientId) {
    return this.http
      .get(`api/PatientFamilyfactor?PatientId=${patientId}`)
      .pipe(map((res: any) => res.Payload));
  }
  putFamilyHistory(PatientFamilyfactor, data) {
    return this.http.put(
      `api/PatientFamilyfactor/${PatientFamilyfactor}`,
      data
    );
  }
  deleteFamilyHistory(PatientFamilyfactorId) {
    return this.http.delete(`api/PatientFamilyfactor/${PatientFamilyfactorId}`);
  }
  getListRelationship(Patients, EmergencyRelationshipType) {
    return this.http
      .get(
        `api/codevalue?TableName=${Patients}&ColumnName=${EmergencyRelationshipType}&NumericKey=null`
      )
      .pipe(map((res: any) => res.Payload));
  }
}
