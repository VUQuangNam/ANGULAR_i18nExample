import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "../services/notifications.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-detail-notification",
  templateUrl: "./detail-notification.component.html",
  styleUrls: ["./detail-notification.component.scss"],
})
export class DetailNotificationComponent implements OnInit {
  constructor(
    public notificationService: NotificationsService,
    public activatedRoute: ActivatedRoute
  ) {}

  notificationId: number;
  notiDeatil: any;
  content: string;
  ngOnInit(): void {}

  getDetailsNoti() {
    this.notificationService
      .getNotificationDetails(this.notificationId)
      .subscribe((res) => {
        this.notiDeatil = res;
        this.content = this.notiDeatil.Content;
      });
  }
}
