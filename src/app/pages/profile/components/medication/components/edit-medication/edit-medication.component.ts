import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

import { MedicationService } from '../../services';
import { UpdateMedicationComponent } from '../update-medication/update-medication.component';

@Component({
    selector: 'app-edit-medication',
    templateUrl: './edit-medication.component.html',
    styleUrls: ['./edit-medication.component.scss']
})
export class EditMedicationComponent implements OnInit {

    displayedColumns: string[] = [
        "Name",
        "Dose",
        "Frequency",
        "Route",
        "Detail",
        "Purpose"
    ];

    Columns: object[] = [
        {
            name: "Name",
            key: "DrugName"
        },
        {
            name: "Dose",
            key: "DoseValue",
            key1: "DoseUnit"
        },
        {
            name: "Frequency",
            key: "FrequencyUnit"
        },
        {
            name: "Route",
            key: "DrugrouteId"
        },
        {
            name: "Detail",
            key: "Detail"
        },
        {
            name: "Purpose",
            key: "Purpose"
        }
    ];
    dataSource: any = [];
    listDelete: any = [];
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private medicationService: MedicationService,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<EditMedicationComponent>,
    ) { }

    async ngOnInit() {
        this.dataSource = this.data;
    }

    onDeleteMedication = async (item) => {
        try {
            swal.fire({
                title: 'Are you sure?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#9FB9C8',
                cancelButtonColor: '',
                confirmButtonText: 'Yes'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    this.dataSource = this.dataSource.filter(x => x.PatientMedicalfactorDrugId != item.PatientMedicalfactorDrugId);
                    this.listDelete.push(item.PatientMedicalfactorDrugId);
                }
            })
        } catch (ex) {
            console.log(ex);
        }
    }

    openDialogEdit = (item) => {
        this.dialog.open(UpdateMedicationComponent, {
            panelClass: "addmedication",
            data: item
        }).afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }

    closeDialog() {
        this.dialogRef.close();
    }

    onUpdateMedication = () => {
        try {
            if (this.listDelete.length) {
                this.listDelete.forEach(async (x) => {
                    await this.medicationService.deleteMedication(x);
                });
            }
        } catch (ex) {
            console.log(ex);
        } finally {
            this.closeDialog();
        }
    }

}
