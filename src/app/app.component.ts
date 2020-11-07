import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from './shared/components/base.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
    constructor(
        public router: Router,
        public translate: TranslateService
    ) {
        super(router); this.checkToken();
        translate.addLangs(['en', 'vi']);
        translate.setDefaultLang('en');
    }

}
