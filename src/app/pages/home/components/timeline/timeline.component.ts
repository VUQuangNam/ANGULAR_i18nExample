import { Component, OnInit } from "@angular/core";
import { extend } from "@syncfusion/ej2-base";
import {
  EventSettingsModel,
  View,
  TimelineViewsService,
  TimelineMonthService,
  AgendaService,
  ResizeService,
  DragAndDropService,
  GroupModel,
} from "@syncfusion/ej2-angular-schedule";
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.scss"],
  providers: [
    TimelineViewsService,
    TimelineMonthService,
    AgendaService,
    ResizeService,
    DragAndDropService,
  ],
})
export class TimelineComponent implements OnInit {
  public rowAutoHeight: boolean = true;
  public scheduleViews: View[] = ["TimelineDay"];
  public currentView: View = "TimelineDay";
  public group: GroupModel = {
    enableCompactView: false,
    resources: ["MeetingRoom"],
  };
  public selectedDate: Date = new Date();
  // public eventSettings: EventSettingsModel = { dataSource: scheduleData };
  test = [
    {
      Id: 1,
      Subject: "Meeting 1",
      Content: "Test",
      Location: "Space Centre USA",
      StartTime: new Date(2020, 9, 9, 9, 30),
      EndTime: new Date(2020, 9, 9, 11, 0),
      CategoryColor: "#1aaa55",
    },
  ];
  // public selectedDate: Date = new Date();
  // public currentView: View = 'TimelineWeek';
  public eventSettings: EventSettingsModel = {
    dataSource: <Object[]>extend([], this.test, null, true),
  };
  today: Date;
  getDate: string;
  getMonth: string;
  getYear: number;
  getHour: number;
  getMinutes: number;
  getTime: string;
  timer: string;
  providerId: any;

  constructor(
    private timelineService: ProviderService
  ) {}

  ngOnInit(): void {
    this.today = new Date();
    this.getDate = (this.today.getDate() < 10 ? "0" : "") + this.today.getDate();
    this.getMonth = (this.today.getMonth() < 9 ? "0" : "") + (this.today.getMonth() + 1);
    this.getYear = this.today.getFullYear();
    this.getHour = this.today.getHours();
    this.getMinutes = this.today.getMinutes();
    this.getTime = this.getYear + "-" + this.getMonth + "-" + this.getDate;
    this.timer = this.getHour + ":" + (this.getMinutes < 10 ? '0' : '') + this.getMinutes;
    this.getProfile();
  }
  
  getTimelineHomeProvider(){
      this.timelineService.getCalenderProvider(this.providerId, null).subscribe(res => {
          console.log(res);
      });
  }
  getProfile() {
    this.timelineService.getProfileProvider().subscribe(res => {
      this.providerId = res.ProviderId;
      this.getTimelineHomeProvider();
    });
  }

}
