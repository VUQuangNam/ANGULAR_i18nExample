import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Router, ActivatedRoute } from "@angular/router";

import { InvoicesService } from '../../services/invoices.service';
import { PaymentService } from '../../services/payment.service';
import { BillService } from '../../services/bill.service';
import { BillModel } from '../../models/bill.model';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: "app-invoices",
    templateUrl: "./invoices.component.html",
    styleUrls: ["./invoices.component.scss"],
})
export class InvoicesComponent implements OnInit {
    constructor(private activatedRoute: ActivatedRoute,
        public invoicesService: InvoicesService,
        private router: Router,
        public paymentService: PaymentService,
        public alertService: AlertService,
        public billService: BillService,
    ) { }
    dataSource: any;
    displayedColumns = ["check", "No.", "Date", "Amount", "Unpaid"];
    displayedColumnsData = ["Invoice"];
    displayedColumnsPay = ["Pay"];
    id: number;
    arr = [];
    check: boolean = false;
    showRowTable: boolean = false;
    isSelect: boolean = false;
    invoiceList: any;
    patientId: number;
    selectedInvoiceList: any[] = [];
    selectedInvoiceIdList: any[] = [];
    unDisplayButtonAssign: Boolean = true;
    invoiceId: number;
    checkInput: boolean = false;
    currencyId: number;
    payListId: any = [];
    payList: any = [];
    total: number = 0;
    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(param => this.patientId = +param.get('patientId'));
        // this.getInvoices();
        this.getServiceChargeInvoices();
        console.log(this.patientId);
        let today = new Date();

        console.log(today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear());

    }
    checkout() {
        console.log("this.payList", this.payList);
        let today = new Date();
        // let model= {
        //   "Invoices": this.payListId,
        // }
        let data = new BillModel();
        data.PatientId = this.patientId;
        data.TotalAmount = this.total;
        data.CurrencyId = this.currencyId;
        data.Invoices = this.payList;
        data.GeneratedDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.billService.postBill(data).subscribe(res => {
            this.alertService.changeMessage({
                color: 'green',
                text: `Tạo thành công`
            });
        })
        localStorage.setItem('payList', JSON.stringify(this.payList));
    }
    change(event, invoiceId, invoiceNumber, currencyId) {
        this.total = 0;
        let data = {
            "InvoiceId": invoiceId,
            "Amount": event.target.value,
        }

        // let dataInvoiceId={
        //   "InvoiceId": invoiceId,
        // }
        // this.payList.push(data);
        console.log(this.payListId);

        this.currencyId = currencyId;
        this.payList.push(data);
        for (let i = 0; i < this.payList.length; i++) {
            this.total += Number(this.payList[i].Amount)
        }
        console.log(this.total);
        console.log("payList", this.payList);
    }

    showPay() {
        this.check = !this.check;
    }

    chooseInvoice(invoice) {
        if (this.selectedInvoiceList.length == 0) {
            this.unDisplayButtonAssign = false;
            this.selectedInvoiceList.push(invoice);
        }
        else {
            let index = this.selectedInvoiceList.findIndex(i => JSON.stringify(i) == JSON.stringify(invoice));
            if (this.selectedInvoiceList.includes(this.selectedInvoiceList[index]) == true) {
                this.selectedInvoiceList.splice(index, 1);
                if (this.selectedInvoiceList.length == 0) {
                    this.unDisplayButtonAssign = true;
                }
            }
            else {
                this.selectedInvoiceList.push(invoice);
                this.unDisplayButtonAssign = false;
            }
            // this.unDisplayButtonAssign = false;
        }
        console.log("this.selectedInvoiceList", this.selectedInvoiceList);
    }
    chooseInvoiceById(InvoiceId) {
        this.invoiceId = InvoiceId;
        if (this.selectedInvoiceIdList.includes(InvoiceId)) {
            let index = this.selectedInvoiceIdList.findIndex(i => i == InvoiceId);
            this.selectedInvoiceIdList.splice(index, 1);
        }
        else {
            this.selectedInvoiceIdList.push(InvoiceId);
        }
        console.log('Id don da chon', this.selectedInvoiceIdList);
    }
    selectAll() {
        this.isSelect = !this.isSelect;
        if (this.invoiceList.length !== this.selectedInvoiceList.length) {
            this.selectedInvoiceList.length = 0;
            for (var i = 0; i < this.invoiceList.length; i++) {
                this.selectedInvoiceList.push(this.invoiceList[i]);
            }
            this.unDisplayButtonAssign = false;
        }
        else {
            this.unDisplayButtonAssign = true;
            this.selectedInvoiceList.length = 0;
        }
        console.log("selectedInvoiceList", this.selectedInvoiceList);

    }
    showInput() {
        this.showRowTable = !this.showRowTable;
    }
    getInvoices() {
        this.invoicesService.getInvoices(null, null).subscribe(data => {
            console.log("data", data);
            this.invoiceList = data;

            this.dataSource = new MatTableDataSource(this.invoiceList)
        })
    }
    getServiceChargeInvoices() {
        this.invoicesService.getServiceChargeInvoices(null).subscribe(data => {
            console.log("getServiceChargeInvoices", data);

        })
    }
}
