import { Component, OnInit, Inject } from '@angular/core';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import Swal from 'sweetalert2';

import { AlertService } from 'src/app/shared/services/alert.service';
import { DetailImmunizationComponent } from "../detail-immunization/detail-immunization.component";
import { PatientImmunizationscheduleService } from '../../../../service';

@Component({
    selector: 'app-edit-immunization',
    templateUrl: './edit-immunization.component.html',
    styleUrls: ['./edit-immunization.component.scss']
})
export class EditImmunizationComponent implements OnInit {

    constructor(

        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<EditImmunizationComponent>,
        public dialog: MatDialog,
        public alertService: AlertService,
        public immunizationService: PatientImmunizationscheduleService
    ) { }
    displayedColumns = ["vaccines", "date", "delete"];
    dataSource: any;
    patientId: number;
    ngOnInit(): void {
        this.getImmuById();
    }

    closeDialog() {
        this.dialogRef.close();
    }
    getImmuById() {
        this.immunizationService
            .getImmuByPatientId(this.data.PatientId)
            .subscribe((res) => {
                this.dataSource = res;
            });
    }

    deleteItem(PatientImmunizationscheduleId) {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9FB9C8',
            cancelButtonColor: '',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                this.immunizationService.delImmuPatient(PatientImmunizationscheduleId).subscribe(res => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Delete success!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.getImmuById();
                });
            }
        })
    }

    openDetailDialog(ImmunizationId: number) {
        const dialogRef = this.dialog.open(DetailImmunizationComponent, {
            width: "900px",
            height: " 300px",
            panelClass: "add",
            data: this.dataSource.find(x => x.ImmunizationId === ImmunizationId)
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.getImmuById();
        });
    }


}
