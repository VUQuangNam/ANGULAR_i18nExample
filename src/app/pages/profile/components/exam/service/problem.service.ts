import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProblemService {
    constructor(
        private http: HttpClient
    ) { }

    listProblemByVisit(id?) {
        return this.http.get(`api/VisitProblem?VisitId=${id}`)
            .toPromise().then(
                result => JSON.parse(
                    JSON.stringify(result)
                )
            );
    }

    listOldProblem(id?) {
        return this.http.get(`api/PatientOldProblems?PatientId=${id}`)
            .toPromise().then(
                result => JSON.parse(
                    JSON.stringify(result)
                )
            );
    }

}
