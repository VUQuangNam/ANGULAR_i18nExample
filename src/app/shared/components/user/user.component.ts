import { Component, OnInit } from '@angular/core';
import { TabMenuService } from "../../services/tabMenu.service";
import { Router } from "@angular/router";
import { Route } from '@angular/compiler/src/core';
import { AlertService } from "../../services/alert.service";
import { ProviderService } from 'src/app/pages/Home/services/provider.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    constructor(
        public hideMenu: TabMenuService,
        public router: Router,
        public alertService: AlertService,
        public providerService: ProviderService
    ) { }

    name: string;
    position: string;
    currentProfile: any

    ngOnInit(): void {
        this.getProfile();
    }

    getProfile() {
        this.providerService.getProfileProvider().subscribe(res => {
            this.currentProfile = res;
        });
    }


    profileDetail() {
        this.hideMenu.sentHideMenuValue(true);
        this.router.navigateByUrl('/pages/home/doctor')
    }
    logout() {
        if (confirm("Bạn có muốn đăng xuất không?")) {
            localStorage.clear();
            setTimeout(() => {
                this.router.navigateByUrl('/login');
            }, 1000);
        } else {
            console.log('cancel')
        }
    }




}
