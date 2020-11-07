import { Component, OnInit } from '@angular/core';

import { TabMenuService } from "../../services/tabMenu.service";
@Component({
    selector: 'app-menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.scss'],

})
export class MenuBarComponent implements OnInit {

    constructor(
        public data: TabMenuService
    ) { }

    isShow: boolean = false;
    patientId: number;
    hideMenu: boolean = false;
    isShowMenu: boolean;

    ngOnInit(): void {
        this.data.currentMessage.subscribe(res => {
            this.isShow = res;
            this.patientId = res;

        });
        this.data.hideMenuValue.subscribe(res => {
            this.hideMenu = res;
        });

        this.data.sizeMenu.subscribe(res => {
            this.isShowMenu = res;
        });

        const url = window.location.href.split('/');
        if (url.includes("home") === true) {
            this.isShowMenu = true;
        }
        else {
            this.isShowMenu = false;
        }
    }

    openNav() {
        this.isShowMenu = true;
    }

    closeNav() {
        this.isShowMenu = false;
    }

    showMenu() {
        this.isShow = !this.isShow;
    }

}
