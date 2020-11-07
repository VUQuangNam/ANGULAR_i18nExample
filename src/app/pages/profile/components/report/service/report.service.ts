import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(
        private http: HttpClient
    ) { }

    listVisitReport(visitId) {
        return this.http.get(`api/VisitReport?visitId=${visitId}`)
            .toPromise().then(
                result => JSON.parse(
                    JSON.stringify(result)
                )
            );
    }

    listDrugRoutes() {
        return this.http.get<any>(`api/DrugRoutes`).toPromise().then(
            result => JSON.parse(
                JSON.stringify(result)
            )
        );
    }

    listMedicationHistory(idPatient) {
        return this.http.get<any>(`api/PatientMedicalfactor?PatientId=${idPatient}`).toPromise().then(
            result => JSON.parse(
                JSON.stringify(result)
            )
        );
    }

    listFamilyHistory(idPatient) {
        return this.http.get<any>(`api/PatientFamilyfactor?PatientId=${idPatient}`).toPromise().then(
            result => JSON.parse(
                JSON.stringify(result)
            )
        );
    }

    listSocialHistory(idPatient) {
        return this.http.get<any>(`api/PatientSocialFactor?PatientId=${idPatient}`).toPromise().then(
            result => JSON.parse(
                JSON.stringify(result)
            )
        );
    }

    listPatientAllergy(idPatient) {
        return this.http.get<any>(`api/PatientAllergy?PatientId=${idPatient}`).toPromise().then(
            result => JSON.parse(
                JSON.stringify(result)
            )
        );
    }

    listMedicationByProblem(idPatient) {
        return this.http.get<any>(`api/PatientMedicalfactorByProblem?PatientId=${idPatient}&historymode=3`).toPromise().then(
            result => JSON.parse(
                JSON.stringify(result)
            )
        );
    }

    listProblemOfVisit(visitId) {
        return this.http.get<any>(`api/VisitProblem?VisitId=${visitId}`).toPromise().then(
            result => JSON.parse(
                JSON.stringify(result)
            )
        );
    }

    listOldProblemVisit(patientId) {
        return this.http.get<any>(`api/PatientOldProblems?PatientId=${patientId}`).toPromise().then(
            result => JSON.parse(
                JSON.stringify(result)
            )
        );
    }

    listHistoryReport(visitId, problemId) {
        return this.http.get<any>(`api/VisitSymptom/VisitSymptomByVisitId?visitId=${visitId}&problemId=${problemId}`).toPromise().then(
            result => JSON.parse(
                JSON.stringify(result)
            )
        );
    }

    listMedicalReport(visitId, problemId) {
        return this.http.get<any>(`api/prescriptiondrug?ProblemId=${problemId}&VisitId=${visitId}`).toPromise().then(
            result => JSON.parse(
                JSON.stringify(result)
            )
        );
    }
}
