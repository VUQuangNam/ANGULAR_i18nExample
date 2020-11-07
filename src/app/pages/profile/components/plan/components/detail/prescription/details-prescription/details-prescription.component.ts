import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import Swal from "sweetalert2";

import { PrescriptionService } from "../../../../services";
@Component({
    selector: "app-details-prescription",
    templateUrl: "./details-prescription.component.html",
    styleUrls: ["./details-prescription.component.scss"],
})
export class DetailsPrescriptionComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<DetailsPrescriptionComponent>,
        public prescriptionService: PrescriptionService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
    RouteList: any;
    DurgList: any;
    model: any = {};
    ngOnInit(): void {
        this.getAllRoute();
        this.getDrug();
        this.model = this.data;
        this.model.StartDate = this.model.StartDate.split("T")[0];
    }

    updatePres() {
        this.prescriptionService
            .updatePres(this.data.PrescriptionDrugId, this.model)
            .subscribe((res) => {
                Swal.fire({
                    icon: "success",
                    title: "Update success!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                this.dialogRef.close();
            });
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
    closeDialog() {
        this.dialogRef.close();
    }
}
