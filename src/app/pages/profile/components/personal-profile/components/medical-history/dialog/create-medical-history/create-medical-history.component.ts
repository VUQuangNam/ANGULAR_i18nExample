import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Key } from "protractor";
import { AlertService } from "src/app/shared/services/alert.service";
import Swal from "sweetalert2";

import { MedicalHistoryModel } from "../../../../model";
import { MedicalHistoryService } from "../../../../service";

@Component({
  selector: "app-create-medical-history",
  templateUrl: "./create-medical-history.component.html",
  styleUrls: ["./create-medical-history.component.scss"],
})
export class CreateMedicalHistoryComponent implements OnInit {
  [x: string]: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateMedicalHistoryComponent>,
    public medicalService: MedicalHistoryService,
    public alertService: AlertService
  ) {}

  type: number = 1;
  name: string;
  since: string;
  medicalList: any;
  surgicalList: any;
  result: any = [Object];
  Medicalname: string;
  isLoading = true;
  ngOnInit(): void {
    this.getMedical(this.key);
    this.getSurgical(this.key);
  }
  getMedical(key) {
    this.medicalService.SearchMdeical(key).subscribe((res) => {
      this.medicalList = res;
    });
  }
  getSurgical(key) {
    this.medicalService.SearchSurgical(key).subscribe((res) => {
      this.surgicalList = res;
    });
  }

  searchName(key, type) {
    switch (type) {
      case 1:
        try {
          this.isLoading = false;
          clearTimeout(this.keypress);
          this.keypress = setTimeout(() => {
            this.medicalService.SearchMdeical(key).subscribe((res) => {
              this.medicalList = res;
              this.isLoading = true;
            });
          }, 500);
        } catch (ex) {
          console.log(ex);
        }
        break;
      case 2:
        try {
          this.isLoading = false;
          clearTimeout(this.keypress);
          this.keypress = setTimeout(() => {
            this.medicalService.SearchSurgical(key).subscribe((res) => {
              this.surgicalList = res;
              this.isLoading = true;
            });
          }, 500);
        } catch (ex) {
          console.log(ex);
        }
        break;
      default:
        break;
    }
  }
  setTermMedical(name, symptomId, SNOMEDCode) {
    this.showItem = true;
    this.name = name;
    this.SNOMEDCode = SNOMEDCode;
    this.medicalList = [];
    this.filterSymptom = [];
  }
  setTermSurgical(name, symptomId, SNOMEDCode) {
    this.showItem = true;
    this.name = name;
    this.SNOMEDCode = SNOMEDCode;
    this.surgicalList = [];
    this.filterSymptom = [];
  }
  createData() {
    let model = new MedicalHistoryModel();
    model.PatientId = this.data;
    model.SNOMEDCode = this.name;
    model.Type = this.type;
    model.StartDate = this.since;
    this.medicalService.create(model).subscribe((res) => {
      Swal.fire({
        icon: "success",
        title: "Create success!",
        showConfirmButton: false,
        timer: 1500,
      });
      this.dialogRef.close();
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  selectType(type: number) {
    this.type = type;
  }
}
