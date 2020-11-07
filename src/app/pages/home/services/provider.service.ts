import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})
export class ProviderService {
    constructor(public http: HttpClient) {
    }
    getProfileProvider() {
        return this.http.get('api/provider/username').pipe(map((result: any) => result.Payload));
    }
    updateProfileProvider(providerId, model) {
        return this.http.put(`api/Provider/${providerId}`, model).pipe(map((result: any) => result.Payload));
    }
    getCalenderProvider(providerId, today){
        return this.http.get(`api/ScheduleProvider?ProviderId=${providerId}&Date=${today}`).pipe(map((result: any) => result.Payload));
    }
        
}