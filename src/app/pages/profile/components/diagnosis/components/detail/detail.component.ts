import { Component, Input, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import Swal from "sweetalert2";

import { DiagnosisService } from "../../service";
import { DiagnosisModel } from "../../model";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-diagnosis-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DiagnosisDetailComponent implements OnInit {
  [x: string]: any;
  @Input() data;
  constructor(
    public dialog: MatDialog,
    private diagnosisService: DiagnosisService,
    private route: ActivatedRoute
  ) {}
  Listdiagnosis: any;
  DiagnosisName: string;
  DiagnosisName1: string;
  DiagnosisName2: string;
  DiagnosisName3: string;
  DiagnosisName4: string;
  VisitId: number;
  patientId: number;
  problemId: number;
  showItem: boolean;
  diagnosisList: any;
  sequenceNumber1: any;
  sequenceNumber2: any;
  sequenceNumber3: any;
  sequenceNumber4: any;
  sequenceNumber5: any;
  sequenceNumber: any;
  sequenceNumberone: any;
  sequenceNumbertwo: any;
  sequenceNumberthree: any;
  sequenceNumberfour: any;
  sequenceNumberfive: any;
  result: any = [Object];
  diagnosisLastList: any;
  today: string;
  diagnosisLastVisit: any;
  type = 0;
  isLoading = true;
  async ngOnInit() {
    this.patientId = this.route.snapshot.params.patientId;
    var date = new Date();
    var day = (date.getDate() < 10 ? "0" : "") + date.getDate();
    var month = (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1);
    var year = date.getFullYear();
    this.today = day + "/" + month + "/" + year;
    this.dataSource = new MatTableDataSource(this.data);
    this.getDiagnosisofVisitId();
    this.getDiagnosisLast();
    this.getTerm(this.key);
    const data = await this.diagnosisService.detailPatient(this.patientId);
  }
  createDiagnosis() {
    this.result.forEach((x) => {
      console.log(x);
      if (x) {
        let model = new DiagnosisModel();
        model.SequenceNumber = x.SequenceNumber;
        model.SNOMEDName = x.SNOMEDName;
        model.ProblemId = this.data.ProblemId;
        model.VisitId = this.data.VisitId;
        model.SNOMEDCode = x.SNOMEDCode;
        model.SNOMEDFullName = x.SNOMEDFullName;

        this.diagnosisService.createDiagnosisofVisit(model).subscribe((res) => {
          Swal.fire("Notification!", "Success!", "success");
        });
      }
    });
  }
  onChangeValue(item, type) {
    this.result[type] = this.result[type] || {};
    this.result[type].SNOMEDCode = item.SNOMEDCode;
    this.result[type].SNOMEDFullName = item.FullName;
    this.result[type].SNOMEDName = item.CommonName;
    this.result[type].SequenceNumber = type;
    this.showItem = true;
    this.diagnosisList = [];
    switch (type) {
      case 1:
        this.DiagnosisName = item.FullName;
        break;
      case 2:
        this.DiagnosisName1 = item.FullName;
        break;
      case 3:
        this.DiagnosisName2 = item.FullName;
        break;
      case 4:
        this.DiagnosisName3 = item.FullName;
        break;
      case 5:
        this.DiagnosisName4 = item.FullName;
        break;
      default:
        break;
    }
  }
  searchTermDiagnosis(key, type) {
    clearTimeout(this.keypress);
    this.type = type;
    this.keypress = setTimeout(() => {
      this.getTerm(key);
    }, 500);
  }

  getTerm(key) {
    this.diagnosisService.SearchDiagnosis(key).subscribe((res) => {
      this.diagnosisList = res;
      //  console.log('aaa', this.diagnosisList)
    });
  }
  getDiagnosisofVisitId() {
    this.diagnosisService
      .getDiagnosis(this.data.VisitId, this.data.ProblemId)
      .subscribe((res) => {
        this.diagnosisLastList = res;
        this.sequenceNumber1 = res.find((x) => x.SequenceNumber === 1);
        this.sequenceNumber2 = res.find((x) => x.SequenceNumber === 2);
        this.sequenceNumber3 = res.find((x) => x.SequenceNumber === 3);
        this.sequenceNumber4 = res.find((x) => x.SequenceNumber === 4);
        this.sequenceNumber5 = res.find((x) => x.SequenceNumber === 5);
      });
  }
  getDiagnosisLast() {
    this.diagnosisService
      .getDiagnosisLast(this.patientId, this.data.ProblemId)
      .subscribe((res) => {
        this.diagnosisLastVisit = res;
        this.sequenceNumberone = res.find((x) => x.SequenceNumber === 1);
        this.sequenceNumbertwo = res.find((x) => x.SequenceNumber === 2);
        this.sequenceNumberthree = res.find((x) => x.SequenceNumber === 3);
        this.sequenceNumberfour = res.find((x) => x.SequenceNumber === 4);
        this.sequenceNumberfive = res.find((x) => x.SequenceNumber === 5);
      });
  }
}
