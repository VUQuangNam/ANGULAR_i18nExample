import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

import { Observable } from "rxjs";
import { PrescriptionModel } from "../model/prescription.model";
@Injectable({
  providedIn: "root",
})
export class PrescriptionService {
  constructor(private http: HttpClient) {}
  getAllRoute() {
    return this.http.get("api/DrugRoutes").pipe(map((res: any) => res.Payload));
  }
  getDrug() {
    return this.http.get("api/Drug").pipe(map((res: any) => res.Payload));
  }
  createPrescription(data: any) {
    return this.http
      .post("api/prescription", data)
      .pipe(map((res: any) => res.Payload));
  }
  getPrescriptionByPatientIdAndProblemId(ProblemId: number, VisitId: number) {
    return this.http
      .get(`api/prescriptiondrug?ProblemId=${ProblemId}&VisitId=${VisitId}`)
      .pipe(map((res: any) => res.Payload));
  }

  createDetailsPrescription(data: any) {
    return this.http.post("api/prescription/drug", data);
  }
  getDetailPatient(patientId: number) {
    return this.http
      .get(`api/patient?PatientId=${patientId}`)
      .pipe(map((res: any) => res.Payload));
  }
  deletePres(PrescriptionDrugId): Observable<PrescriptionModel> {
    return this.http
      .delete<PrescriptionModel>(`api/prescription/drug/${PrescriptionDrugId}`)
      .pipe(map((res: any) => res.Payload));
  }

  updatePres(
    PrescriptionDrugId: number,
    data: any
  ): Observable<PrescriptionModel> {
    return this.http.put<PrescriptionModel>(
      `api/prescription/drug?PrescriptionDrugId=${PrescriptionDrugId}`,
      data
    );
  }
}
