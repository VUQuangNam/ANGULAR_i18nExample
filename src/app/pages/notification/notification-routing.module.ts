import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NotificationListComponent } from "./components/notification-list/notification-list.component";
import { DetailNotificationComponent } from "./components/detail-notification/detail-notification.component";

const routes: Routes = [
  {
    path: "",
    component: NotificationListComponent,
  },
  {
    path: "notificationid",
    component: DetailNotificationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationRoutingModule {}
