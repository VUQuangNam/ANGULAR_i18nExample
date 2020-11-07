import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  constructor(public http: HttpClient) {}
  getInvoicePatient(InvoiceId: number) {
    return this.http
      .get(`api/ServiceCharge?InvoiceId=${InvoiceId}`)
      .pipe(map((res: any) => res.Payload));
  }
  finishVisit(visitId, model){
    return this.http
      .put(`api/Visit/${visitId}`, model)
      .pipe(map((res: any) => res.Payload));
  }
  getDetailPatient(patientId: number) {
    return this.http
      .get(`api/patient?PatientId=${patientId}`)
      .pipe(map((res: any) => res.Payload));
  }
}
