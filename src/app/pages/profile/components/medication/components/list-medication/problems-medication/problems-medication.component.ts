import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-problems-medication',
    templateUrl: './problems-medication.component.html',
    styleUrls: ['./problems-medication.component.scss']
})
export class ProblemsMedicationComponent implements OnInit {
    @Input() dataSource;
    constructor(
        public route: ActivatedRoute,
        public dialog: MatDialog,
    ) { }

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
            key: "DoseValue"
        },
        {
            name: "Frequency",
            key: "FrequencyValue",
            key2: "FrequencyUnit"
        },
        {
            name: "Route",
            key: "Route"
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

    ngOnInit() { }
}
