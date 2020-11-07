import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { BillService } from '../../../account/services/bill.service';
import { PaymentService } from '../../../account/services/payment.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-print',
    templateUrl: './print.component.html',
    styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    constructor(
        private activatedRoute: ActivatedRoute,
        public paymentService: PaymentService,
        public billService: BillService,
        public alertService: AlertService
    ) { }

    displayedColumnsBill = [
        'No.',
        'Invoice',
        'Amount'
    ];
    dataClientInfo: any;
    paymentInfor: any;
    paymentMethod: any;
    list: any;
    dataSource: any;
    subtotal: number = 0;
    total: number = 0;
    patient: any;
    patientId: number;
    payerName: string;
    payerPhone: string;
    payerBillingAddress: string;
    patientName: string;
    startDate: string;
    invoiceNumber: number;
    createdOn: string;
    PaymentmethodId: number;
    bill: any;
    billList: any;
    payment: any;
    ngOnInit(): void {
        this.dataClientInfo = JSON.parse(localStorage.getItem('dataClientInfo'));
        this.paymentInfor = JSON.parse(localStorage.getItem('paymentInfor'));
        this.paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'));
        this.activatedRoute.paramMap.subscribe(param => this.patientId = +param.get('patientId'));
        this.list = JSON.parse(localStorage.getItem('payList'));;
        this.dataSource = new MatTableDataSource(this.list);
        for (let i = 0; i < this.list.length; i++) {
            this.total += Number(this.list[i].Amount);
            this.subtotal += Number(this.list[i].Amount);
        }
        this.payerName = this.paymentInfor.PayerName;
        console.log(this.list);
        this.getPatient();
        this.getBillList();
        this.getPayment();
        console.log("dataClientInfo", JSON.parse(localStorage.getItem('dataClientInfo')));
        console.log("paymentInfor", this.paymentInfor);
        console.log("paymentMethod", this.paymentMethod);
    }
    getBillList() {
        this.billService.getAllBill(this.patientId).subscribe(data => {
            this.billList = data;
            this.bill = this.billList[0];
            console.log(this.bill);
        })
    }
    getPayment() {
        this.paymentService.getAllPayment(this.patientId, null, null).subscribe(data => {
            console.log("getAllPayment", data[data.length - 1]);
            this.payment = data[data.length - 1]
        })
    }
    getPaymentmethod() {

    }
    getPatient() {
        let today = new Date();
        console.log(today.getDate());
        this.startDate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        this.createdOn = today.getHours() + ":" + today.getMinutes();
        for (let i = 0; i < this.list.length; i++) {
            this.total += Number(this.list[i].Amount);
            this.subtotal += Number(this.list[i].Amount);
        }
        this.billService.getPatientById(this.patientId).subscribe(data => {
            this.patient = data[0];
            console.log(this.patient);
        })
    }
}
