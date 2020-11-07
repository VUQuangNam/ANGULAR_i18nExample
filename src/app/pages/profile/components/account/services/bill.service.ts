import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

import { BillModel } from "../models/bill.model";
import { Observable } from "rxjs";
import { BaseApiService } from 'src/app/shared/services/base.service';

@Injectable({
    providedIn: "root",
})
export class BillService extends BaseApiService<any> {
    constructor(public http: HttpClient) {
        super(http, "api/Bill");
    }

    postBill(data) {
        return this.http.post(`api/Bill`, data);
    }
    getAllBill(patientId) {
        return this.http
            .get(`api/Bill?PatientId=${patientId}`)
            .pipe(map((res: any) => res.Payload));
    }

    editBill(PaymentId, data): Observable<BillModel> {
        return this.http.put<BillModel>(
            `api/Bill/${PaymentId}`, data);
    }
    // getAllPatient() {
    //     return this.http
    //         .get("api/patient")
    //         .pipe(map((res: any) => res.Payload));
    // }
    getPatientById(id) {
        return this.http
            .get(`api/patient?PatientId=${id}`)
            .pipe(map((res: any) => res.Payload));
    }
    getBillInvoices(patientId, StartDate, EndDate) {
        return this.http
            .get(`api/Bill/Invoice?PatientId=${patientId}&StartDate=${StartDate}&EndDate=${EndDate}`)
            .pipe(map((res: any) => res.Payload));
    }
    // delImmuPatient(
    //     PatientImmunizationscheduleId
    // ): Observable<PaymentModel> {
    //     return this.http.delete<PaymentModel>(
    //         `api/PatientImmunizationschedule/${PatientImmunizationscheduleId}`
    //     );
    // }
}
