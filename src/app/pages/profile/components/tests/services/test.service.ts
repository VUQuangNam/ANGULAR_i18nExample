import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
//model
import { TestModel } from "../model/test.model";

import { Observable } from "rxjs";
import { BaseApiService } from 'src/app/shared/services/base.service';

@Injectable({
    providedIn: 'root'
})
export class TestService extends BaseApiService<any> {

    constructor(
        public http: HttpClient
    ) {
        super(http, 'api/PatientTestResult');
    }

    getTestList(): Observable<TestModel> {
        return this.http.get<TestModel>(`api/Testcategory`).pipe(map((res: any) => res.Payload));
    }
    getAllPackage() {
        return this.http.get('api/Package?TestcategoryId').pipe(map((res: any) => res.Payload));
    }
    getPackagesDetail(patientId, testId, packagesId, testCategoryId): Observable<TestModel> {
        return this.http.get<TestModel>(`api/PatientTestResult?PatientId=${patientId}&TestId=${testId}&PackageId=${packagesId}&TestcategoryId=${testCategoryId}`).pipe(map((res: any) => res.Payload));
    }
    getListTest() {
        return this.http.get('api/Test?TestId=null&PackageId=null&TestcategoryId=null').pipe(map((res: any) => res.Payload));
    }
    deleteTest(testId: number) {
        return this.http.delete(`api/PatientTestResult/${testId}`).pipe(map((res: any) => res.Payload));
    }
    updatePatientTestResult(data): Observable<TestModel> {
        return this.http.put<TestModel>(`api/PatientTestResult`, data).pipe(map((res: any) => res.Payload));
    }
    putPatientTestResult(patientTestResultId, data): Observable<TestModel> {
        return this.http.put<TestModel>(`api/PatientTestResult/${patientTestResultId}`, data).pipe(map((res: any) => res.Payload));
    }
    getPatientTestResultMediaBiopsy(patientId, packageId, testCategoryId) {
        return this.http.get(`api/PatientTestResultMedia?PatientId=${patientId}&PackageId=${packageId}&TestcategoryId=${testCategoryId}`).pipe(map((res: any) => res.Payload));
    }
}
