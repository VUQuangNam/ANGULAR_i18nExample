import { Component, OnInit, Input } from "@angular/core";
import Swal from "sweetalert2";
import { ActivatedRoute } from "@angular/router";

import { HealthEducationService } from "../../../services/health-education.service";
import { HealthEducationModel } from "../../../model/health-education.model";
@Component({
  selector: "app-health-education",
  templateUrl: "./health-education.component.html",
  styleUrls: ["./health-education.component.scss"],
})
export class HealthEducationComponent implements OnInit {
  @Input() data;

  constructor(
    private healtheducationService: HealthEducationService,
    private route: ActivatedRoute
  ) {}

  ProblemId: any;
  listEducation: any = [];
  listOrgans: any = [];
  listCombination: any = [];
  visitEducationList: any = [];
  organId: number;
  EducationcategoryId: number;
  educationcategoryId: number;
  educationcombinationId: number;
  EducationitemId: number;
  problemList: any;
  patientId: number;
  visitId: number;
  description: string;
  educationItemName: string;
  listVisitEducationId: any = [];
  visitEducationId: number;
  resultHeath: any = [];

  async ngOnInit() {
    this.route.paramMap.subscribe(
      (pram) => (this.patientId = +pram.get("patientId"))
    );
    await this.getDetailPatient();
    this.getAllOrgans();
    this.getAllEducation();
    this.getVisitEducation();
    this.getListHealth();
  }

  getDetailPatient() {
    this.healtheducationService
      .getDetailPatient(this.patientId)
      .subscribe((res) => {
        this.visitId = res.VisitId;
      });
  }

  getAllOrgans() {
    this.healtheducationService.getListOrgans().subscribe((res) => {
      this.listOrgans = res;
    });
  }

  getAllEducation() {
    this.healtheducationService.getListEducation().subscribe((res) => {
      this.listEducation = res;
    });
  }

  getCombination(organId, educationcategoryId) {
    this.healtheducationService
      .getCombinations(organId, educationcategoryId, null)
      .subscribe((res) => {
        this.listCombination = res;
        const data = this.resultHeath.find((x) => x.OrganId === organId);
        const data2 = data.ListEducationcategoryId.find(
          (x) => x.EducationcategoryId === educationcategoryId
        );
        console.log(this.listCombination);
        this.listCombination = this.listCombination.map((x) => {
          return {
            Description: x.Description,
            EducationitemId: x.EducationitemId,
            EducationcombinationId: x.EducationcombinationId,
            checked: data2
              ? data2.ListEducationitemId.map((a) => {
                  return a.EducationitemId;
                }).includes(x.EducationitemId)
              : false,
          };
        });
      });
  }

  onActiveOrgans = (item) => {
    this.organId = item.OrganId;
    if (this.educationcategoryId) {
      this.getCombination(this.organId, this.educationcategoryId);
    }
    this.listOrgans.forEach((x) => {
      if (x.OrganId == item.OrganId) {
        x.isActive = true;
      } else {
        x.isActive = false;
      }
    });
  };

  onActiveEducation = (item) => {
    this.educationcategoryId = item.EducationcategoryId;
    if (this.organId) {
      this.getCombination(this.organId, this.educationcategoryId);
    }
    this.listEducation.forEach((x) => {
      if (x.EducationcategoryId == item.EducationcategoryId) {
        x.isActive = true;
      } else {
        x.isActive = false;
      }
    });
  };

  createHealth(item) {
    let model = new HealthEducationModel();
    model.ProblemId = this.data.ProblemId;
    model.VisitId = this.visitId;
    model.EducationcombinationId = item.EducationcombinationId;
    model.Description = item.Description;
    this.healtheducationService.createHealth(model).subscribe((res) => {
      Swal.fire({
        icon: "success",
        title: "Create success!",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }

  getListHealth() {
    this.healtheducationService
      .getVisitEducation(this.data.VisitId, this.data.ProblemId)
      .subscribe((res) => {
        console.log(res);
        this.resultHeath = res ? res.ListOrganId : [];
        // if (this.organId != 1) {
        //     this.visitEducationList = res.find(
        //         (i) => i.EducationcategoryId === this.educationcategoryId
        //     );
        //     if (this.visitEducationList === undefined) {
        //         this.listVisitEducationId = [];
        //     } else {
        //         this.listVisitEducationId = this.visitEducationList.listVisitEducationId;
        //         if (this.listVisitEducationId !== undefined)
        //             this.listVisitEducationId.forEach((x) => {
        //                 this.listVisitEducationId.forEach((i) => {
        //                     if (x.OrganId === i.OrganId) {
        //                         i.checkActive = true;
        //                         i.EducationcategoryId = x.EducationcategoryId;
        //                     }
        //                 });
        //             });
        //     }
        // } else {
        //     this.visitEducationList = res.find(
        //         (i) => i.VisitEducationId === this.visitEducationId
        //     );
        //     if (this.visitEducationList === undefined) {
        //         this.listVisitEducationId = [];
        //     } else {
        //         this.listVisitEducationId = this.visitEducationList.listVisitEducationId;
        //         if (this.listCombination !== undefined)
        //             this.listVisitEducationId.forEach((x) => {
        //                 this.listCombination.forEach((i) => {
        //                     if (x.OrganId === i.OrganId) {
        //                         i.checkActive = true;
        //                         i.EducationcategoryId = x.EducationcategoryId;
        //                     }
        //                 });
        //             });
        //     }
        // }
      });
  }

  getVisitEducation() {
    this.healtheducationService
      .getVisitEducation(this.data.VisitId, this.data.ProblemId)
      .subscribe((res) => {
        this.visitEducationList = res;
      });
  }
}
