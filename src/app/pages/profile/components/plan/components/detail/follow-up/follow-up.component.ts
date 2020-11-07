import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FollowUpService } from "../../../services/index";

@Component({
    selector: 'app-follow-up',
    templateUrl: './follow-up.component.html',
    styleUrls: ['./follow-up.component.scss']
})
export class FollowUpComponent implements OnInit {
    @Input() data;

    constructor(
        private followUp: FollowUpService
    ) { }
    time: any = [

        {
            id: 1,
            Name: "hours"
        },
        {
            id: 2,
            Name: "days"
        },
        {
            id: 3,
            Name: "weeks"
        },
        {
            id: 4,
            Name: "months"
        },
        {
            id: 5,
            Name: "years"
        }
    ];
    quantity: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    Where: any = [
        {
            id: 1,
            Name: "Hospital"
        },
        {
            id: 2,
            Name: "Clinic"
        },
        {
            id: 3,
            Name: "Home"
        }
    ];
    homeCare = 1;
    quantityNumber: number;
    timeActive: number;
    whereActive: number;
    today: any;
    getTime: any;
    getMonth: any;
    getYear: number;
    getDate: any;
    getHour: any;
    getMinutes: any;
    timer: any;
    followUpId: number;
    listFollowUp: any;
    dateTime: any;
    followDate: any;

    ngOnInit() {
        this.getFollowUp();
        this.today = new Date();
        this.getDate = (this.today.getDate() < 10 ? "0" : "") + this.today.getDate();
        this.getMonth = (this.today.getMonth() < 9 ? "0" : "") + (this.today.getMonth() + 1);
        this.getYear = this.today.getFullYear();
        this.getHour = this.today.getHours();
        this.getMinutes = this.today.getMinutes();
        this.getTime = this.getYear + "-" + this.getMonth + "-" + this.getDate;
        this.timer = this.getHour + ":" + (this.getMinutes < 10 ? '0' : '') + this.getMinutes;
        this.followDate = this.getTime + 'T' + this.timer;
    }

    setTimer() {
        this.today = new Date();
        this.getTime = this.today.getTime();
        this.getHour = this.today.getHours();
        this.getMinutes = this.today.getMinutes();
        this.getDate = (this.today.getDate() < 10 ? "0" : "") + this.today.getDate();
        this.getMonth = (this.today.getMonth() < 9 ? "0" : "") + (this.today.getMonth() + 1);
        this.getYear = this.today.getFullYear();
        this.timer = this.getHour + ":" + (this.getMinutes < 10 ? '0' : '') + this.getMinutes;
        this.followDate = this.getTime + 'T' + this.timer;
    }
    clickQuantity(item) {
       this.setTimer();
        this.quantityNumber = item;
        if (this.timeActive === 1) {
            const time = this.getTime + (this.quantityNumber * 60 * 60 * 1000);
            const timeStr = new Date(time).toString();
            this.today = new Date(timeStr);
            this.getDate = (this.today.getDate() < 10 ? "0" : "") + this.today.getDate();
            this.getMonth = (this.today.getMonth() < 9 ? "0" : "") + (this.today.getMonth() + 1);
            this.getYear = this.today.getFullYear();
            this.getHour = this.today.getHours();
            this.getMinutes = this.today.getMinutes();
            this.getTime = this.getYear + "-" + this.getMonth + "-" + this.getDate;
            this.timer = (this.getHour < 10 ? '0' : '') + this.getHour + ":" + (this.getMinutes < 10 ? '0' : '') + this.getMinutes;
            this.followDate = this.getTime + 'T' + this.timer;
        }
        if (this.timeActive === 2) {
            const time = this.getTime + (this.quantityNumber * 86400 * 1000);
            const timeStr = new Date(time).toString();
            this.today = new Date(timeStr);
            this.getDate = (this.today.getDate() < 10 ? "0" : "") + this.today.getDate();
            this.getMonth = (this.today.getMonth() < 9 ? "0" : "") + (this.today.getMonth() + 1);
            this.getYear = this.today.getFullYear();
            this.getHour = this.today.getHours();
            this.getMinutes = this.today.getMinutes();
            this.timer = (this.getHour < 10 ? '0' : '') + this.getHour + ":" + (this.getMinutes < 10 ? '0' : '') + this.getMinutes;
            this.getTime = this.getYear + "-" + this.getMonth + "-" + this.getDate;
            this.followDate = this.getTime + 'T' + this.timer;
        }
        if (this.timeActive === 3) {
            const time = this.getTime + (this.quantityNumber * 7 * 86400 * 1000);
            const timeStr = new Date(time).toString();
            this.today = new Date(timeStr);
            this.getDate = (this.today.getDate() < 10 ? "0" : "") + this.today.getDate();
            this.getMonth = (this.today.getMonth() < 9 ? "0" : "") + (this.today.getMonth() + 1);
            this.getYear = this.today.getFullYear();
            this.getHour = this.today.getHours();
            this.getMinutes = this.today.getMinutes();
            this.timer = (this.getHour < 10 ? '0' : '') + this.getHour + ":" + (this.getMinutes < 10 ? '0' : '') + this.getMinutes;
            this.getTime = this.getYear + "-" + this.getMonth + "-" + this.getDate;
            this.followDate = this.getTime + 'T' + this.timer;
        }
        if (this.timeActive === 4) {
            this.getDate = (this.today.getDate() < 10 ? "0" : "") + this.today.getDate();
            this.getMonth = (this.today.getMonth() < 9 ? "0" : "") + (this.today.getMonth() + 1);
            this.getYear = this.today.getFullYear();
            this.getHour = this.today.getHours();
            this.getMinutes = this.today.getMinutes();
            this.timer = (this.getHour < 10 ? '0' : '') + this.getHour + ":" + (this.getMinutes < 10 ? '0' : '') + this.getMinutes;
            const monthOfFuture = +this.getMonth + this.quantityNumber;
            if (monthOfFuture > 12) {
                this.getMonth = (monthOfFuture - 12 < 10 ? '0' : '') + (monthOfFuture - 12);
                this.getTime = (this.getYear + 1) + "-" + (this.getMonth) + "-" + this.getDate;
                this.followDate = this.getTime + 'T' + this.timer;

            }
            else {
                this.getTime = this.getYear + "-" + (+this.getMonth + this.quantityNumber) + "-" + this.getDate;
                this.followDate = this.getTime + 'T' + this.timer;
            }
        }
        if (this.timeActive === 5) {
            this.getHour = this.today.getHours();
            this.getMinutes = this.today.getMinutes();
            this.timer = (this.getHour < 10 ? '0' : '') + this.getHour + ":" + (this.getMinutes < 10 ? '0' : '') + this.getMinutes;
            this.getDate = (this.today.getDate() < 10 ? "0" : "") + this.today.getDate();
            this.getMonth = (this.today.getMonth() < 9 ? "0" : "") + (this.today.getMonth() + 1);
            this.getYear = this.today.getFullYear();
            this.getTime = (this.getYear + this.quantityNumber) + "-" + this.getMonth + "-" + this.getDate;
            this.followDate = this.getTime + 'T' + this.timer;

        }
    }
    clickTimeActive(item) {
        this.setTimer();
        this.timeActive = item.id;
        if (this.timeActive === 1) {
            const time = this.getTime + (this.quantityNumber * 60 * 60 * 1000);
            const timeStr = new Date(time).toString();
            this.today = new Date(timeStr);
            this.getHour = this.today.getHours();
            this.getMinutes = this.today.getMinutes();
            this.getYear = this.today.getFullYear();
            this.getHour = this.today.getHours();
            this.getMinutes = this.today.getMinutes();
            this.getTime = this.getYear + "-" + this.getMonth + "-" + this.getDate;
            this.timer = (this.getHour < 10 ? '0' : '') + this.getHour + ":" + (this.getMinutes < 10 ? '0' : '') + this.getMinutes;
            this.followDate = this.getTime + 'T' + this.timer;
        }
        if (this.timeActive === 2) {
            const time = this.getTime + (this.quantityNumber * 86400 * 1000);
            const timeStr = new Date(time).toString();
            this.today = new Date(timeStr);
            this.getDate = (this.today.getDate() < 10 ? "0" : "") + this.today.getDate();
            this.getMonth = (this.today.getMonth() < 9 ? "0" : "") + (this.today.getMonth() + 1);
            this.getYear = this.today.getFullYear();
            this.getHour = this.today.getHours();
            this.getMinutes = this.today.getMinutes();
            this.getTime = this.getYear + "-" + this.getMonth + "-" + this.getDate;
            this.timer = (this.getHour < 10 ? '0' : '') + this.getHour + ":" + (this.getMinutes < 10 ? '0' : '') + this.getMinutes;
            this.followDate = this.getTime + 'T' + this.timer;
        }
        if (this.timeActive === 3) {
            const time = this.getTime + (this.quantityNumber * 7 * 86400 * 1000);
            const timeStr = new Date(time).toString();
            this.today = new Date(timeStr);
            this.getDate = (this.today.getDate() < 10 ? "0" : "") + this.today.getDate();
            this.getMonth = (this.today.getMonth() < 9 ? "0" : "") + (this.today.getMonth() + 1);
            this.getYear = this.today.getFullYear();
            this.getHour = this.today.getHours();
            this.getMinutes = this.today.getMinutes();
            this.getTime = this.getYear + "-" + this.getMonth + "-" + this.getDate;
            this.timer = (this.getHour < 10 ? '0' : '') + this.getHour + ":" + (this.getMinutes < 10 ? '0' : '') + this.getMinutes;
            this.followDate = this.getTime + 'T' + this.timer;
        }
        if (this.timeActive === 4) {
            this.getDate = (this.today.getDate() < 10 ? "0" : "") + this.today.getDate();
            this.getMonth = (this.today.getMonth() < 9 ? "0" : "") + (this.today.getMonth() + 1);
            this.getYear = this.today.getFullYear();
            this.getHour = this.today.getHours();
            this.getMinutes = this.today.getMinutes();
            this.timer = (this.getHour < 10 ? '0' : '') + this.getHour + ":" + (this.getMinutes < 10 ? '0' : '') + this.getMinutes;
            const monthOfFuture = +this.getMonth + this.quantityNumber;
            if (monthOfFuture > 12) {
                this.getMonth = (monthOfFuture - 12 < 10 ? '0' : '') + (monthOfFuture - 12);
                this.getTime = (this.getYear + 1) + "-" + (this.getMonth) + "-" + this.getDate;
                this.followDate = this.getTime + 'T' + this.timer;
            }
            else {
                this.getTime = this.getYear + "-" + (+this.getMonth + this.quantityNumber) + "-" + this.getDate;
                this.followDate = this.getTime + 'T' + this.timer;
            }
        }
        if (this.timeActive === 5) {
            this.getDate = (this.today.getDate() < 10 ? "0" : "") + this.today.getDate();
            this.getMonth = (this.today.getMonth() < 9 ? "0" : "") + (this.today.getMonth() + 1);
            this.getYear = this.today.getFullYear();
            this.getHour = this.today.getHours();
            this.getMinutes = this.today.getMinutes();
            this.timer = (this.getHour < 10 ? '0' : '') + this.getHour + ":" + (this.getMinutes < 10 ? '0' : '') + this.getMinutes;
            this.getTime = (this.getYear + this.quantityNumber) + "-" + this.getMonth + "-" + this.getDate;
            this.followDate = this.getTime + 'T' + this.timer;
        }
    }
    clickWhereActive(item) {
        this.whereActive = item.id;
    }
    clickHomeCare(homeCare) {
        this.homeCare = homeCare;
    }
    getFollowUp() {
        this.followUp.getFollowUp(this.data.VisitId, this.data.ProblemId).subscribe(res => {
            if(res !== null){
                this.listFollowUp = res;
                this.followDate = res.FollowDate;
                // this.getTime = res.FollowDate.split('T')[0];
                // this.timer = res.FollowDate.split('T')[1];
                this.followUpId = res.FollowupId;
                this.whereActive = res.PlaceValue;
                this.homeCare = res.HomeCare;
            }
           
            // console.log(this.listFollowUp);
        })
    }
   async confirmButton() {
      await this.getFollowUp();
        if (this.listFollowUp == null) {
            this.createFollowUp();
        }
        else {
            this.updateFollowUp();
        }
    }
    createFollowUp() {
        let model = {
            FollowDate: this.followDate,
            PlaceValue: this.whereActive,
            HomeCare: this.homeCare,
            VisitId: this.data.VisitId,
            ProblemId: this.data.ProblemId,
            Type: 1
        }
        console.log(model);
        this.followUp.createFollowUp(model).subscribe(res => {

            Swal.fire({
                icon: 'success',
                title: 'Create follow up successful!',
                showConfirmButton: false,
                timer: 1500
            });
            
        });
        this.getFollowUp();
    }
    updateFollowUp() {
        let model = {
            FollowDate: this.followDate,
            PlaceValue: this.whereActive,
            HomeCare: this.homeCare,
            VisitId: this.data.VisitId,
            ProblemId: this.data.ProblemId,
            Type: 1
        }
        console.log(model);
        this.followUp.updateFollowUp(this.followUpId, model).subscribe(res => {
            Swal.fire({
                icon: 'success',
                title: 'Update successful!',
                showConfirmButton: false,
                timer: 1500
            });
        });
        this.getFollowUp();
    }


}
