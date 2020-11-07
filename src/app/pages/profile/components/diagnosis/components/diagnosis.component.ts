import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";

import { DiagnosisService } from "../service";
@Component({
  selector: "app-diagnosis",
  templateUrl: "./diagnosis.component.html",
  styleUrls: ["./diagnosis.component.scss"],
})
export class DiagnosisComponent implements OnInit {
  constructor(
    private diagnosisService: DiagnosisService,
    private route: ActivatedRoute
  ) {}

  problemList: any;
  patientId: number;

  async ngOnInit() {
    this.patientId = this.route.snapshot.params.patientId;
    const res = await this.diagnosisService.detailPatient(this.patientId);
    let respone = await this.diagnosisService.listProblemByVisit(
      res.Payload.VisitId
    );
    if (respone.Ok) {
      this.problemList = respone.Payload;
    } else {
      swal.fire(
        "Warning!",
        "An error occurred.Please try again later.!",
        "warning"
      );
    }
    respone = await this.diagnosisService.listOldProblem(this.patientId);
    this.problemList = this.problemList.concat(
      respone.Payload.filter((x) => x.Type == 2)
    );
  }
}
