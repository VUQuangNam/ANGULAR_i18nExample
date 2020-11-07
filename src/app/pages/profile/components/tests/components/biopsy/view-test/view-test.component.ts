import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert2';

import { TestService } from '../../../services';

@Component({
    selector: 'app-view-test',
    templateUrl: './view-test.component.html',
    styleUrls: ['./view-test.component.scss']
})
export class ViewTestComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<ViewTestComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        public testService: TestService
    ) { }
    listMedias: any;

    ngOnInit(): void {
        this.listMedias = this.data.patientTestResultMedias;
        this.updateTest();
    }
    updateTest() {
        let model = {
            "Status": 2
        }

        this.testService.putPatientTestResult(this.data.PatientTestResultId, model).subscribe(res => {
            swal.fire({
                icon: "success",
                title: "Done!",
                showConfirmButton: false,
                timer: 1500,
            });
        })
    }
}
;