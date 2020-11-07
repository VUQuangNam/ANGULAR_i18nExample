import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OrderTestService {

    constructor(
        private http: HttpClient
    ) { }
    
    listTestOfCategory(categoryId) {
        return this.http.get(`api/test?TestcategoryId=${categoryId}`).pipe(map((res: any) => res.Payload));
    }

    orderTest(model){
        return this.http.post(`api/Order`, model).pipe(map((res: any) => res.Payload));
    }
    removeOrderTest(orderId){
        return this.http
            .delete(`api/order/${orderId}`)
            .pipe(map((res: any) => res.Payload));
        
    }
    getDetailPatient(patientId: number) {
        return this.http
            .get(`api/patient?PatientId=${patientId}`)
            .pipe(map((res: any) => res.Payload));
    }
    getListOrderTest(visitId, problemId){
        return this.http
        .get(`api/order?VisitId=${visitId}&ProblemId=${problemId}`)
        .pipe(map((res: any) => res.Payload));
    }
    
    listOrgans() {
        return this.http
        .get(`api/Organs`)
        .pipe(map((res: any) => res.Payload));
    }
    listCategory(){
        return this.http.get('api/Testcategory?ParentTestcategoryId=0').pipe(map((res: any) => res.Payload));
    }

}
