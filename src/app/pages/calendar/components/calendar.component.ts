import { Component, ViewChild } from "@angular/core";
import { extend } from "@syncfusion/ej2-base";
import {
  ScheduleComponent,
  EventSettingsModel,
  View,
  EventRenderedArgs,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  ResizeService,
  DragAndDropService,
} from "@syncfusion/ej2-angular-schedule";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateCalendarComponent } from "./dialog/create-calendar/create-calendar.component";

@Component({
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    ResizeService,
    DragAndDropService,
  ],
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent {
  constructor(
    public dialog: MatDialog
  ) { }
  @ViewChild("scheduleObj")
  public scheduleObj: ScheduleComponent;
  public selectedDate: Date = new Date(2018, 1, 15);
  scheduleData = [
    {
      Id: 1,
      Subject: "Story Time for Kids",
      StartTime: new Date(2018, 1, 11, 10, 0),
      EndTime: new Date(2018, 1, 11, 11, 30),
      CategoryColor: "#1aaa55",
    },
    {
      Id: 2,
      Subject: "Camping with Turtles",
      StartTime: new Date(2018, 1, 12, 12, 0),
      EndTime: new Date(2018, 1, 12, 14, 0),
      CategoryColor: "#357cd2",
    },
    {
      Id: 3,
      Subject: "Wildlife Warriors",
      StartTime: new Date(2018, 1, 13, 10, 0),
      EndTime: new Date(2018, 1, 13, 11, 30),
      CategoryColor: "#7fa900",
    },
    {
      Id: 4,
      Subject: "Parrot Talk",
      StartTime: new Date(2018, 1, 14, 9, 0),
      EndTime: new Date(2018, 1, 14, 10, 0),
      CategoryColor: "#ea7a57",
    },
    {
      Id: 5,
      Subject: "Birds of Prey",
      StartTime: new Date(2018, 1, 15, 10, 0),
      EndTime: new Date(2018, 1, 15, 11, 30),
      CategoryColor: "#00bdae",
    },
    {
      Id: 6,
      Subject: "Croco World",
      StartTime: new Date(2018, 1, 16, 12, 0),
      EndTime: new Date(2018, 1, 16, 14, 0),
      CategoryColor: "#f57f17",
    },
    {
      Id: 7,
      Subject: "Venomous Snake Hunt",
      StartTime: new Date(2018, 1, 17, 10, 0),
      EndTime: new Date(2018, 1, 17, 11, 30),
      CategoryColor: "#1aaa55",
    },
    {
      Id: 8,
      Subject: "Face Painting & Drawing events",
      StartTime: new Date(2018, 1, 19, 9, 30),
      EndTime: new Date(2018, 1, 19, 11, 0),
      CategoryColor: "#BCD6BF",
    },
    {
      Id: 9,
      Subject: "Pony Rides",
      StartTime: new Date(2018, 1, 21, 11, 0),
      EndTime: new Date(2018, 1, 21, 13, 0),
      CategoryColor: "#BCD6BF",
    },
    {
      Id: 10,
      Subject: "Feed the Giants",
      StartTime: new Date(2018, 1, 22, 9, 30),
      EndTime: new Date(2018, 1, 22, 11, 0),
      CategoryColor: "#BCD6BF",
    },
    {
      Id: 11,
      Subject: "Jungle Treasure Hunt",
      StartTime: new Date(2018, 1, 9, 10, 0),
      EndTime: new Date(2018, 1, 9, 11, 30),
      CategoryColor: "#BCD6BF",
    },
  ];

  public eventSettings: EventSettingsModel = {
    dataSource: <Object[]>extend([], this.scheduleData, null, true),
  };
  oneventRendered(args: EventRenderedArgs): void {
    let categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.scheduleObj.currentView === "Agenda") {
      (args.element
        .firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCalendarComponent, {
      panelClass: "edit",
      
    });

    dialogRef.afterClosed().subscribe(result => {
    
    });
  }

}
