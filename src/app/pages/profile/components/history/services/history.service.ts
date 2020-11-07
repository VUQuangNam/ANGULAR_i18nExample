import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseApiService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(public http: HttpClient) {
  }
  getProblemOfVisit(visitId: number): Promise<any> {
    return this.http
      .get(`api/VisitProblem?VisitId=${visitId}`)
      .toPromise().then(
        result => JSON.parse(JSON.stringify(result)));
  }

  getDetailPatient(patientId: number) {
    return this.http
      .get(`api/patient?PatientId=${patientId}`).toPromise().then(
        result => JSON.parse(JSON.stringify(result)));
  }
  getVisitOfPatient(patientId) {
    return this.http.get(`api/visit/patient?id=${patientId}`).toPromise().then(
      result => JSON.parse(JSON.stringify(result)));
  }
  createSymptom(data) {
    return this.http.post('api/VisitSymptom', data).pipe(map((res: any) => res.Payload));
  }
  getListSymptom(type) {
    return this.http.get(`api/symptom?type=${type}`).pipe(map((res: any) => res.Payload));
  }
  getListVisitSymptomByVisit(visitId, problemId) {
    return this.http.get(`api/VisitSymptom/VisitSymptomByVisitId?visitId=${visitId}&problemId=${problemId}`).pipe(map((res: any) => res.Payload));
  }
  updateSymptom(visitSymptomId, model) {
    return this.http.put(`api/VisitSymptom/${visitSymptomId}`, model).pipe(map((res: any) => res.Payload));
  }
  getOldProblem(patientId) {
    return this.http
      .get(`api/PatientOldProblems?PatientId=${patientId}`)
      .pipe(map((res: any) => res.Payload));
  }
  deleteSymptom(visitSymptomId){
    return this.http.delete(`api/VisitSymptom/${visitSymptomId}`).pipe(map((res: any) => res.Payload));
  }
  searchTerm(key){
    return this.http.get(`api/APITerm?term=${key}&category=2`).pipe(map((res: any) => res.Payload));
  }
  listMedicationByProblem(patientId, type) {
    return this.http.get<any>(`api/PatientMedicalfactorDrug?PatientId=${patientId}&historymode=${type}`).pipe(map((res: any) => res.Payload))
}
}
