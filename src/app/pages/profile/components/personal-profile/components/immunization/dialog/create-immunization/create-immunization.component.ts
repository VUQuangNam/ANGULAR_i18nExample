import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AlertService } from "src/app/shared/services/alert.service";
import Swal from "sweetalert2";

import { PatientImmunizationscheduleModel } from "../../../../model";
import { PatientImmunizationscheduleService } from "../../../../service";

@Component({
  selector: "app-create-immunization",
  templateUrl: "./create-immunization.component.html",
  styleUrls: ["./create-immunization.component.scss"],
})
export class CreateImmunizationComponent implements OnInit {
  [x: string]: any;
  constructor(
    public alertService: AlertService,
    public dialogRef: MatDialogRef<CreateImmunizationComponent>,
    public patientImmuService: PatientImmunizationscheduleService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  patientImmuId: number;
  appliedDate: string;
  description: string;
  vaccine: string;
  type: number;
  ImmunizationList: any;
  isLoading = true;
  ngOnInit(): void {
    this.getImunization(this.key);
  }

  searchImmunization(key) {
    try {
      this.isLoading = false;
      clearTimeout(this.keypress);
      this.keypress = setTimeout(() => {
        this.patientImmuService.SearchImmunization(key).subscribe((res) => {
          this.ImmunizationList = res;
          this.isLoading = true;
        });
      }, 500);
    } catch (ex) {
      console.log(ex);
    }
  }

  setTermValue(item) {
    this.showItem = true;
    this.SNOMEDFullName = item.FullName;
    this.vaccine = item.FullName;
    this.SNOMEDCode = item.SNOMEDCode;
    this.SNOMEDName = item.CommonName;
    this.ImmunizationList = [];
  }
  getImunization(key) {
    this.patientImmuService.SearchImmunization(key).subscribe((res) => {
      this.ImmunizationList = res;
    });
  }
  createImmu() {
    let model = new PatientImmunizationscheduleModel();
    model.PatientId = this.data.PatientId;
    model.AppliedDate = this.appliedDate;
    model.Vaccine = this.vaccine;
    this.patientImmuService.create(model).subscribe((res) => {
      Swal.fire({
        icon: "success",
        title: "Create success!",
        showConfirmButton: false,
        timer: 1500,
      });
      this.closeDialog();
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
