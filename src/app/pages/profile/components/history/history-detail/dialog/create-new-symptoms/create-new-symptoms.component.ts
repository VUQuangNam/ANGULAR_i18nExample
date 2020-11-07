import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { HistoryService } from '../../../services/history.service';

@Component({
    selector: 'app-create-new-symptoms',
    templateUrl: './create-new-symptoms.component.html',
    styleUrls: ['./create-new-symptoms.component.scss']
})
export class CreateNewSymptomsComponent implements OnInit {
    listTerm: any;
    isLoading: boolean = true;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<CreateNewSymptomsComponent>,
        public historyService: HistoryService
    ) { }

    symptomName: string;
    listSymptom: any;
    filterSymptom: any;
    symptomId: number;
    showItem: boolean;
    check: number;
    listNewSymptom: any;
    listReview: any;
    listDaily: any;
    listMedication: any;
    listOldSymptom: any;
    listOverall: any;
    listSelected: any = [];
    isShow: boolean = false;
    visitId: number;
    SNOMEDCode: number;
    keypress;
    checkClickSave: boolean = false;

    ngOnInit(): void {
        this.check = this.data.Check;
        this.getListSymptom();
        this.getNewSymptom();
        this.getDetailPatient();
    }

    getNewSymptom() {
        this.historyService.getListVisitSymptomByVisit(this.data.VisitId, this.data.ProblemId).subscribe(res => {
            this.listOverall = res.filter(x => x.SymptomGroupType === 1);
            this.listOldSymptom = res.filter(x => x.SymptomGroupType === 2);
            this.listNewSymptom = res.filter(x => x.SymptomGroupType === 3);
            this.listReview = res.filter(x => x.SymptomGroupType === 4);
            this.listDaily = res.filter(x => x.SymptomGroupType === 5);
            this.listMedication = res.filter(x => x.SymptomGroupType === 6);
            this.listSelected = this.listOverall.concat(this.listOldSymptom).concat(this.listNewSymptom).
                concat(this.listReview).concat(this.listDaily).concat(this.listMedication).concat(this.listSelected);
            console.log(this.listSelected);
        });
    }
    filterListSymptom(key) {
        if (!key) this.filterSymptom = [];
        this.showItem = false;
        if (key) this.filterSymptom = this.listSymptom.filter((x) => x.Name.toLowerCase().indexOf(key.toLowerCase()) > -1);
    }


searchTermSymptom(key) {
    if (!key) {
        this.isLoading = true;
        this.listTerm = [];
        this.showItem = false;
    }
    else{
        this.isLoading = false
        clearTimeout(this.keypress);
        this.keypress = setTimeout(() => {
            this.historyService.searchTerm(key).subscribe(res => {
                this.listTerm = res;
                this.isLoading = true;
            });
        }, 500);
    } 
 
}
setTermValue(name, symptomId, SNOMEDCode) {
    const checkListTerm = this.listNewSymptom.find(x => x.SNOMEDCode == SNOMEDCode);
    if (checkListTerm) return Swal.fire({
        icon: 'warning',
        title: 'This item has been choose!',
        showConfirmButton: false,
        timer: environment.timeCloseDialog
    });
    this.showItem = true;
    this.symptomName = name;
    this.SNOMEDCode = SNOMEDCode;
    this.listTerm = [];
    this.filterSymptom = [];
}
setValue(name, symptomId) {
    const datacheck = this.listSelected.find(x => x.SymptomId == symptomId);
    if (datacheck) return Swal.fire({
        icon: 'warning',
        title: 'This item has been choose!',
        showConfirmButton: false,
        timer: environment.timeCloseDialog
    });
    this.showItem = true;
    this.symptomName = name;
    this.symptomId = symptomId;
    this.listTerm = [];
    this.filterSymptom = [];
}
closeDialog() {
    this.symptomName = "";
    this.dialogRef.close();
}

getListSymptom() {
    this.historyService.getListSymptom(this.data.Check).subscribe(res => {
        this.listSymptom = res;
        this.listSymptom.forEach(x => {
            x.Name = x.Name || "";
        });
    });
}
getTerm(key) {
    this.historyService.searchTerm(key).subscribe(res => {
        this.listTerm = res;
        console.log(this.listTerm);
    });
}
async getDetailPatient() {
    const visitId = await this.historyService.getDetailPatient(this.data.PatientId);
    this.visitId = visitId.Payload.VisitId;
}

createNewSymptom() {
    this.checkClickSave == true;
    if (this.showItem === false) {
        let data = {
            VisitId: this.visitId,
            ProblemId: this.data.ListVisitProblem.ProblemId,
            SymptomId: this.symptomId,
            SymptomName: this.symptomName,
            ResultCode: 0,
            SymptomGroupType: this.check
        }
        this.historyService.createSymptom(data).subscribe(res => {
            Swal.fire({
                icon: 'success',
                title: 'Create success!',
                showConfirmButton: false,
                timer: environment.timeCloseDialog
            });
            this.checkClickSave == false;
            this.dialogRef.close();
        });
    }
    else {
        let data = {
            VisitId: this.visitId,
            ProblemId: this.data.ListVisitProblem.ProblemId,
            SymptomId: this.symptomId,
            SNOMEDCode: +this.SNOMEDCode,
            SymptomName: this.symptomName,
            ResultCode: 0,
            SymptomGroupType: this.check
        }
        this.historyService.createSymptom(data).subscribe(res => {
            Swal.fire({
                icon: 'success',
                title: 'Create success!',
                showConfirmButton: false,
                timer: environment.timeCloseDialog
            });
            this.checkClickSave == false;
            this.dialogRef.close();
        });
    }
}

}
