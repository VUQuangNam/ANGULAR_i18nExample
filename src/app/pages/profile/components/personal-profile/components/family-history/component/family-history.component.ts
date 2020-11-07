import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute } from "@angular/router";

import { AlertService } from 'src/app/shared/services/alert.service';
import { FamilyHistoryService } from '../services';
import { CreateFamilyHistoryComponent } from "./dialog/create-family-history/create-family-history/create-family-history.component";
import { EditFamilyHistoryComponent } from "./dialog/edit-family-history/edit-family-history.component";

@Component({
    selector: "app-family-history",
    templateUrl: "./family-history.component.html",
    styleUrls: ["./family-history.component.scss"],
})
export class FamilyHistoryComponent implements OnInit {
    [x: string]: any;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    constructor(
        private activatedRoute: ActivatedRoute,
        public familyHistoryService: FamilyHistoryService,
        public alertService: AlertService,
        public dialog: MatDialog
    ) { }
    displayedColumns = ["relationship", "name"];
    dataSource: any;
    family: any;
    editField: string;
    patientId: any;
    SNOMEDCode: string;
    StartDate: string;
    EndDate: string;
    Type: number;
    Status: number;
    private editedRowIndex: number;
    private editedProduct: any;
    change = true;
    isShow: boolean = false;
    isShowEditButton: boolean = false;

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(
            (param) => (this.patientId = +param.get("patientId"))
        );
        this.getFamilyHistory();
    }

    showEditButton() {
        this.isShowEditButton = !this.isShowEditButton;
    }

    openDialog() {
        const dialogRef = this.dialog.open(CreateFamilyHistoryComponent, {
            panelClass: "edit",
            data: this.patientId
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.getFamilyHistory();
        });
    }
    openEditDialog() {
        const dialogRef = this.dialog.open(EditFamilyHistoryComponent, {
            width: "1000px",
            height: " 700px",
            panelClass: "edit",
            data: this.patientId
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.getFamilyHistory();
        });
    }

    editDataTable() {
        this.isShow = !this.isShow;
        this.change = !this.change;
    }
    editAll() {
        this.change = !this.change;
        // document.getElementById("add-family").addEventListener("click",function(){ alert("Hello World!"); });
        // let focus = document.createAttribute("autofocus");
        // btn.setAttributeNode(focus);
        // console.log('success');
    }
    closeEditTable() {
        document.getElementById("cancel").click();
        this.isShow = !this.isShow;
        this.change = !this.change;
    }
    // saveAll() {
    //   this.change = !this.change;
    // }

    createFamily() {
        document.getElementById("add-family").click();
        this.isShow = !this.isShow;
        this.change = !this.change;
    }


    getFamilyHistory() {
        this.familyHistoryService
            .getFamilyHistory(this.patientId)
            .subscribe((data) => {
                this.family = data;
                this.dataSource = this.family;
                this.dataSource.paginator = this.paginator;
            });
    }

}
