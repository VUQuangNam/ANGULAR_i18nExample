import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { VisitVitalModel } from '../model';

@Injectable({
    providedIn: 'root'
})
export class VisitVitalService {
    API_URI = 'api/VisitVital';
    constructor(
        public http: HttpClient
    ) { }

    listVisitVital(id): Observable<any> {
        return this.http.get<any>(this.API_URI + `/${id}`).pipe(map((res: any) => res.Payload));
    }

    listVitalPatient(id): Observable<any> {
        return this.http.get<any>(`api/Vital/${id}`).pipe(map((res: any) => res.Payload));
    }

    createVisitVital(data) {
        return this.http.post(this.API_URI, data).toPromise().then(
            result => JSON.parse(
                JSON.stringify(result)
            )
        );
    }

    updateVisitVital(data): Observable<VisitVitalModel> {
        return this.http.put<VisitVitalModel>(this.API_URI, data).pipe(map((res: any) => res.Payload));
    }

    detailVisitVital(id): Observable<VisitVitalModel> {
        return this.http.get<VisitVitalModel>(this.API_URI + `${id}`).pipe(map((res: any) => res.Payload));
    }

    deleteVital(id): Observable<VisitVitalModel> {
        return this.http.delete<VisitVitalModel>(this.API_URI + `${id}`).pipe(map((res: any) => res.Payload));
    }

    listResultTime(resultdate, patientid) {
        return this.http.get<any>(this.API_URI + `?resultdate=${resultdate}&patientid=${patientid}`).toPromise().then(
            result => JSON.parse(
                JSON.stringify(result)
            )
        );
    }
}
