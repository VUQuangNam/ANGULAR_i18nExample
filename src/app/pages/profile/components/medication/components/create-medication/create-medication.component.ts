import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

import { MedicationModel } from '../../models';
import { DrugsService, MedicationService } from '../../services';

@Component({
    selector: "app-create-medication",
    templateUrl: "./create-medication.component.html",
    styleUrls: ["./create-medication.component.scss"],
})
export class CreateMedicationComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<CreateMedicationComponent>,
        private medicationService: MedicationService,
        private drugService: DrugsService
    ) { }
    model: any = {};
    listDrugRouter: any = [];

    async ngOnInit() {
        let respone = await this.medicationService.listDrugRoutes();
        this.listDrugRouter = respone.Payload;
        this.model.NumberUnit = 1;
    }

    closeDialog() {
        this.dialogRef.close();
    }

    onCreateMedication = async () => {
        try {
            this.model.PatientId = +this.data.patientId;
            this.model.Status = 1;
            const respone = await this.medicationService.createMedication(new MedicationModel(this.model));
            if (respone.Ok) {
                this.closeDialog();
                swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    timer: environment.timeCloseDialog
                });
            } else {
                swal.fire({
                    icon: 'warning',
                    title: 'An error occurred.Please try again later.!',
                    timer: environment.timeCloseDialog
                });
            }
        } catch (ex) {
            console.log(ex);
        }
    }
}
