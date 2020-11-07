
import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { HistoryService } from './services/history.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

    constructor(
        private historyService: HistoryService,
        private activatedRoute: ActivatedRoute
    ) { }
    problemList: any = [];
    patientId: number;
    visitId: number;
    oldProblem: any;
    today: string;
    listVisit: any;
    oldProblemList: any;
    newProblemList: any;


    ngOnInit() {
        var date = new Date();
        var day = (date.getDate() < 10 ? '0' : '') +
            date.getDate();
        var month = (date.getMonth() < 10 ? '0' : '') +
            (date.getMonth() + 1);
        var year = (date.getFullYear() < 10 ? '0' : '') +
            date.getFullYear();
        this.today = year + '-' + month + '-' + day;
        this.activatedRoute.paramMap.subscribe(
            (pram) => (this.patientId = +pram.get("patientId"))
        );
        this.getNewProblem();
        this.getOldProblem();
    }

    async getNewProblem() {
        const visitId = await this.historyService.getDetailPatient(this.patientId);
        this.listVisit = await this.historyService.getProblemOfVisit(visitId.Payload.VisitId);
        this.newProblemList = this.listVisit.Payload.concat(this.oldProblemList);
    }

    getOldProblem() {
        this.historyService.getOldProblem(this.patientId).subscribe(res => {
            this.oldProblemList = res.filter(x => x.Type === 2);
        });
    }
}
