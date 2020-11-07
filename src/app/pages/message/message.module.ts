import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageListComponent } from './components/message-list/message-list.component';
import {UserComponent} from '../../shared/components/user/user.component'
import {SharedModule} from '../../shared/shared.module';
import { RecentComponent } from './components/message/recent/recent.component'
@NgModule({
  declarations: [MessageListComponent, RecentComponent,],
  imports: [
    CommonModule,
    MessageRoutingModule,
    SharedModule
  ]
})
export class MessageModule { }
