import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2";

import { DetailsAllergyComponent } from "../details-allergy/details-allergy.component";
import { AllergyService } from "../../service";
import { environment } from 'src/environments/environment';
@Component({
    selector: "app-edit-allegry",
    templateUrl: "./edit-allegry.component.html",
    styleUrls: ["./edit-allegry.component.scss"],
})
export class EditAllegryComponent implements OnInit {
    displayedColumns: string[] = [
        "Allegry for",
        "Since",
        "Symtoms",
        "Frequency",
        "delete",
    ];

    constructor(
        public dialogRef: MatDialogRef<EditAllegryComponent>,
        public allergyService: AllergyService,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    dataSource: any;
    isShow: boolean = false;
    patientId: number;
    allergyPatientList: any;
    allergyList: any;
    dose: string;
    allergyId: 1;
    endDate: string;
    route: string;
    type: number;
    detail: string;
    purpose: string;
    status: number;
    duration: string;
    currentAllergy: any;
    names: any;
    showButton: boolean = false;
    allergyName: string;
    symptomName: string;
    frequency: string;
    startDate: number;
    paginator: any;
    ngOnInit(): void {
        this.getAllegryPatient();
    }

    closeDialog(): void {
        this.dialogRef.close();
        this.getAllegryPatient();
    }

    editButton() {
        this.showButton != this.showButton;
    }

    openDetailDialog(PatientAllergySymptomId: number) {
        const dialogRef = this.dialog.open(DetailsAllergyComponent, {
            width: "900px",
            height: " 300px",
            panelClass: "addAllegry",
            data: this.allergyPatientList.find((x) => x.PatientAllergySymptomId === PatientAllergySymptomId),
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.getAllegryPatient();
        });
    }

    getAllegryPatient() {
        this.allergyService.getAllegryPatient(this.data).subscribe((res) => {
            this.allergyPatientList = res;
            this.dataSource = new MatTableDataSource(this.allergyPatientList);
            this.dataSource.paginator = this.paginator;
        });
    }

    deleteItem(item) {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#9FB9C8",
            cancelButtonColor: "",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                this.allergyService
                    .deleteAllegryPatient(item.PatientAllergySymptomId)
                    .subscribe((res) => {
                        Swal.fire({
                            icon: "success",
                            title: "Delete success!",
                            showConfirmButton: false,
                            timer: environment.timeCloseDialog,
                        });
                        this.getAllegryPatient();
                    });
            }
        });
    }
}
