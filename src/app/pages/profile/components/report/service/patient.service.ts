import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    constructor(
        private http: HttpClient
    ) { }

    detailPatient(id?) {
        return this.http.get(`api/patient?PatientId=${id}`)
            .toPromise().then(
                result => JSON.parse(
                    JSON.stringify(result)
                )
            );
    }

    listVisitPatient(id?) {
        return this.http.get(`api/visit/patient?id=${id}`)
            .toPromise().then(
                result => JSON.parse(
                    JSON.stringify(result)
                )
            );
    }
}
