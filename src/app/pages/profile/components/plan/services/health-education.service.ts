import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class HealthEducationService {
  constructor(private http: HttpClient) {}
  getVisitEducation(VisitId: number, ProblemId: number) {
    return this.http
      .get(
        `api/visiteducation?VisitId=${VisitId}&EducationcombinationId=${null}&ProblemId=${ProblemId}`
      )
      .pipe(map((res: any) => res.Payload));
  }
  getDetailPatient(patientId: number) {
    return this.http
      .get(`api/patient?PatientId=${patientId}`)
      .pipe(map((res: any) => res.Payload));
  }
  listProblemByVisit(VisitId: number) {
    return this.http
      .get(`api/VisitProblem?VisitId=${VisitId}`)
      .pipe(map((res: any) => res.Payload));
  }
  listOldProblem(id?) {
    return this.http
      .get(`api/PatientOldProblems?PatientId=${id}`)
      .toPromise()
      .then((result) => JSON.parse(JSON.stringify(result)));
  }
  getListOrgans() {
    return this.http.get("api/Organs").pipe(map((res: any) => res.Payload));
  }
  getListEducation() {
    return this.http
      .get("api/educationcategories")
      .pipe(map((res: any) => res.Payload));
  }
  getCombinations(
    OrganId: number,
    EducationcategoryId: number,
    EducationitemId: number
  ) {
    return this.http
      .get(
        `api/educationcombinations?OrganId=${OrganId}&EducationcategoryId=${EducationcategoryId}&EducationitemId=${EducationitemId}`
      )
      .pipe(map((res: any) => res.Payload));
  }
  createHealth(data: any) {
    return this.http.post("/api/visiteducation", data);
  }
}
