import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { MedicalHistoryService } from '../../../../service';
import { DetailMedicalHistoryComponent } from "../detail-medical-history/detail-medical-history.component";

@Component({
    selector: 'app-edit-medical-history',
    templateUrl: './edit-medical-history.component.html',
    styleUrls: ['./edit-medical-history.component.scss']
})
export class EditMedicalHistoryComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<EditMedicalHistoryComponent>,
        public dialog: MatDialog,
        public medicalService: MedicalHistoryService
    ) { }

    displayedColumns = ["medical", "since", "delete"];
    dataSource: any;
    surgicalDataSource: any;
    surgicalDisplayedColumns = ["surgical", "date", "delete"];
    medicalHistory: any;
    listData: any;
    ngOnInit(): void {
        this.getMedical();
    }

    openDetailDialog(patientMedicalfactorId: number) {
        const dialogRef = this.dialog.open(DetailMedicalHistoryComponent, {
            width: "900px",
            height: " 300px",
            panelClass: "add",
            data: {
                DataCurrent: this.listData.find(x => x.PatientMedicalfactorId === patientMedicalfactorId),
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.getMedical();
        });
    }

    getMedical() {
        this.medicalService
            .getPatientMedical(this.data)
            .subscribe((res) => {
                this.listData = res;
                this.dataSource = res.filter((res) => res.Type == 1);
                this.surgicalDataSource = res.filter((res) => res.Type == 2);
            });
    }

    deleteItem(patientMedicalfactorId) {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9FB9C8',
            cancelButtonColor: '',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                this.medicalService.deletePatientMedical(patientMedicalfactorId).subscribe(res => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Delete success!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.getMedical();
                });
            }
        })
    }

    closeDialog(): void {
        this.dialogRef.close();
        this.getMedical();
    }


}
