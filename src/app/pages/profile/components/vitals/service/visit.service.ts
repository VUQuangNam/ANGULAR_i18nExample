import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class VisitService {
    API_URI = 'api/visit';
    constructor(
        public http: HttpClient
    ) { }

    listVisitPatient(id?: any) {
        return this.http.get(
            this.API_URI + '/patient' + `?id=${id}`).toPromise().then(
                result => JSON.parse(
                    JSON.stringify(result)
                )
            );
    }

    detailVisit(id?: any) {
        return this.http.get('api/VisitVital?VisitId=' + `${id}`).toPromise().then(
            result => JSON.parse(
                JSON.stringify(result)
            )
        );
    }

    createVisit(data) {
        return this.http.post(this.API_URI, data).toPromise().then(
            result => JSON.parse(
                JSON.stringify(result)
            )
        );
    }
}
