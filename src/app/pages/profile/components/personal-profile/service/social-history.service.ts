import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BaseApiService } from 'src/app/shared/services/base.service';
import { SocialHistoryModel } from '../model';
@Injectable({
    providedIn: 'root'
})
export class SocialHistoryService extends BaseApiService<any>{
    constructor(public http: HttpClient) {
        super(http, 'api/PatientSocialfactor')
    }

    getSocialHistoryByPatientId(patientId): Observable<SocialHistoryModel> {
        return this.http.get<SocialHistoryModel>(`api/PatientSocialfactor?patientId=${patientId}`).pipe(map((res: any) => res.Payload.reverse()));
    }

    updateSocialHistory(patientId: number, data: any): Observable<SocialHistoryModel> {
        return this.http.put<SocialHistoryModel>(`api/PatientSocialfactor/${patientId}`, data).pipe(map((res: any) => res.Payload));
    }
}
