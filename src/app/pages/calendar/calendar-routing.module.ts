import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//component
import { CalendarComponent } from "./components/calendar.component";


const routes: Routes = [
  {
    path: '',
    component: CalendarComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
