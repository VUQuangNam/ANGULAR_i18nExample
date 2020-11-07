import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { DiagnosisModel } from "../model/diagnosis.model";

@Injectable({
  providedIn: "root",
})
export class DiagnosisService {
  API_URI = "api/VisitDiagnosis";
  constructor(private http: HttpClient) {}

  SearchDiagnosis(keyword?) {
    return this.http
      .get(`api/APITerm?term=${keyword}&category=3`)
      .pipe(map((res: any) => res.Payload));
  }
  getDiagnosis(VisitId: number, ProblemId: number) {
    return this.http
      .get(
        `api/VisitDiagnosis/VisitDiagnosisByVisitId?visitid=${VisitId}&problemId=${ProblemId}`
      )
      .pipe(map((res: any) => res.Payload.reverse()));
  }
  getDiagnosisLast(patientId, ProblemId) {
    return this.http
      .get(
        `api/VisitDiagnosis/LastVisitDiagnosis?patientId=${patientId}&problemId=${ProblemId}`
      )
      .pipe(map((res: any) => res.Payload.reverse()));
  }
  getProblemByVisitId(VisitId: number) {
    return this.http
      .get(`api/VisitProblem?VisitId=${VisitId}`)
      .pipe(map((res: any) => res.Payload.reverse()));
  }

  getProblemOfVisit(visitId: number) {
    return this.http
      .get(`api/VisitProblem?VisitId=${visitId}`)
      .pipe(map((res: any) => res.Payload));
  }

  getVisitOfPatient(patientId) {
    return this.http
      .get(`api/visit/patient?id=${patientId}`)
      .pipe(map((res: any) => res.Payload));
  }

  createDiagnosisofVisit(data: any) {
    return this.http
      .post("api/VisitDiagnosis", data)
      .pipe(map((res: any) => res.Payload));
  }
  getAllDiagnosis() {
    return this.http
      .get('"api/Diagnosis"')
      .pipe(map((res: any) => res.Payload));
  }

  detailPatient(id?) {
    return this.http
      .get(`api/patient?PatientId=${id}`)
      .toPromise()
      .then((result) => JSON.parse(JSON.stringify(result)));
  }

  listProblemByVisit(id?) {
    return this.http
      .get(`api/VisitProblem?VisitId=${id}`)
      .toPromise()
      .then((result) => JSON.parse(JSON.stringify(result)));
  }

  listOldProblem(id?) {
    return this.http
      .get(`api/PatientOldProblems?PatientId=${id}`)
      .toPromise()
      .then((result) => JSON.parse(JSON.stringify(result)));
  }
  getPatient(PatientId) {
    return this.http
      .get(`api/patient?PatientId=${PatientId}`)
      .pipe(map((res: any) => res.Payload));
  }
}
