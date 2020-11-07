import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ExamService {

    constructor(
        private http: HttpClient
    ) { }

    listExam(id?) {
        return this.http.get('api/exam?parentExamId=' + `${id}`)
            .toPromise().then(
                result => JSON.parse(
                    JSON.stringify(result)
                )
            );
    }

    detailPatient(id?) {
        return this.http.get(`api/patient?PatientId=${id}`)
            .toPromise().then(
                result => JSON.parse(
                    JSON.stringify(result)
                )
            );
    }

}
