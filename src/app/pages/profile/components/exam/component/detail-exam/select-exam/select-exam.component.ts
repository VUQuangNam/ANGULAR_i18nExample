import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-select-exam',
    templateUrl: './select-exam.component.html',
    styleUrls: ['./select-exam.component.scss']
})
export class SelectExamComponent implements OnInit {
    examSub: any = [];
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<SelectExamComponent>,
    ) { }

    ngOnInit() {
        this.examSub = this.data;
    }

    closeDialog = () => {
        this.dialogRef.close();
    }

    searchExam = (key) => {
        if (!key) this.examSub = this.data;
        this.examSub = this.data.filter(
            (x) => x.Name.toLowerCase().indexOf(key.toLowerCase()) > -1
        );
    }

    onSelectItem = (item) => {
        try {
            const value = this.data.find(x => x.ExamId == item.ExamId);
            value.checked = !value.checked;
        } catch (ex) {
            console.log(ex);
        }
    }

}
