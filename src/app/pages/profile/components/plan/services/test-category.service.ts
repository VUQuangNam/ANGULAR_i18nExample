import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BaseApiService } from 'src/app/shared/services/base.service';

@Injectable({
    providedIn: 'root'
})
export class TestCategoryService {
    constructor(
        private http: HttpClient
    ) { }

    listTestCategories(id?) {
        return this.http.get(`api/Testcategory?ParentTestcategoryId=${id}`)
            .toPromise().then(
                result => JSON.parse(
                    JSON.stringify(result)
                )
            );
    }
}
