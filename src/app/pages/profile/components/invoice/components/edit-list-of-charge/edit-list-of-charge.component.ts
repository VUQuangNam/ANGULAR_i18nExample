import { Component, OnInit } from "@angular/core";
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";
@Component({
    selector: "app-edit-list-of-charge",
    templateUrl: "./edit-list-of-charge.component.html",
    styleUrls: ["./edit-list-of-charge.component.scss"],
})
export class EditListOfChargeComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<EditListOfChargeComponent>) { }

    isShow: boolean = false;
    displayedColumns = [
        "select",
        "Category",
        "Description",
        "SKU",
        "Quantity",
        "Discount",
    ];
    showButton: boolean = false;
    InvoiceId: number;
    Listofcharge: any;
    Description: string;
    SKU: string;
    Quantity: number;
    Discount: number;
    Category: string;
    ngOnInit(): void { }

    editButton() {
        this.showButton != this.showButton;
    }

    closeDialog(): void {
        this.dialogRef.close();
    }
}
