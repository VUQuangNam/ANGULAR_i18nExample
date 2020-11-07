import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { HistoryService } from '../../../services/history.service';
@Component({
  selector: 'app-edit-history',
  templateUrl: './edit-history.component.html',
  styleUrls: ['./edit-history.component.scss']
})
export class EditHistoryComponent implements OnInit {



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditHistoryComponent>,
    public historyService: HistoryService
  ) { }
  checkItem: boolean;
  check: number;
  listNewSymptom: any;
  listReview: any;
  listDaily: any;
  listMedication: any;
  listOldSymptom: any;
  listOverall: any;
  checkFocus: boolean;

  ngOnInit(): void {
    this.check = this.data.Check;
    this.getNewSymptom();
  }
  showItem() {
    this.checkItem = false;
  }
  hideItem() {
    this.checkItem = true;
  }

  clickNo() {
    this.checkFocus = false;
  }
  clickYes() {
    this.checkFocus = true;
  }

  getNewSymptom() {
    this.historyService.getListVisitSymptomByVisit(this.data.VisitId, this.data.ProblemId).subscribe(res => {
      this.listOverall = res.filter(x => x.SymptomGroupType === 1);
      this.listOldSymptom = res.filter(x => x.SymptomGroupType === 2);
      this.listNewSymptom = res.filter(x => x.SymptomGroupType === 3);
      this.listReview = res.filter(x => x.SymptomGroupType === 4);
      this.listDaily = res.filter(x => x.SymptomGroupType === 5);
      this.listMedication = res.filter(x => x.SymptomGroupType === 6);
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
    this.historyService.updateSymptom(visitId, model).subscribe(res => {
      this.historyService.updateSymptom(visitId, model).subscribe(res => {
     
 });
      console.log(model);
      Swal.fire({
        icon: 'success',
        title: 'Edit success!',
        showConfirmButton: false,
        timer: 1000
      });
      this.getNewSymptom();
    });
  }
  deleteSymptom(visitSymptomId) {
    let model = {
      Status: 0
    }
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9FB9C8',
      cancelButtonColor: '',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.historyService.deleteSymptom(visitSymptomId).subscribe(res => {
          this.getNewSymptom();
        });
      }
    })

  }

  closeDialog() {
    this.dialogRef.close();
  }

}
