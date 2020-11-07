import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BaseApiService } from 'src/app/shared/services/base.service';

@Injectable({
    providedIn: 'root'
})
export class InvoicesService extends BaseApiService<any>{
    constructor(public http: HttpClient) {
        super(http, 'api/Invoice')
    }

    getInvoices(patientId, InvoiceId) {
        return this.http.get(`api/Invoice?PatientId=${patientId}&InvoiceId=${InvoiceId}`).pipe(map((res: any) => res.Payload));
    }
    getServiceChargeInvoices(InvoiceId) {
        return this.http.get(`api/ServiceCharge?InvoiceId=${InvoiceId}`).pipe(map((res: any) => res.Payload));
    }
}