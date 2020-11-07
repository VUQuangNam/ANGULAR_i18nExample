import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from "@angular/router";

import { PaymentService } from '../../../account/services/payment.service';
import { BillService } from '../../../account/services/bill.service';
import { AlertService } from 'src/app/shared/services/alert.service';


@Component({
    selector: 'app-medical-bill',
    templateUrl: './medical-bill.component.html',
    styleUrls: ['./medical-bill.component.scss']
})
export class MedicalBillComponent implements OnInit {
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    constructor(private activatedRoute: ActivatedRoute,
        public paymentService: PaymentService,
        public billService: BillService,
        public alertService: AlertService,
    ) { }

    displayedColumnsBill = [
        'No.',
        'Invoice',
        'Amount'
    ];

    // displayedColumnsMedication = [
    //   'No.',
    //   'Name',
    //   'SKU',
    //   'Quantity',
    //   'Unit cost',
    //   'Tax',
    //   'Discount',
    //   'Amount'
    // ];
    dataSource: any;
    list: any;
    bill: any;
    billList: any;
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
    subtotal: number = 0;
    total: number = 0;
    show: boolean = false;
    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(param => this.patientId = +param.get('patientId'));
        this.list = JSON.parse(localStorage.getItem('payList'));;
        this.dataSource = new MatTableDataSource(this.list);
        this.getPatient();
        this.getPayment();
        this.getBillList();
    }
    getPayment() {
        this.paymentService.getAllPayment(this.patientId, null, null).subscribe(data => {
            console.log("getAllPayment", data);

        })
    }
    shareData() {
        this.list.forEach(element => {
            let data = {
                "PaymentmethodId": this.PaymentmethodId,
                "Amount": element.Amount,
                "CurrencyId": 2,
                "PayerName": this.payerName,
                "PayerPhone": this.payerPhone,
                "PayerRelationship": this.payerName,
                "PayerBillingAddress": this.payerBillingAddress,
                "InvoiceId": element.InvoiceId
            }
            this.paymentService.postPayment(data).subscribe(res => {
                this.alertService.changeMessage({
                    color: 'green',
                    text: `Tạo thành công`
                });
            })
        });

        this.billService.getBillInvoices(this.patientId, this.startDate, this.startDate).subscribe(data => {
            this.alertService.changeMessage({
                color: 'green',
                text: `Tạo thành công`
            });
        })
    }
    showTotal() {
        this.show = !this.show
    }
    updatePaymentmethodId(paymentmethodId) {
        this.PaymentmethodId = paymentmethodId;
        console.log(paymentmethodId);
    }
    getBillList() {
        this.billService.getAllBill(this.patientId).subscribe(data => {
            this.billList = data;
            this.bill = this.billList[0];
            console.log(this.bill);

        })
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
