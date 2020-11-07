import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

import { PaymentModel } from "../models/payment.model";
import { Observable } from "rxjs";
import { BaseApiService } from 'src/app/shared/services/base.service';

@Injectable({
    providedIn: "root",
})
export class PaymentService extends BaseApiService<any> {
    constructor(public http: HttpClient) {
        super(http, "api/Payment");
    }

    postPayment(data) {
        return this.http.post(`api/Payment`, data);
    }

    editPayment(PaymentId, data): Observable<PaymentModel> {
        return this.http.put<PaymentModel>(
            `api/Payment/${PaymentId}`, data);
    }
    getAllPayment(patientId, invoiceId, contractId) {
        return this.http.get(`api/Payment?PatientId=${patientId}&InvoiceId=${invoiceId}&ContractId=${contractId}`)
            .pipe(map((res: any) => res.Payload));
    }
}
