import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { SharedModule } from "../../shared/shared.module";
import { DetailNotificationComponent } from './components/detail-notification/detail-notification.component';


@NgModule({
  declarations: [NotificationListComponent, DetailNotificationComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class NotificationModule { }
