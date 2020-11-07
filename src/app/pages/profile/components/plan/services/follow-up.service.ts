import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FollowUpService {

  constructor(
    private http: HttpClient
) { }
   getFollowUp(visitId, problemId){
    return this.http.get(`api/FollowUp?VisitId=${visitId}&ProblemId=${problemId}`).pipe(map((res: any) => res.Payload));
   }
   createFollowUp(model){
    return this.http.post('api/FollowUp', model).pipe(map((res: any) => res.Payload));
   }
   updateFollowUp(VisitFollowupId , model){
    return this.http.put(`api/FollowUp/${VisitFollowupId}`, model).pipe(map((res: any) => res.Payload));
   }
   deleteFollowUp(VisitFollowupId){
    return this.http.delete(`api/FollowUp/${VisitFollowupId}`).pipe(map((res: any) => res.Payload));
   }

}
