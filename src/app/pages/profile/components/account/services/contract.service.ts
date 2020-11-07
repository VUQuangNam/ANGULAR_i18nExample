import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BaseApiService } from 'src/app/shared/services/base.service';

@Injectable({
    providedIn: 'root'
})
export class ContractService extends BaseApiService<any>{

    constructor(public http: HttpClient) {
        super(http, 'api/Contract')
    }
    getListContract(patientId: number, providerId: number, contractId: number) {
        return this.http.get(`api/Contract?PatientId=${patientId}&ProviderId=${providerId}&ContractId=${contractId}`).pipe(map((res: any) => res.Payload));
    }
}
