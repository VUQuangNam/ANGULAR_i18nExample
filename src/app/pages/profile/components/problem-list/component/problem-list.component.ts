import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

import { ProblemModel } from "src/app/pages/clients/models/problem.model";
import { TabMenuService } from "src/app/shared/services/tabMenu.service";

import Swal from "sweetalert2";
import { ProblemService } from '../services';
import * as moment from 'moment';

@Component({
    selector: "app-problem-list",
    templateUrl: "./problem-list.component.html",
    styleUrls: ["./problem-list.component.scss"],
})

export class ProblemListComponent implements OnInit {
    constructor(
        private data: TabMenuService,
        private problemService: ProblemService,
        public dialog: MatDialog,
        private route: ActivatedRoute,
    ) { }

    patientId: number;
    patientModel: any;
    newProblem: any;
    oldProblem: any;
    problemList: any = []
    isLoading = false;
    nameNewProblem: string;
    visitId: number;

    ngOnInit() {
        this.patientId = +this.route.snapshot.params.patientId;
        this.getDetailPatient();
        this.getOldProblem();
    }

    getDetailPatient() {
        this.problemService.getDetailPatient(this.patientId).subscribe((res) => {
            this.patientModel = res;
            if (!res.VisitId) {
                this.getNewProblem(0);
                const data = {
                    PatientId: this.patientId,
                    StartDate: this.formatDate(new Date(), 'YYYY-MM-DDTHH:mm'),
                    Status: 1,
                    Type: 1
                };
                this.problemService.createVisit(data).subscribe(res => {
                    console.log(res);
                    this.visitId = res;
                });
            } else {
                this.visitId = res.VisitId;
                this.getNewProblem(this.visitId);
            }
        });
    }

    formatDate = (date: any, format: string) => moment.unix(new Date(date).getTime() / 1000).format(format);

    getOldProblem() {
        this.problemService.getOldProblem(this.patientId).subscribe((res) => {
            this.oldProblem = res.reverse();
        });
    }

    getNewProblem(visitId) {
        if (visitId == 0) {
            this.newProblem = [];
        } else {
            this.problemService.getProblemOfVisit(visitId).subscribe(res => {
                this.newProblem = res.map(x => {
                    return {
                        ProblemId: x.ProblemId,
                        Status: x.Status,
                        Name: x.Name,
                        VisitProblemId: x.VisitProblemId,
                        VisitId: x.VisitId,
                        isUpdate: false
                    }
                });
            });
        }
    }

    async sentMessage() {
        this.data.changeMessage(true);
        this.data.changeMessage(this.patientId);
    }

    updateProblemPatient(type: number, visitProblemId: number) {
        let data = new ProblemModel();
        data.Type = type;
        this.problemService
            .updateProblemVisit(visitProblemId, data)
            .subscribe((res) => {
                Swal.fire({
                    icon: "success",
                    title: "Update success!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                this.getDetailPatient();
                this.getOldProblem();
            });
    }

    onCreateNewProblem = () => {
        const data = {
            VisitId: this.visitId,
            Name: this.nameNewProblem,
            Type: 1,
            Status: 1
        }
        this.nameNewProblem = '';
        const checkOld = this.oldProblem.find(x => x.Name === this.nameNewProblem);
        if (checkOld) {
            Swal.fire({
                title: 'It this a new problem or the follow-up on an old problem ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#9FB9C8',
                confirmButtonText: `New problem`,
                cancelButtonColor: '',
                cancelButtonText: `Follow-up`,
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    this.problemService.createVisitProblem(data).subscribe(res => {
                        this.newProblem.push(data);
                    });
                }
                if (!result.isConfirmed) {
                    this.updateProblemPatient(2, checkOld.VisitProblemId);
                }
            })
        } else {
            this.problemService.createVisitProblem(data).subscribe(res => {
                this.newProblem.push(data);
            });
        }
    }

    onDeleteProblem = (item) => {
        this.problemService.deleteVisitProblemId(item.VisitProblemId).subscribe(res => {
            this.oldProblem = this.oldProblem.filter(x => x.VisitProblemId !== item.VisitProblemId);
            this.newProblem = this.newProblem.filter(x => x.VisitProblemId !== item.VisitProblemId);
        });
    }

    onUpdateProblem = (item) => {
        this.problemService.updateProblem(item.ProblemId, item).subscribe(res => {
            item.isUpdate = !item.isUpdate
        });
    }
}
