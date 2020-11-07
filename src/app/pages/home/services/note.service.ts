import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { BaseApiService } from '../../../shared/services/base.service';
import { Observable } from 'rxjs';

import { NoteModel } from '../models/note.model';

@Injectable({
    providedIn: 'root'
})
export class NoteService extends BaseApiService<any>{
    constructor(public http: HttpClient) {
        super(http, 'api/note')
    }

    noteDetail(noteId: number): Observable<NoteModel> {
        return this.http.get<NoteModel>(`api/note/detail?noteid=${noteId}`).pipe(map((result: any) => result.Payload));
    }

    noteUpdate(noteId: number, data: any): Observable<NoteModel> {
        return this.http.put<NoteModel>(`api/note/${noteId}`, data);
    }
}