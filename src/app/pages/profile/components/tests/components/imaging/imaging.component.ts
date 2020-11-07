import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { ViewTestComponent } from '../biopsy/view-test/view-test.component'
import { TestService } from '../../services';

@Component({
    selector: 'app-imaging',
    templateUrl: './imaging.component.html',
    styleUrls: ['./imaging.component.scss']
})
export class ImagingComponent implements OnInit {

    displayedColumns = [
        'Test'
    ];
    displayedColumnsData = [
        'Graph',
        'Order'
    ];
    packagesList: any;
    patientId: any;
    package: any;
    dataSource: any;
    packageDefault: number;
    isActive: number;
    testList: any;
    testId: number;
    isOrder: boolean = true;
    countArr = [];
    listPatientTestResultMediaBiopsy: any;
    fileCount: number;

    constructor(
        private testService: TestService,
        private activatedRoute: ActivatedRoute,
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(param => this.patientId = +param.get('patientId'));
        this.getListOfPackages();
    }


    orderStatus() {
        this.isOrder = !this.isOrder
        if (!this.isOrder) {
            document.getElementById("touch_app").style.opacity = "0.5";
        }
        else {
            document.getElementById("touch_app").style.opacity = "1";
        }
    }

    // lay danh sach packages trong lab module
    getListOfPackages() {
        this.testService.getAllPackage().subscribe(data => {
            this.packagesList = data;
            this.packageDefault = this.packagesList.PackageId
        })
    }

    getPackagesDetail(packagesId: number) {
        this.isActive = packagesId;
        this.testService.getPackagesDetail(this.patientId, null, packagesId, null).subscribe(packageData => {
            this.package = packageData;
            this.displayedColumns.splice(1, this.displayedColumns.length)
            for (let i = 0; i < this.package.length; i++) {
                for (let j = 0; j < this.package[i].length; j++) {
                    if (this.package[i][j].TestDate != null && !this.displayedColumns.includes(this.package[i][j].TestDate.split('T')[0])) {
                        this.displayedColumns.push(this.package[i][j].TestDate.split('T')[0]);
                    }
                }
            }
            this.dataSource = new MatTableDataSource(this.package);
        })
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
