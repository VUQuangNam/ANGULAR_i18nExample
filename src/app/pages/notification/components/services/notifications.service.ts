import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BaseApiService } from "../../../../shared/services/base.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class NotificationsService extends BaseApiService<any> {
  // API_URI = "api/PatientAllergy";
  constructor(public http: HttpClient) {
    super(http, "api/notification ");
  }
  getAllNotifications() {
    return this.http
      .get("api/notification")
      .pipe(map((res: any) => res.Payload.reverse()));
  }
  getNotificationDetails(notificationid: number) {
    return this.http
      .get(`api/notification?notificationid=${notificationid}`)
      .pipe(map((res: any) => res.Payload));
  }
}
