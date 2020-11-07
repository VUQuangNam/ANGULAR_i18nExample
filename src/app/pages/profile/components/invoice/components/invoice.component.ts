import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "src/app/shared/services/alert.service";
import { MatTableDataSource } from "@angular/material/table";
import Swal from 'sweetalert2';

import { CreateListOfChargeComponent } from './create-list-of-charge/create-list-of-charge.component';
import { EditListOfChargeComponent } from './edit-list-of-charge/edit-list-of-charge.component';
import { InvoiceService } from '../services';
import { environment } from 'src/environments/environment';

@Component({
    selector: "app-invoice",
    templateUrl: "./invoice.component.html",
    styleUrls: ["./invoice.component.scss"],
})
export class InvoiceComponent implements OnInit {
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    constructor(
        public dialog: MatDialog,
        public alertService: AlertService,
        public activatedRoute: ActivatedRoute,
        public invoiceService: InvoiceService
    ) { }
    isShow: boolean = false;
    displayedColumns = ["Category", "Description", "SKU", "Quantity"];
    dataSource: any;
    ListofchargeList: any;
    patientId: number;
    showButton: boolean = false;
    InvoiceId: number;
    Listofcharge: any;
    Description: string;
    SKU: string;
    Quantity: number;
    Discount: number;
    Category: string;
    visitId: number;
    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(
            (param) => (this.patientId = +param.get("patientId"))
        );
        // this.dataSource = new MatTableDataSource(this.PatientImmunizationschedules);
        this.getInvoicePatient();
        this.getDetailPatient();
    }
    getDetailPatient() {
        this.invoiceService.getDetailPatient(this.patientId).subscribe(res => {
            this.visitId = res.VisitId;
        });
    }

    finishVisit() {
        let model = {
            PatientId: this.patientId,
            Status: 2
        }
        this.invoiceService.finishVisit(this.visitId, model).subscribe(res => {
            console.log(res, model);

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                showConfirmButton: false,
                timer: environment.timeCloseDialog
            });
        });
    }

    openDialog() {
        const dialogRef = this.dialog.open(CreateListOfChargeComponent, {
            width: "900px",
            height: " 300px",
            panelClass: "add",
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }
    openEditDialog() {
        const dialogRef = this.dialog.open(EditListOfChargeComponent, {
            width: "900px",
            height: " 300px",
            panelClass: "edit",
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }
    getInvoicePatient() {
        this.invoiceService.getInvoicePatient(11).subscribe((res) => {
            this.ListofchargeList = res;
            this.dataSource = new MatTableDataSource(this.ListofchargeList);
            this.dataSource.paginator = this.paginator;
            console.log("danh sách invoice ", this.ListofchargeList);
        });
    }
}
