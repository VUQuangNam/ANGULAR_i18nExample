import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BaseApiService } from 'src/app/shared/services/base.service';

@Injectable({
    providedIn: 'root'
})
export class DemographicsService extends BaseApiService<any>{
    constructor(public http: HttpClient) {
        super(http, 'api/patient')
    }

    getAllPatient() {
        return this.http.get("api/patient").pipe(map((res: any) => res.Payload));
    }
    getPatientById(id) {
        return this.http.get(`api/patient?PatientId=${id}`).pipe(map((res: any) => res.Payload));
    }
    getRelationship(){
        return this.http.get(`api/codevalue?TableName=Patients&ColumnName=EmergencyRelationshipType&NumericKey=null`).pipe(map((res: any) => res.Payload));
    }
}