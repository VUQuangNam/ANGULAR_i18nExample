import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { Observable } from "rxjs";
import { BaseApiService } from "src/app/shared/services/base.service";
import { ProblemModel } from "../models";

@Injectable({
    providedIn: "root",
})
export class ProblemService extends BaseApiService<ProblemModel> {
    constructor(public http: HttpClient) {
        super(http, "api/Problem");
    }
    getProblemOfVisit(visitId: number) {
        return this.http
            .get(`api/VisitProblem?VisitId=${visitId}`)
            .pipe(map((res: any) => res.Payload));
    }

    createProblemVisit(model) {
        return this.http
            .post('api/VisitProblem', model)
            .pipe(map((res: any) => res.Payload));
    }

    getProblemsByPatientId(patientId) {
        return this.http
            .get(`api/PatientProblem?PatientId=${patientId}`)
            .pipe(map((res: any) => res.Payload.reverse()));
    }

    createProblemPatient(model) {
        return this.http
            .post("api/PatientProblem", model)
            .pipe(map((res: any) => res.Payload));
    }

    updateProblemPatient(
        patientProblemId: number,
        model: any
    ): Observable<ProblemModel> {
        return this.http
            .put<ProblemModel>(`api/PatientProblem/${patientProblemId}`, model)
            .pipe(map((res: any) => res.Payload));
    }

    updateProblem(problemId, model) {
        return this.http
            .put<ProblemModel>(`api/Problem/${problemId}`, model)
            .pipe(map((res: any) => res.Payload));
    }

    deleteProblemPatient(patientProblemId: number) {
        return this.http
            .delete(`api/PatientProblem/${patientProblemId}`)
            .pipe(map((res: any) => res.Payload));
    }

    createNewProblemForPatient(data: any) {
        return this.http
            .post("api/Problem", data)
            .pipe(map((res: any) => res.Payload));
    }
    getDetailPatient(patientId: number) {
        return this.http
            .get(`api/patient?PatientId=${patientId}`)
            .pipe(map((res: any) => res.Payload));
    }

    getVisitOfPatient(patientId) {
        return this.http
            .get(`api/visit/patient?id=${patientId}`)
            .pipe(map((res: any) => res.Payload));
    }

    createVisitProblem(data: any) {
        return this.http
            .post('api/VisitProblem', data)
            .pipe(map((res: any) => res.Payload));
    }

    createVisit(data) {
        return this.http
            .post('api/Visit', data)
            .pipe(map((res: any) => res.Payload));
    }

    updateProblemVisit(visitProblemId, model) {
        return this.http
            .put<ProblemModel>(`api/VisitProblem/${visitProblemId}`, model)
            .pipe(map((res: any) => res.Payload));
    }

    deleteVisitProblemId(visitProblemId) {
        return this.http
            .delete(`api/VisitProblem/${visitProblemId}`).pipe(map((res: any) => res.Payload));
    }

    getOldProblem(patientId) {
        return this.http
            .get(`api/PatientOldProblems?PatientId=${patientId}`)
            .pipe(map((res: any) => res.Payload));
    }
}
