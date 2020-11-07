import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { BaseApiService } from 'src/app/shared/services/base.service';

@Injectable({
    providedIn: "root",
})
export class MessagesService extends BaseApiService<any> {
    constructor(public http: HttpClient) {
        super(http, "api/Message");
    }
    getListUserMessage() {
        return this.http
            .get("api/Message/conversations")
            .pipe(map((res: any) => res.Payload));
    }
}
