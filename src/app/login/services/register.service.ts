import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseApiService } from '../../shared/services/base.service';
import { RegisterModel } from '../models/register.model';

@Injectable({
    providedIn: "root",
})
export class AccountRegisterService extends BaseApiService<RegisterModel> {
    constructor(public http: HttpClient) {
        super(http, "api/account/register");
    }
}
