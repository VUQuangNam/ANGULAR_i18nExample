import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BaseApiService } from 'src/app/shared/services/base.service';

@Injectable({
    providedIn: 'root'
})
export class MedicationInvoiceService extends BaseApiService<any>{
    constructor(public http: HttpClient) {
        super(http, 'api/DrugCharge')
    }

    getMedication(InvoiceId) {
        return this.http.get(`api/DrugCharge?InvoiceId=${InvoiceId}`).pipe(map((res: any) => res.Payload));
    }
    createMedication(data) {
        return this.http.post(`api/DrugCharge`, data);
    }
    editMedication(id: number, data: any) {
        return this.http.put(`api/DrugCharge/${id}`, data);
    }
    deleteMedication(id: number) {
        return this.http.delete(`api/DrugCharge/${id}`);
    }
}
