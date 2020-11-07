import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BaseApiService } from 'src/app/shared/services/base.service';
import { ListofvisitsModel } from '../model';

@Injectable({
    providedIn: 'root'
})
export class ListofvisitsService extends BaseApiService<any>{
    constructor(public http: HttpClient) {
        super(http, 'api/Visit')
    }

    getVisit(listofvisitsId, data): Observable<ListofvisitsModel> {
        return this.http.put<ListofvisitsModel>(`api/Visit/${listofvisitsId}`, data)
    }
    listVisitPatient(patientId) {
        return this.http.get(`api/Visit/${patientId}`).pipe(map((res: any) => res.Payload));
    }

}
