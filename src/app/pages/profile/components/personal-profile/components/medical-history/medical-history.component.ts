import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

import { CreateMedicalHistoryComponent } from "./dialog/create-medical-history/create-medical-history.component";
import { AlertService } from 'src/app/shared/services/alert.service';
import { EditMedicalHistoryComponent } from './dialog/edit-medical-history/edit-medical-history.component';
import { MedicalHistoryService } from '../../service';
import { MedicalHistoryModel } from '../../model';

@Component({
    selector: "app-medical-history",
    templateUrl: "./medical-history.component.html",
    styleUrls: ["./medical-history.component.scss"],
})
export class MedicalHistoryComponent implements OnInit {
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    constructor(
        public medicalHistoryService: MedicalHistoryService,
        public alertService: AlertService,
        private activatedRoute: ActivatedRoute,
        public dialog: MatDialog
    ) { }
    displayedColumns = ["medical", "since"];
    dataSource: any;
    surgicalDataSource: any;
    surgicalDisplayedColumns = ["surgical", "date"];
    patientId: any;
    medicalHistory: any;
    surgicalHistory: any;
    medical: any;
    surgical: any;
    editField: string;
    SNOMEDCode: string;
    StartDate: string;
    EndDate: string;
    Type: number;
    Status: number;
    private editedRowIndex: number;
    private editedProduct: any;
    isShowEdit: boolean = false;
    isReadonly = true;
    change = true;
    changeMedical = true;
    changeSurgical = true;
    editSurgical: boolean = false;
    // editDataTable() {
    //   this.isReadonly = true;
    // }
    openEditDialog() {
        const dialogRef = this.dialog.open(EditMedicalHistoryComponent, {
            width: "900px",
            height: " 300px",
            panelClass: "edit",
            data: this.patientId
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.getMedical();
        });
    }

    openDialog() {
        const dialogRef = this.dialog.open(CreateMedicalHistoryComponent, {
            width: "900px",
            height: " 300px",
            panelClass: "add",
            data: this.patientId
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.getMedical();
        });
    }

    eventEditTableMedical() {
        this.isShowEdit = false;
    }
    eventEditTableSurgical() {
        this.editSurgical = false;
    }

    editAll() {
        this.change = !this.change;
        this.changeMedical = false;
        this.changeSurgical = false;
        // document.getElementById("edit-medical").addEventListener("click", function () { alert("Hello World!"); });
        // // let focus = document.createAttribute("autofocus");
        // // btn.setAttributeNode(focus);
        // // console.log('success');
    }
    cancel() {
        document.getElementById("btn-cancel").click();
        this.change = !this.change;
        this.changeMedical = true;
        this.changeSurgical = true;
    }

    saveAll() {
        document.getElementById("btn-cancel").click();
        this.change = !this.change;
        this.changeMedical = true;
        this.changeSurgical = true;
    }

    createMedical() {
        document.getElementById("add-medical").click();
        this.change = false;
        this.changeMedical = false;
    }
    createSurgical() {
        document.getElementById("add-surgical").click();
        this.change = false;
        this.changeSurgical = false;
    }
    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(
            (param) => (this.patientId = +param.get("patientId"))
        );
        this.getMedical();
    }

    getMedical() {
        this.medicalHistoryService
            .getPatientMedical(this.patientId)
            .subscribe((data) => {
                this.medicalHistory = data;
                this.medical = this.medicalHistory.filter((res) => res.Type == 1);
                this.dataSource = this.medical;
                this.surgical = this.medicalHistory.filter((res) => res.Type == 2);
                this.surgicalDataSource = this.surgical;
                // console.log(data)
            });
    }
}
