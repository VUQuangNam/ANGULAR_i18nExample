import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-plan-high-blood-pressure",
  templateUrl: "./plan-high-blood-pressure.component.html",
  styleUrls: ["./plan-high-blood-pressure.component.scss"],
})
export class PlanHighBloodPressureComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {
    // console.log(this.data);
  }
}
