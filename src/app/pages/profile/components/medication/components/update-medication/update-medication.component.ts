import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment-timezone';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

import { MedicationModel } from '../../models';
import { DrugsService, MedicationService } from '../../services';

@Component({
    selector: 'app-update-medication',
    templateUrl: './update-medication.component.html',
    styleUrls: ['./update-medication.component.scss']
})
export class UpdateMedicationComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<UpdateMedicationComponent>,
        private medicationService: MedicationService,
        private drugService: DrugsService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    model: any = {};
    listDrugRouter: any = [];
    listProblem: any = [];
    listDrugs: any = [];

    async ngOnInit() {
        let respone = await this.medicationService.listDrugRoutes();
        this.listDrugRouter = respone.Payload;
        respone = await this.medicationService.listProblem();
        this.listProblem = respone.Payload;
        respone = await this.drugService.listDrugs();
        this.listDrugs = respone.Payload;
        this.data.StartDate = this.data.StartDate ? this.formatDate(this.data.StartDate, 'YYYY/MM/DD') : '';
        this.data.EndDate = this.data.EndDate ? this.formatDate(this.data.EndDate, 'YYYY/MM/DD') : '';
        this.model = this.data;
    }

    formatDate = (date: any, format: string) => moment.unix(new Date(date).getTime() / 1000).format(format);

    closeDialog() {
        this.dialogRef.close();
    }

    onUpdateMedication = async () => {
        try {
            const respone = await this.medicationService.updateMedication(this.data.PatientMedicalfactorDrugId, new MedicationModel(this.model));
            if (respone.Ok) {
                swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    timer: environment.timeCloseDialog
                });
                this.closeDialog();
            } else {
                swal.fire(
                    'Warning!',
                    'An error occurred.Please try again later.!',
                    'warning'
                );
            }
        } catch (ex) {
            console.log(ex);
        }
    }
}
