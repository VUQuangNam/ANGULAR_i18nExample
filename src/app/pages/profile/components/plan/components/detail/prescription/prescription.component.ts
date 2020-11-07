import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

import { EditPrescriptionComponent } from "./edit-prescription/edit-prescription.component";
import { CreatePresciptionComponent } from "./create-presciption/create-presciption.component";

import { PrescriptionService } from "../../../services";
@Component({
    selector: "app-prescription",
    templateUrl: "./prescription.component.html",
    styleUrls: ["./prescription.component.scss"],
})
export class PrescriptionComponent implements OnInit {
    @Input() data;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    constructor(
        private prescriptionService: PrescriptionService,
        private activatedRoute: ActivatedRoute,
        public dialog: MatDialog
    ) { }
    displayedColumns: string[] = [
        "Name",
        "Dose",
        "Frequency",
        "Start",
        "End",
        "Route",
        "Detail",
    ];
    dataSource: any;
    RouteList: any;
    presciptionId: number;
    PresciptionId: number;
    PresciptionList: any;
    ListOfPrecription: any;
    VisitId: number;
    ProblemId: number;
    patientId: number;
    prescriptionId: number;

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(
            (param) => (this.patientId = +param.get("patientId"))
        );
        this.getPrescriptionByPatientAndProblem();

    }

    openDialog() {
        this.dialog
            .open(CreatePresciptionComponent, {
                panelClass: "addAllegry",
                data: {
                    Patient: this.patientId,
                    PrescriptionId: this.prescriptionId,
                },
            })
            .afterClosed()
            .subscribe((result) => {
                this.ngOnInit();
            });
    }

    openDialogEdit() {
        this.dialog
            .open(EditPrescriptionComponent, {
                panelClass: "addAllegry",
                data: this.ListOfPrecription,
            })
            .afterClosed()
            .subscribe((result) => {
                this.ngOnInit();
            });
    }

    getPrescriptionByPatientAndProblem() {
        this.prescriptionService
            .getPrescriptionByPatientIdAndProblemId(
                this.data.ProblemId,
                this.data.VisitId
            )
            .subscribe((res) => {
                if (!res.length) {
                    const data = {
                        VisitId: this.data.VisitId,
                        ProblemId: this.data.ProblemId,
                    };
                    this.prescriptionService.createPrescription(data).subscribe((res) => {
                        this.prescriptionId = res;
                    });
                } else {
                    this.prescriptionId = res[0].PrescriptionId;
                }
                this.ListOfPrecription = res;
                this.dataSource = new MatTableDataSource(this.ListOfPrecription);
                this.dataSource.paginator = this.paginator;
            });
    }
}
