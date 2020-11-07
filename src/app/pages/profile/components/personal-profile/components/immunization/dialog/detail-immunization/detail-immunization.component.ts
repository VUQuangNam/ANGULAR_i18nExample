import { Component, OnInit, Inject } from '@angular/core';
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";

import { AlertService } from 'src/app/shared/services/alert.service';
import Swal from 'sweetalert2';
import { PatientImmunizationscheduleModel } from '../../../../model';
import { PatientImmunizationscheduleService } from '../../../../service';

@Component({
    selector: 'app-detail-immunization',
    templateUrl: './detail-immunization.component.html',
    styleUrls: ['./detail-immunization.component.scss']
})
export class DetailImmunizationComponent implements OnInit {

    constructor(
        public alertService: AlertService,
        public dialogRef: MatDialogRef<DetailImmunizationComponent>,
        public patientImmuService: PatientImmunizationscheduleService,

        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    appliedDate: string;
    vaccine: string;

    ngOnInit(): void {
        this.appliedDate = this.data.AppliedDate;
        this.vaccine = this.data.Vaccine;
    }

    updateItem() {
        let model = new PatientImmunizationscheduleModel();
        model.PatientId = this.data.PatientId;
        model.ImmunizationId = this.data.ImmunizationId;
        model.AppliedDate = this.appliedDate;
        model.Vaccine = this.vaccine;
        this.patientImmuService.editImmuPatient(this.data.PatientImmunizationscheduleId, model).subscribe(res => {
            Swal.fire({
                icon: 'success',
                title: 'Update success!',
                showConfirmButton: false,
                timer: 1500
            });
            this.dialogRef.close();
        });
    }
    closeDialog() {
        this.dialogRef.close();
    }


}
