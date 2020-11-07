import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MedicationService } from '../services';

import { CreateMedicationComponent } from './create-medication/create-medication.component';
import { EditMedicationComponent } from './edit-medication/edit-medication.component';

@Component({
    selector: 'app-medication',
    templateUrl: './medication.component.html',
    styleUrls: ['./medication.component.scss']
})
export class MedicationComponent implements OnInit {
    patientId;
    constructor(
        public dialog: MatDialog,
        private medicationService: MedicationService,
        private route: ActivatedRoute
    ) { }

    listData: any = {
        current: [],
        history: [],
        problems: [],
    }
    listDrugRouter: any = [];
    type = 2;

    async ngOnInit() {
        let respone;
        this.patientId = this.route.snapshot.params.patientId;
        //  respone = await this.medicationService.listDrugRoutes();
        // this.listDrugRouter = respone.Payload;

        respone = await this.medicationService.listMedication(this.patientId, 1);
        this.listData.history = respone.Payload;

        respone = await this.medicationService.listMedication(this.patientId, 2);
        this.listData.current = respone.Payload;

        respone = await this.medicationService.listMedicationByProblem(this.patientId, 3);
        this.listData.problems = respone.Payload;
    }

    onChangeTab = (event) => {
        this.type = event.index;
        switch (event.index) {
            case 1:
                this.type = 1;
                break;
            case 0:
                this.type = 2;
                break;
            default:
                break;
        }
    }

    openDialog() {
        this.dialog.open(CreateMedicationComponent, {
            panelClass: "addmedication",
            data: {
                patientId: this.patientId
            }
        }).afterClosed().subscribe(() => {
            this.ngOnInit();
        });
    }

    openEditDialog() {
        let value = [];
        if (this.type == 1) value = this.listData.history;
        if (this.type == 2) value = this.listData.current;
        this.dialog.open(EditMedicationComponent, {
            panelClass: "editmedication",
            data: value
        }).afterClosed().subscribe(() => {
            this.ngOnInit();
        });
    }

}
