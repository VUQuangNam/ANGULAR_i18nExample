import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OrgansService {

    constructor(
        private http: HttpClient
    ) { }

    listOrgans() {
        return this.http.get(`api/Organs`)
            .toPromise().then(
                result => JSON.parse(
                    JSON.stringify(result)
                )
            );
    }

}
