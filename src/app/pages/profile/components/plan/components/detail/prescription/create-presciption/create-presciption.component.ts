import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import Swal from "sweetalert2";

import { PrescriptionModel } from "../../../../model";
import { PrescriptionService } from "../../../../services";

@Component({
  selector: "app-create-presciption",
  templateUrl: "./create-presciption.component.html",
  styleUrls: ["./create-presciption.component.scss"],
})
export class CreatePresciptionComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreatePresciptionComponent>,
    public prescriptionService: PrescriptionService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  public model = new PrescriptionModel();
  RouteList: any;
  DurgList: any;
  drugrouteId: number;
  filterDrug: any = [];
  searchField: string = "";
  drugId: number;
  startDate: string;
  endDate: string;
  frequencyUnit: string;
  doseUnit: string;
  instruction: string;
  prescriptionId: number;
  ngOnInit(): void {
    this.getAllRoute();
    this.getDrug();
    this.model.PrescriptionId = this.data.PrescriptionId;
  }

  onChangeValue(item) {
    this.drugrouteId = item.DrugrouteId;
  }
  onChangeValueDrug(item) {
    this.searchField = item.Name;
    this.drugId = item.DrugId;
    this.filterDrug = [];
  }
  getAllRoute() {
    this.prescriptionService.getAllRoute().subscribe((res) => {
      this.RouteList = res;
      this.RouteList = this.RouteList.map((x) => {
        return {
          DrugrouteId: x.DrugrouteId,
          Name: x.Name || "",
        };
      });
    });
  }
  getDrug() {
    this.prescriptionService.getDrug().subscribe((res) => {
      this.DurgList = res;
      this.DurgList = this.DurgList.map((x) => {
        return {
          DrugId: x.DrugId,
          Name: x.Name || "",
        };
      });
    });
  }

  createPrescription() {
    let model = new PrescriptionModel();
    model.PrescriptionId = this.data.PrescriptionId;
    model.StartDate = this.startDate;
    model.EndDate = this.endDate;
    model.FrequencyUnit = this.frequencyUnit;
    model.DrugrouteId = this.drugrouteId;
    model.Instruction = this.instruction;
    model.DoseUnit = this.doseUnit;
    if (this.drugId) {
      model.DrugId = this.drugId;
    } else {
      model.NameDrug = this.searchField;
    }
    this.prescriptionService
      .createDetailsPrescription(model)
      .subscribe((res) => {
        Swal.fire({
          icon: "success",
          title: "Notification!",
          showConfirmButton: false,
          timer: 1500,
        });
        this.closeDialog();
      });
  }
  filterListDrug(key) {
    if (!key) this.filterDrug = [];
    this.filterDrug = this.DurgList.filter(
      (x) => x.Name.toLowerCase().indexOf(key.toLowerCase()) > -1
    );
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
