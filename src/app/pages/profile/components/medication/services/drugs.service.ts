import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DrugsService {

    constructor(
        private http: HttpClient
    ) { }

    listDrugs() {
        return this.http.get<any>(`api/Drug`).toPromise().then(
            result => JSON.parse(
                JSON.stringify(result)
            )
        );
    }
}
