import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class MedicationService {
    constructor(public http: HttpClient) { }

    listMedication(patientId, type) {
        return this.http.get<any>(`api/PatientMedicalfactorDrug?PatientId=${patientId}&historymode=${type}`)
            .toPromise()
            .then(
                result => JSON.parse(
                    JSON.stringify(result)
                )
            );
    }

    listMedicationByProblem(patientId, type) {
        return this.http.get<any>(`api/PatientMedicalfactorByProblem?PatientId=${patientId}&historymode=${type}`)
            .toPromise()
            .then(
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

    listProblem() {
        return this.http.get<any>(`api/Problem`).toPromise().then(
            result => JSON.parse(
                JSON.stringify(result)
            )
        );
    }

    createMedication(data) {
        return this.http.post<any>(`api/PatientMedicalfactorDrug`, data).toPromise().then(
            result => JSON.parse(
                JSON.stringify(result)
            )
        );
    }

    updateMedication(id, data) {
        return this.http.put<any>(`api/PatientMedicalfactorDrug/${id}`, data).toPromise().then(
            result => JSON.parse(
                JSON.stringify(result)
            )
        );
    }

    deleteMedication(id) {
        return this.http.delete<any>(`api/PatientMedicalfactorDrug/${id}`).toPromise().then(
            result => JSON.parse(
                JSON.stringify(result)
            )
        );
    }
}