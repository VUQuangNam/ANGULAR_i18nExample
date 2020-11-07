import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { CalendarRoutingModule } from "../calendar/calendar-routing.module";
import { CalendarComponent } from "./components/calendar.component";
import {
  ScheduleModule,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  MonthAgendaService,
  TimelineViewsService,
  TimelineMonthService,
  
} from "@syncfusion/ej2-angular-schedule";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule,
    ScheduleModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    TimelineViewsService,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    TimelineViewsService,
    TimelineMonthService,
  ],
})
export class CalendarModule {}
