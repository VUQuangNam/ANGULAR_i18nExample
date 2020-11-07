import { Component, OnInit } from "@angular/core";

import { MessagesService } from '../service';

@Component({
    selector: "app-messages",
    templateUrl: "./messages.component.html",
    styleUrls: ["./messages.component.scss"],
})
export class MessagesComponent implements OnInit {
    constructor(
        public messagesService: MessagesService
    ) { }
    content: string;
    style: boolean = true;
    isActive: number = 1;
    listAllMess: any;

    ngOnInit(): void {
        this.listAllMess();
    }
    activeTab(value) {
        this.isActive = value;
    }
    openMail() {
        this.style = !this.style;
    }

    getAllUserMess() {
        this.messagesService.getListUserMessage().subscribe((res) => {
            this.listAllMess = res;
            console.log("list all mess", this.listAllMess);
        });
    }
}
