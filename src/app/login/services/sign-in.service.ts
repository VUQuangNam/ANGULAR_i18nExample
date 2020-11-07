import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';


@Injectable({
    providedIn: 'root'
})

export class LoginService {
    private http: HttpClient
    constructor(private handler: HttpBackend) {
        this.http = new HttpClient(handler);
    }
    public login(username: string, pwd: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        return this.http.post<any>('http://192.168.1.33/emrserver/token',
            `grant_type=password&username=${username}&password=${pwd}`,
            httpOptions);

    }
    // getPrivilege() {
    //     return this.http.get(`http://192.168.1.33/spacrm/api/privilege/username`).pipe(map((res: any) => res.Payload));
    //   }
}