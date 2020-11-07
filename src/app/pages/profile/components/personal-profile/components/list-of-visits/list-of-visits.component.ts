import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';

import { AlertService } from 'src/app/shared/services/alert.service';
import { ListofvisitsService } from '../../service';

@Component({
    selector: 'app-list-of-visits',
    templateUrl: './list-of-visits.component.html',
    styleUrls: ['./list-of-visits.component.scss']
})



export class ListOfVisitsComponent implements OnInit {
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    constructor(
        public dialog: MatDialog,
        public alertService: AlertService,
        public activatedRoute: ActivatedRoute,
        public listofvisitsService: ListofvisitsService
    ) { }
    displayedColumns = ['Date', 'Problem', 'Review']
    dataSource: any;
    Listofvisits: any;
    patientId: number;
    showButton: boolean = false;
    isShow: boolean = false
    StartDate: string;
    Problem: string;
    VisitProblem: any;

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(param => this.patientId = +param.get('patientId'));
        this.getListOfVisit();
    }

    getListOfVisit() {
        this.listofvisitsService.listVisitPatient(this.patientId).subscribe(res => {
            this.Listofvisits = res;
            this.dataSource = this.Listofvisits;

        });
    };



}


