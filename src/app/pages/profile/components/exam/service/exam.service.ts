import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ExamModel } from '../model';

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

    listExamAvailableResults(id?) {
        return this.http.get('api/ExamAvailableResults?examId=' + `${id}`)
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

    createdVisitExam(data: ExamModel) {
        return this.http.post(`api/VisitExam`, data)
            .toPromise().then(
                result => JSON.parse(
                    JSON.stringify(result)
                )
            );
    }

    updateVisitExam(visitId, examId, problemId, data) {
        return this.http.put(`api/VisitExam?VisitId=${visitId}&ExamId=${examId}&ProblemId=${problemId}`, data)
            .toPromise().then(
                result => JSON.parse(
                    JSON.stringify(result)
                )
            );
    }

    listExamVisit(visitId, problemId) {
        return this.http.get(`api/VisitExam?visitId=${visitId}&problemId=${problemId}`)
            .toPromise().then(
                result => JSON.parse(
                    JSON.stringify(result)
                )
            );
    }

    listResultIdExam(visitId, problemId, examId) {
        return this.http.get(`api/ResultIdExam?VisitId=${visitId}&ProblemId=${problemId}&ExamId=${examId}`)
            .toPromise().then(
                result => JSON.parse(
                    JSON.stringify(result)
                )
            );
    }

    deleteExam(visitId, problemId, data): Observable<[number]> {
        return this.http.put<[number]>(
            `api/UpdateVisitExam?visitId=${visitId}&problemId=${problemId}`,
            data
        );
    }

}
