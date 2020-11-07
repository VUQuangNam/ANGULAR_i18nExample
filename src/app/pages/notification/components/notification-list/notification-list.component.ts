import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "../services/notifications.service";

@Component({
  selector: "app-notification-list",
  templateUrl: "./notification-list.component.html",
  styleUrls: ["./notification-list.component.scss"],
})
export class NotificationListComponent implements OnInit {
  constructor(public notificationsService: NotificationsService) {}

  listnoti: any;
  ngOnInit(): void {
    this.getAllNotification();
  }

  getAllNotification() {
    this.notificationsService.getAllNotifications().subscribe((res) => {
      this.listnoti = res;
      console.log("danh sách thông báo", this.listnoti);
    });
  }
}
