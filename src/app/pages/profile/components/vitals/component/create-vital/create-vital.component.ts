import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { VisitModel, VisitVitalModel } from '../../model';
import { PatientService, VisitVitalService, VisitService } from '../../service';

@Component({
    selector: 'app-create-vital',
    templateUrl: './create-vital.component.html',
    styleUrls: ['./create-vital.component.scss']
})
export class CreateVitalComponent implements OnInit {
    model: any = {};
    isLoading = false;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<CreateVitalComponent>,
        private visitVitalService: VisitVitalService,
        private patientService: PatientService,
        private visitService: VisitService
    ) { }

    async ngOnInit() {
        this.model.VisitId = this.data;
        this.model.Date = new Date();
        const hour = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
        const minute = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
        this.model.Time = hour + ':' + minute;
    }

    onCloseModal = () => {
        this.dialogRef.close();
    }

    onCreateVital = async () => {
        try {
            this.isLoading = true;
            this.model.Type = 1;
            this.model.Status = 1
            this.model.ResultDate = new Date(this.model.Date).getFullYear()
                + '-' + (+ new Date(this.model.Date).getMonth() + 1)
                + '-' + new Date(this.model.Date).getDate()
                + 'T' + this.model.Time + ':00';
            this.onLoadListVital();
            this.model.VisitId = await this.onCheckVisitId();
            const res = await this.visitVitalService.createVisitVital(new VisitVitalModel(this.model));
            if (res.Ok) {
                this.isLoading = false;
                this.onCloseModal();
            }
        } catch (ex) {
            console.log(ex);
        }
    }

    onCheckVisitId = async () => {
        let res = await this.patientService.detailPatient(this.data);
        if (res.Payload.VisitId !== 0) return res.Payload.VisitId;
        const data = {
            PatientId: this.data,
            StartDate: new Date().getFullYear()
                + '-' + (+ new Date().getMonth() + 1)
                + '-' + new Date().getDate()
                + 'T' + new Date().getHours()
                + ':' + new Date().getMinutes(),
            Status: 1,
            Type: 1
        };
        res = await this.visitService.createVisit(new VisitModel(data));
        return res.Payload;
    }

    onLoadListVital = () => {
        this.model.ListVital = [
            {
                "VitalId": 1,
                "NumericValue": this.model.BPsystolic || 0,
                "SNOMEDCode": "271649006"
            },
            {
                "VitalId": 2,
                "NumericValue": this.model.BPdiastolic || 0,
                "SNOMEDCode": "271650006"
            },
            {
                "VitalId": 3,
                "NumericValue": this.model.Pulse || 0,
                "SNOMEDCode": "8499008"
            },
            {
                "VitalId": 4,
                "NumericValue": this.model.RepiratoryRate || 0,
                "SNOMEDCode": "86290005"
            }, {
                "VitalId": 5,
                "NumericValue": this.model.sPO2 || 0,
                "SNOMEDCode": "373638005"
            },
            {
                "VitalId": 6,
                "NumericValue": this.model.Height || 0,
                "SNOMEDCode": "251832002"
            },
            {
                "VitalId": 7,
                "NumericValue": this.model.Temperature || 0,
                "SNOMEDCode": "386725007"
            },
            {
                "VitalId": 8,
                "NumericValue": this.model.Weight || 0,
                "SNOMEDCode": "27113001"
            }
        ]
    }
}
