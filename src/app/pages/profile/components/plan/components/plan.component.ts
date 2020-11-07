import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

import { ExamService, OrgansService, ProblemService, DataService, TestCategoryService } from '../services';

@Component({
    selector: 'app-plan',
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
    listProblem: any = [];
    listExam: any = [];
    isLoading = false;
    idPatent = '';
    constructor(
        private problemService: ProblemService,
        private examService: ExamService,
        private route: ActivatedRoute,
        private organService: OrgansService,
        private dataService: DataService,
        private testCategoryService: TestCategoryService
    ) { }

    async ngOnInit() {
        try {
            this.openLoading();
            this.idPatent = this.route.snapshot.params.patientId;
            const res = await this.examService.detailPatient(this.idPatent);
            let respone = await this.problemService.listProblemByVisit(res.Payload.VisitId);
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
            respone = await this.problemService.listOldProblem(this.idPatent);
            this.listProblem = this.listProblem.concat(respone.Payload.filter(x => x.Type == 2));

            respone = await this.organService.listOrgans();
            const listOrgans = respone.Payload;
            this.dataService.changeListOrgans(listOrgans);

            respone = await this.testCategoryService.listTestCategories(0);
            const listTestCategory = respone.Payload;
            this.dataService.changeListTestCategory(listTestCategory);
        } catch (ex) {
            console.log(ex);
        } finally {
            this.closeLoading();
        }
    }

    openLoading() {
        this.isLoading = true;
        var element = document.getElementById("loading-page");
        element.classList.remove("c-loading--hidden");
    }

    closeLoading() {
        this.isLoading = false;
        var element = document.getElementById("loading-page");
        element.classList.add("c-loading--hidden");
    }
}
