import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

import { AlertService } from 'src/app/shared/services/alert.service';
import { CreateImmunizationComponent } from "./dialog/create-immunization/create-immunization.component";
import { EditImmunizationComponent } from "./dialog/edit-immunization/edit-immunization.component";
import { PatientImmunizationscheduleService } from '../../service';

@Component({
    selector: "app-immunization",
    templateUrl: "./immunization.component.html",
    styleUrls: ["./immunization.component.scss"],
})
export class ImmunizationComponent implements OnInit {
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    constructor(
        public dialog: MatDialog,
        public alertService: AlertService,
        public activatedRoute: ActivatedRoute,
        public immunizationService: PatientImmunizationscheduleService
    ) { }
    displayedColumns = ["vaccines", "date"];
    dataSource: any;
    patientId: number;
    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(
            (param) => (this.patientId = +param.get("patientId"))
        );
        // this.dataSource = new MatTableDataSource(this.PatientImmunizationschedules);
        this.getImmuById();
    }

    openDialog() {
        const dialogRef = this.dialog.open(CreateImmunizationComponent, {
            width: "900px",
            height: " 300px",
            panelClass: "add",
            data: {
                PatientId: this.patientId
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.getImmuById();
        });
    }

    openEditDialog() {
        const dialogRef = this.dialog.open(EditImmunizationComponent, {
            width: "900px",
            height: " 300px",
            panelClass: "edit",
            data: {
                PatientId: this.patientId
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.getImmuById();
        });
    }

    getImmuById() {
        this.immunizationService
            .getImmuByPatientId(this.patientId)
            .subscribe((res) => {
                this.dataSource = res;
                // console.log('immunization', this.dataSource);
            });
    }

}
