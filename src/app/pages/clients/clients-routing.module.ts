import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//component
import { ClientsComponent } from "../clients/components/clients.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { ReasonForBookingComponent } from "./components/reason-for-booking/reason-for-booking.component";
import { SchedulingComponent } from "./components/scheduling/scheduling.component";

const routes: Routes = [
  {
    path: "",
    component: ClientsComponent,
  },
  {
    path: "registration",
    component: RegistrationComponent,
  },
  {
    path: "reason-booking",
    component: ReasonForBookingComponent,
  },
  {
    path: "reason-booking/schedule",
    component: SchedulingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
