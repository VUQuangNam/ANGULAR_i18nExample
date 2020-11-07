import { Component, OnInit, Inject } from "@angular/core";
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatDialog
} from "@angular/material/dialog"
import Swal from 'sweetalert2';

import { FamilyHistoryService } from '../../../services';
import { DetailFamilyComponent } from '../detail-family/detail-family.component';



@Component({
    selector: "app-edit-family-history",
    templateUrl: "./edit-family-history.component.html",
    styleUrls: ["./edit-family-history.component.scss"],
})
export class EditFamilyHistoryComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<EditFamilyHistoryComponent>,
        public dialog: MatDialog,
        public familyService: FamilyHistoryService
    ) { }

    displayedColumns = ["relationship", "name", "delete"];
    dataSource: any;


    ngOnInit(): void {
        this.getListFamilyHistory();
    }

    getListFamilyHistory() {
        this.familyService.getFamilyHistory(this.data).subscribe(res => {
            this.dataSource = res;
        });
    }

    deleteItem(patientFamilyfactorId: number) {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9FB9C8',
            cancelButtonColor: '',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                this.familyService.deleteFamilyHistory(patientFamilyfactorId).subscribe(ress => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Delete success!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.getListFamilyHistory();
                });
            }
        })
    }
    openEditDialog(PatientFamilyfactorId) {
        const dialogRef = this.dialog.open(DetailFamilyComponent, {
            panelClass: "add",
            data: this.dataSource.find(x => x.PatientFamilyfactorId === PatientFamilyfactorId)
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.getListFamilyHistory()
        });
    }
    closeDialog(): void {
        this.dialogRef.close();
    }
}
