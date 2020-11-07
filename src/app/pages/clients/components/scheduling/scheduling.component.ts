
import { Location } from "@angular/common";
import { ViewEncapsulation } from "@angular/core";
import { ViewChild } from "@angular/core";
import { Inject } from "@angular/core";
import { Component } from "@angular/core";
import {
  EventSettingsModel,
  View,
  GroupModel,
  TimelineViewsService,
  TimelineMonthService,
  DayService,
  ResizeService,
  DragAndDropService,
  ResourceDetails,
  ScheduleComponent,
} from "@syncfusion/ej2-angular-schedule";
import { extend } from "@syncfusion/ej2-base";
import { roomData } from "./datasource";
@Component({
  encapsulation: ViewEncapsulation.None,
  providers: [
    DayService,
    TimelineViewsService,
    TimelineMonthService,
    ResizeService,
    DragAndDropService,
  ],
  selector: "app-scheduling",
  templateUrl: "./scheduling.component.html",
  styleUrls: ["./scheduling.component.scss"],
})
export class SchedulingComponent {
  constructor(private location: Location) {}

  ngOnInit(): void {}
  back() {
    this.location.back();
  }
  public selectedDate: Date = new Date(2018, 7, 1);
  public rowAutoHeight: boolean = true;
  public scheduleViews: View[] = ["TimelineDay"];
  public currentView: View = "TimelineDay";
  public group: GroupModel = {
    enableCompactView: false,
    resources: ["MeetingRoom"],
  };
  public allowMultiple: Boolean = true;
  public resourceDataSource: Object[] = [
    { text: "Ton", id: 1, color: "#98AFC7" },
    { text: "Adam", id: 2, color: "#99c68e" },
    { text: "Helen", id: 3, color: "#C2B280" },
    { text: "Jimmy", id: 4, color: "#3090C7" },
    { text: "David", id: 5, color: "#95b9" },
    { text: "Ton1", id: 6, color: "#95b9c7" },
    { text: "Ton2", id: 7, color: "#deb887" },
    { text: "Ton3", id: 8, color: "#3090C7" },
    { text: "Ton4", id: 9, color: "#98AFC7" },
    { text: "Ton5", id: 10, color: "#778899" },
  ];

  public eventSettings: EventSettingsModel = {
    dataSource: roomData,
    fields: {
      id: "Id",
      subject: { name: "Subject", title: "Summary" },
      location: { name: "Location", title: "Location" },
      description: { name: "Description", title: "Comments" },
      startTime: { name: "StartTime", title: "From" },
      endTime: { name: "EndTime", title: "To" },
    },
  };
  public listabc;
}
