import { Component, OnInit, Inject } from "@angular/core";
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatDialog,
} from "@angular/material/dialog";
import Swal from "sweetalert2";
import { PrescriptionService } from '../../../../services';

import { DetailsPrescriptionComponent } from "../details-prescription/details-prescription.component";
@Component({
    selector: "app-edit-prescription",
    templateUrl: "./edit-prescription.component.html",
    styleUrls: ["./edit-prescription.component.scss"],
})
export class EditPrescriptionComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<EditPrescriptionComponent>,
        public dialog: MatDialog,
        public prescriptionService: PrescriptionService,
    ) { }

    displayedColumns: string[] = [
        "Name",
        "Dose",
        "Frequency",
        "Start",
        "End",
        "Route",
        "Detail",
        "delete",
    ];
    dataSource: any = [];
    preslist: any;
    ListOfPrecription: any;
    prescriptionId: number;
    paginator: number;
    ngOnInit() {
        this.dataSource = this.data;
    }

    openDetailDialog(data) {
        const dialogRef = this.dialog.open(DetailsPrescriptionComponent, {
            width: "900px",
            height: "300px",
            panelClass: "addAllegry",
            data: data,
        });
        dialogRef.afterClosed().subscribe((result) => { });
    }

    deleteItem(item) {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#9FB9C8",
            cancelButtonColor: "",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                this.prescriptionService
                    .deletePres(item.PrescriptionDrugId)
                    .subscribe((res) => {
                        Swal.fire({
                            icon: "success",
                            title: "Delete success!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        this.dialogRef.close();
                    });
            }
        });
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
