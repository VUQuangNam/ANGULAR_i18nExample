import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { OpenClientsComponent } from "./components/open-clients/open-clients.component";
import { RecentClientsComponent } from "./components/recent-clients/recent-clients.component";
import { SharedModule } from "../../shared/shared.module";
import { HomeComponent } from "./components/home.component";

import { NoteComponent } from "./components/note/note.component";
import { TodayComponent } from "./components/today/today.component";
import { ButtonsModule } from "@progress/kendo-angular-buttons";

import { TimelineComponent } from "./components/timeline/timeline.component";
import { CreateNoteComponent } from "./components/note/create-note/create-note.component";
import { EditNoteComponent } from "./components/note/edit-note/edit-note.component";
import { DeleteComponent } from "./components/note/delete/delete.component";

//
import { ScheduleModule } from "@syncfusion/ej2-angular-schedule";
import { ButtonModule } from "@syncfusion/ej2-angular-buttons";
import {
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  MonthAgendaService,
} from "@syncfusion/ej2-angular-schedule";
import { ProfileDoctorComponent } from './components/profile-doctor/profile-doctor.component';

@NgModule({
  declarations: [
    OpenClientsComponent,
    RecentClientsComponent,
    HomeComponent,
    NoteComponent,
    TodayComponent,
    ProfileDoctorComponent,
    TimelineComponent,
    CreateNoteComponent,
    EditNoteComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ButtonsModule,
    ScheduleModule,
    ButtonModule,
  ],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class HomeModule {}
