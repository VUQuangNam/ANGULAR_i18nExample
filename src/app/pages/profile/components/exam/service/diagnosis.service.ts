import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DiagnosisService {
    API_URI = 'api/VisitDiagnosis';
    constructor(
        private http: HttpClient
    ) { }

    detailDiagnosis(id, problemId) {
        return this.http.get(this.API_URI + '/VisitDiagnosisByVisitId?patientId' + `${id}` + '&problemId=' + `${problemId}`)
            .toPromise().then(
                result => JSON.parse(
                    JSON.stringify(result)
                )
            );
    }

    detailDiagnosisNearest(id, problemId) {
        return this.http.get(this.API_URI + '/VisitDiagnosisByVisitId?patientId' + `${id}` + '&problemId=' + `${problemId}`)
            .toPromise().then(
                result => JSON.parse(
                    JSON.stringify(result)
                )
            );
    }

}
