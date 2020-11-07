import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { AlertService } from 'src/app/shared/services/alert.service';
import { InvoiceService, MedicationInvoiceService, ServiceInvoiceService } from '../../services';
import { ServiceInvoiceModel } from '../../model';


@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    constructor(
        private invoiceSvc: InvoiceService,
        private activatedRoute: ActivatedRoute,
        public dialog: MatDialog,
        public alertService: AlertService,
        public ActivatedRoute: ActivatedRoute,
        public ServiceInvoiceService: ServiceInvoiceService,
        public MedicationInvoiceService: MedicationInvoiceService
    ) { }

    displayedColumnsServices = [
        'No.',
        'Description',
        'Quantity',
        'Unit cost',
        'Tax',
        'Discount',
        'Amount'
    ];

    displayedColumnsMedication = [
        'No.',
        'Name',
        'SKU',
        'Quantity',
        'Unit cost',
        'Tax',
        'Discount',
        'Amount'
    ];

    dataSource: any;
    patientId: number;
    isShow: boolean = false
    InvoiceId: number;
    Medication: number;
    serviceInvoice: any;
    MedicationInvoice: any;
    Description: string;
    SKU: string;
    Quantity: number;
    Discount: number;
    Name: string;
    Unitcost: number;
    Tax: number;
    amountArr = [];
    amountArrMedication = [];
    totalArr = [];
    listServiceCharge: any;
    currentInvoice: any;
    showButton: boolean = false;

    ngOnInit(): void {
        // this.getInvoicePatient();
        this.activatedRoute.paramMap.subscribe(param => this.patientId = +param.get('patientId'));
        this.getInvoiceById()
        this.getMedicationbyId();
    }
    // getInvoicePatient(){
    //    this.invoiceSvc.getInvoicePatient(this.patientId, null).subscribe(res => {
    //         this.listServiceCharge = res;
    //         this.currentInvoice = this.listServiceCharge[this.listServiceCharge.length - 1];
    //         console.log(this.currentInvoice);

    //    });
    // }
    editDataTable() {
        this.isShow = !this.isShow;
        // document.getElementById('cancel').click();
    }
    editButton() {
        this.showButton != this.showButton;
    }

    clickAdd() {
        this.isShow = !this.isShow;
        document.getElementById('add-button').click();
    }

    getInvoiceById() {
        let count: number = 0;
        this.ServiceInvoiceService.getInvoice(this).subscribe(res => {
            this.serviceInvoice = res;
            // this.dataSource = new MatTableDataSource(this.PatientImmunizationschedules);
            for (let i = 0; i < this.serviceInvoice.length; i++) {
                count += this.serviceInvoice[i].Price;
            }
            let amount = { "Count": count };
            this.amountArr.push(amount);
        });
    }

    getMedicationbyId() {
        let count: number = 0;
        this.MedicationInvoiceService.getMedication(this.InvoiceId).subscribe(res => {
            this.MedicationInvoice = res;
            // this.dataSource = new MatTableDataSource(this.PatientImmunizationschedules);
            for (let i = 0; i < this.MedicationInvoice.length; i++) {
                count += this.MedicationInvoice[i].Price;
            }
            let price = { "Count": count };
            this.amountArrMedication.shift();
            this.amountArrMedication.push(price);
            let total = { "Total": this.amountArrMedication[0].Count + this.amountArr[0].Count };
            this.totalArr.shift();
            this.totalArr.push(total);
        });
    }
    showCommand() {
        this.isShow = !this.isShow;
    }

    private editedRowIndex: number;
    private editedProduct: any;

    public editHandler({ sender, rowIndex, dataItem }) {
        this.closeEditor(sender);
        this.editedRowIndex = rowIndex;
        sender.editRow(rowIndex, dataItem);
    }

    public addHandler({ sender }, formInstance) {
        // close the previously edited item
        // formInstance.reset();
        this.closeEditor(sender);
        formInstance = new ServiceInvoiceModel();
        formInstance.DrugpriceId = 1;
        sender.addRow(formInstance);
        console.log("myForm", formInstance);

        // open a new item editor
        // sender.addRow(new Product());
    }

    public saveHandler({ sender, rowIndex, dataItem, isNew }) {
        if (isNew) {
            this.MedicationInvoiceService.create(dataItem).subscribe(res => {
                this.alertService.changeMessage({
                    color: 'green',
                    text: `Tạo thành công`
                });
                this.getMedicationbyId();
            });
        }
        else {
            this.MedicationInvoiceService.editMedication(dataItem.DrugChargeId, dataItem).subscribe(res => {
                console.log(res);
                console.log(dataItem);

                this.alertService.changeMessage({
                    color: 'green',
                    text: `Sửa thành công`
                });
                this.getMedicationbyId();
            });
        }

        sender.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.editedProduct = undefined;
    }

    public removeHandler(e) {
        console.log(e);
        this.MedicationInvoiceService.deleteMedication(e.dataItem.DrugChargeId).subscribe(res => {
            this.alertService.changeMessage({
                color: 'green',
                text: `Xóa thành công`
            });
            this.getMedicationbyId()
        });
    }

    public cancelHandler({ sender, rowIndex }) {
        this.closeEditor(sender, rowIndex);
    }

    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);

        this.editedRowIndex = undefined;
        this.editedProduct = undefined;
    }

}
