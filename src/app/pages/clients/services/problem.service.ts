import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

//base
import { BaseApiService } from "../../../shared/services/base.service";

//service
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//models
import { ProblemModel } from '../models/problem.model';

@Injectable({
    providedIn: 'root'
})
export class ProblemService extends BaseApiService<ProblemModel>{
    constructor(public http: HttpClient) {
        super(http, 'api/PatientProblem');
    }

    getProblemByPatientId(patientId): Observable<ProblemModel> {
        return this.http.get<ProblemModel>(`api/PatientProblem?PatientId=${patientId}`).pipe(map((res: any) => res.Payload));
    }
    updateProblem(patientProblemId, data): Observable<ProblemModel> {
        return this.http.put<ProblemModel>(`api/PatientProblem/${patientProblemId}`, data)
    }
    addNewProblem(data): Observable<ProblemModel> {
        return this.http.post<ProblemModel>('api/Problem', data);
    }
    postSchedule(data) {
        return this.http.post('api/schedule', data);
    }
}
