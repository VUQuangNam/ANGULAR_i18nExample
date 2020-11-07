import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MedicationService } from '../../../services';


@Component({
    selector: 'app-medication-history',
    templateUrl: './medication-history.component.html',
    styleUrls: ['./medication-history.component.scss']
})
export class MedicationHistoryComponent implements OnInit {
    @Input() dataSource;
    constructor(
        public route: ActivatedRoute,
        public dialog: MatDialog
    ) { }

    displayedColumns: string[] = [
        "Name",
        "Dose",
        "Frequency",
        "EndDate",
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
            name: "EndDate",
            key: "EndDate",
            type: 'date'
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
