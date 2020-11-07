import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HistoryService } from '../services/history.service';
import { CreateNewSymptomsComponent } from './dialog/create-new-symptoms/create-new-symptoms.component';
import { EditHistoryComponent } from './dialog/edit-history/edit-history.component';


@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit {
  @Input() data;
  drugName: any;
  constructor(
    public dialog: MatDialog,
    public historyService: HistoryService,
    private activatedRoute: ActivatedRoute
  ) { }

  btnStyle2: boolean = true;
  isShow: boolean = false;
  checkFocus: boolean;
  listNewSymptom: any;
  listReview: any;
  listDaily: any;
  listMedication: any;
  listOldSymptom: any;
  listOverall: any;
  visitId: number;
  check: boolean = true;
  patientId: number;
  rate: number;
  currentRate0 = 1;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (pram) => (this.patientId = +pram.get("patientId"))
    );
    this.getDetailPatient();
  }
  async getDetailPatient() {
    const visitId = await this.historyService.getDetailPatient(this.patientId);
    this.visitId = visitId.Payload.VisitId;
    this.getNewSymptom();
    this.getListMedicationByProblem();
  }

  getNewSymptom() { 
      this.historyService.getListVisitSymptomByVisit(this.visitId, this.data.ProblemId).subscribe(res => {
        this.listOverall = res.filter(x => x.SymptomGroupType === 1);
        this.listOldSymptom = res.filter(x => x.SymptomGroupType === 2).map(x => { 
          return {
            ProblemId: x.ProblemId,
            ProblemName: x.ProblemName,
            ResultCode: x.ResultCode,
            ResultName: x.ResultName,
            Status: x.Status,
            SymptomGroupName: x.SymptomGroupName,
            SymptomGroupType: x.SymptomGroupType,
            SymptomId: x.SymptomId,
            SymptomName: x.SymptomName,
            VisitId: x.VisitId,
            VisitSymptomId: x.VisitSymptomId,
            Code: x.ResultCode - 1
          }
        });
        this.listNewSymptom = res.filter(x => x.SymptomGroupType === 3);
        this.listReview = res.filter(x => x.SymptomGroupType === 4);
        this.listDaily = res.filter(x => x.SymptomGroupType === 5);
        this.listMedication = res.filter(x => x.SymptomGroupType === 6);
      })
  }


  rating() {
    this.isShow = !this.isShow;
  }

  changeStyle2() {
    this.btnStyle2 = !this.btnStyle2;
  }
  showItem() {
    this.check = false;
  }
  hideItem() {
    this.check = true;
  }

  clickNo() {
    this.checkFocus = false;
  }
  clickYes() {
    this.checkFocus = true;
  }

  getListMedicationByProblem(){
    this.historyService.listMedicationByProblem(this.patientId, 2).subscribe(res => {
      this.drugName = res;
      console.log("listMedication",res);
      
    });
  }

  updateSymptom(visitId, problemId, symptomId, symptomGroupType, resultCode) {
    let model = {
      ProblemId: problemId,
      SymptomId: symptomId,
      SymptomGroupType: symptomGroupType,
      ResultCode: resultCode,
      Status: 1
    }
    this.historyService.updateSymptom(this.visitId, model).subscribe(res => {
      console.log(this.visitId, model);
      this.historyService.updateSymptom(visitId, model).subscribe(res => {

      });
      Swal.fire({
        icon: 'success',
        title: 'Edit success!',
        showConfirmButton: false,
        timer: 1000
      });
      this.getDetailPatient();
    });
  }
  deleteSymptom(visitSymptomId) {
    let model = {
      Status: 0
    }
    this.historyService.deleteSymptom(visitSymptomId).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: 'Delete success!',
        showConfirmButton: false,
        timer: 1000
      });
      this.getDetailPatient();
    });

  }
  openEditDialog(check) {
    const dialogRef = this.dialog.open(EditHistoryComponent, {
      panelClass: "add",
      data:
      {
        ListVisitProblem: this.data,
        Check: check,
        VisitId: this.data.VisitId,
        ProblemId: this.data.ProblemId
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getDetailPatient();
    });
  }

  openDialog(check) {
    const dialogRef = this.dialog.open(CreateNewSymptomsComponent, {
      panelClass: "add",
      data:
      {
        PatientId: this.patientId,
        ListVisitProblem: this.data,
        Check: check,
        VisitId: this.data.VisitId,
        ProblemId: this.data.ProblemId
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getDetailPatient();
    });

  }


}
