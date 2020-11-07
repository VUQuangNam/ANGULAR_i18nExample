import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2'

import { ProblemService, ExamService } from '../service';

@Component({
    selector: 'app-exam',
    templateUrl: './exam.component.html',
    styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

    constructor(
        private problemService: ProblemService,
        private examService: ExamService,
        private route: ActivatedRoute
    ) { }

    listProblem: any = [];
    listExam: object[];
    isLoading = false;
    PatientId: number;

    async ngOnInit() {
        try {
            let VisitId;
            this.isLoading = false;
            this.PatientId = this.route.snapshot.params.patientId;
            const res = await this.examService.detailPatient(this.PatientId);
            VisitId = res.Payload.VisitId;
            let respone = await this.problemService.listProblemByVisit(VisitId);
            if (respone.Ok) {
                this.listProblem = respone.Payload;
            } else {
                swal.fire(
                    'Warning!',
                    'An error occurred.Please try again later.!',
                    'warning'
                );
            }
            respone = await this.examService.listExam(null);
            this.listExam = respone.Payload;
            respone = await this.problemService.listOldProblem(this.PatientId);
            this.listProblem = this.listProblem.concat(respone.Payload.filter(x => x.Type == 2));
            this.listProblem = this.listProblem.map(x => {
                return {
                    CreatedOn: x.CreatedOn,
                    VisitId: x.VisitId,
                    Status: x.Status,
                    Type: x.Type,
                    ProblemId: x.ProblemId,
                    NoteId: x.NoteId,
                    Name: x.Name,
                    VisitProblemId: x.VisitProblemId
                }
            })
        } catch (ex) {
            console.log(ex);
        } finally {
            this.isLoading = true;
        }
    }
}
