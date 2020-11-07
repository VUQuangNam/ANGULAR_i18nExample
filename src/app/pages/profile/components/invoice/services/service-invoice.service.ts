import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { BaseApiService } from 'src/app/shared/services/base.service';

@Injectable({
    providedIn: 'root'
})
export class ServiceInvoiceService extends BaseApiService<any>{
    [x: string]: any;
    constructor(public http: HttpClient) {
        super(http, 'api/ServiceCharge')
    }

    getInvoice(InvoiceId) {
        return this.http.get(`api/ServiceCharge?InvoiceId=${InvoiceId}`).pipe(map((res: any) => res.Payload));
    }
}
