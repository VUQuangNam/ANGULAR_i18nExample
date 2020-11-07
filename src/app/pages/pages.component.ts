import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
    selector: 'app-pages',
    styleUrls: ['pages.component.scss'],
    template: `
    <div class="d-flex">
        <div class="menuLeft"><app-menu-bar></app-menu-bar></div>
        <div class="main">
        <app-tab-row-menu *ngIf="checked" [patientId]="patientId"></app-tab-row-menu>
        <router-outlet></router-outlet>
        </div>
        <app-notifications></app-notifications>
    </div>
    `
})

export class PagesComponent implements OnInit {
    checked = false;
    patientId;
    constructor(
        private router: Router
    ) {
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            distinctUntilChanged(),
        ).subscribe((res: any) => {
            const data = res.url.split('/');
            if (data.length > 3 && data.includes('detail'))
                return this.checked = true,
                    this.patientId = data[data.length - 2];
            return this.checked = false;
        });
    }
    ngOnInit() {
        const data = window.location.href.split('/');
        if (data.length > 6 && data.includes('detail'))
            return this.checked = true,
                this.patientId = data[data.length - 2];
        return this.checked = false;
    }

}