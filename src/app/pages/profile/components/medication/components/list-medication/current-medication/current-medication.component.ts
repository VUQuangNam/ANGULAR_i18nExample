import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

import { MedicationService } from "../../../services";
import { CreateMedicationComponent } from "../../create-medication/create-medication.component";
import { EditMedicationComponent } from "../../edit-medication/edit-medication.component";

@Component({
    selector: "app-current-medication",
    templateUrl: "./current-medication.component.html",
    styleUrls: ["./current-medication.component.scss"],
})
export class CurrentMedicationComponent implements OnInit {
    @Input() dataSource;
    constructor(public route: ActivatedRoute, public dialog: MatDialog) { }

    displayedColumns: string[] = [
        "Name",
        "Dose",
        "Frequency",
        "Duration",
        "Route",
        "Detail",
        "Purpose",
    ];
    Columns: object[] = [
        {
            name: "Name",
            key: "DrugName",
        },
        {
            name: "Dose",
            key: "DoseValue",
        },
        {
            name: "Frequency",
            key: "FrequencyValue",
            key1: "FrequencyUnit",
        },
        {
            name: "Duration",
            key: "StartDate",
            key1: "EndDate",
            type: 'date'
        },
        {
            name: "Route",
            key: "DrugrouteId",
        },
        {
            name: "Detail",
            key: "Detail",
        },
        {
            name: "Purpose",
            key: "Purpose",
        },
    ];
    patientId;
    listDrugRouter: any = [];

    ngOnInit() { }
}
