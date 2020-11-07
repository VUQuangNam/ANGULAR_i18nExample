import { Component, OnInit } from "@angular/core";
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";

@Component({
    selector: "app-create-list-of-charge",
    templateUrl: "./create-list-of-charge.component.html",
    styleUrls: ["./create-list-of-charge.component.scss"],
})
export class CreateListOfChargeComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<CreateListOfChargeComponent>) { }

    ngOnInit(): void { }

    closeDialog(): void {
        this.dialogRef.close();
    }
}
