import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { BaseApiService } from '../../../shared/services/base.service';

@Injectable({
    providedIn: 'root'
})
export class PatientService extends BaseApiService<any>{
    constructor(public http: HttpClient) {
        super(http, 'api/patient')
    }
}