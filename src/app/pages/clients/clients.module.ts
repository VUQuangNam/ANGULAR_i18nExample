import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { ClientsRoutingModule } from "./clients-routing.module";
import { ClientsComponent } from "./components/clients.component";
import { SharedModule } from "../../shared/shared.module";
import { RegistrationComponent } from "./components/registration/registration.component";
import { ReasonForBookingComponent } from "./components/reason-for-booking/reason-for-booking.component";
import { SchedulingComponent } from "./components/scheduling/scheduling.component";
import { SearchPatientComponent } from "./components/dialog/search-patient/search-patient.component";
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

@NgModule({
  declarations: [
    ClientsComponent,
    RegistrationComponent,
    ReasonForBookingComponent,
    SchedulingComponent,
    SearchPatientComponent,
  ],

  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule,
    ClientsRoutingModule,
    MatIconModule,
    MatSelectModule,
    ScheduleModule,
  ],
  exports: [MatIconModule, MatSelectModule],
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
export class ClientsModule {}
