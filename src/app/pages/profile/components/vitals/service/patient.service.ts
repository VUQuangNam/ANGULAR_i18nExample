import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    API_URL = 'api/patient'
    constructor(
        private http: HttpClient
    ) { }

    detailPatient(id: any) {
        return this.http.get(this.API_URL + '?PatientId=' + `${id}`).toPromise().then(
            result => JSON.parse(
                JSON.stringify(result)
            )
        );
    }
}
