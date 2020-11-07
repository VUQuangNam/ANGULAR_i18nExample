import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { TestService } from '../../services';
import { ViewTestComponent } from './view-test/view-test.component';

@Component({
    selector: 'app-biopsy',
    templateUrl: './biopsy.component.html',
    styleUrls: ['./biopsy.component.scss']
})
export class BiopsyComponent implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute,
        public testService: TestService,
        public dialog: MatDialog
    ) { }

    displayedColumns = [
        'Test'
    ];
    displayedColumnsData = [
        'Order'
    ];
    countArr = [];
    patientId: number;
    listPatientTestResultMediaBiopsy: any;
    dataSource: any;
    fileCount: number;
    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(param => this.patientId = +param.get('patientId'));
        this.getPatientTestResultMedia();
    }

    showTest(patientTestResultMedias, patientTestResultId, testId) {
        this.dialog.open(ViewTestComponent, {
            data: {
                PatientTestResultId: patientTestResultId,
            }
        }).afterClosed().subscribe(() => {
            this.getPatientTestResultMedia();
        });
    }
    getPatientTestResultMedia() {
        this.testService.getPatientTestResultMediaBiopsy(this.patientId, null, null).subscribe(data => {
            this.listPatientTestResultMediaBiopsy = data;
            this.displayedColumns.splice(1, this.displayedColumns.length)
            for (let i = 0; i < this.listPatientTestResultMediaBiopsy.length; i++) {
                for (let j = 0; j < this.listPatientTestResultMediaBiopsy[i].length; j++) {
                    if (this.listPatientTestResultMediaBiopsy[i][j].TestDate != null && !this.displayedColumns.includes(this.listPatientTestResultMediaBiopsy[i][j].TestDate.split('T')[0])) {
                        this.displayedColumns.push(this.listPatientTestResultMediaBiopsy[i][j].TestDate.split('T')[0]);
                    }
                }
            }
            this.dataSource = new MatTableDataSource(this.listPatientTestResultMediaBiopsy)
        })
    }
}
