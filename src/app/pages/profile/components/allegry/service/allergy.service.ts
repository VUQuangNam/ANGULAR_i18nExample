import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

import { AllergyModel, SymptonsModel, PatientAllergyModel } from "../model";

@Injectable({
    providedIn: "root",
})
export class AllergyService {
    API_URI = "api/Allergy";
    constructor(public http: HttpClient) { }

    SearchSymptons(keyword?) {
        return this.http
            .get(`api/APITerm?term=${keyword}&category=2`)
            .pipe(map((res: any) => res.Payload));
    }
    getAllegryPatient(id): Observable<PatientAllergyModel> {
        return this.http
            .get<PatientAllergyModel>(`api/PatientAllergy?PatientId=${id}`)
            .pipe(map((res: any) => res.Payload.reverse()));
    }

    createAllegryPatient(data: any) {
        return this.http.post("api/PatientAllergy", data);
    }

    updateAllegryPatient(id: number, data: any): Observable<PatientAllergyModel> {
        return this.http.put<PatientAllergyModel>(`api/PatientAllergy/${id}`, data);
    }

    deleteAllegryPatient(id): Observable<PatientAllergyModel> {
        return this.http
            .delete<PatientAllergyModel>(`api/PatientAllergy/${id}`)
            .pipe(map((res: any) => res.Payload));
    }

    getAllegry(): Observable<AllergyModel> {
        return this.http
            .get<AllergyModel>(`api/Allergy`)
            .pipe(map((res: any) => res.Payload.reverse()));
    }

    CreateAllegry(data: any) {
        return this.http
            .post("api/Allergy", data)
            .toPromise()
            .then((result) => JSON.parse(JSON.stringify(result)));
    }

    updateAllergy(id: number, data: any): Observable<AllergyModel> {
        return this.http.put<AllergyModel>(`api/Allergy/${id}`, data);
    }

    CreateSymptons(data: any) {
        return this.http
            .post("api/symptom", data)
            .toPromise()
            .then((result) => JSON.parse(JSON.stringify(result)));
    }

    getSymptons(): Observable<SymptonsModel> {
        return this.http
            .get<SymptonsModel>(`api/symptom?type=null`)
            .pipe(map((res: any) => res.Payload.reverse()));
    }
}
