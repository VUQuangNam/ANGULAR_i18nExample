import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { TabRowMenuComponent } from './profile/tab-row-menu/component/tab-row-menu.component';

@NgModule({
    declarations: [PagesComponent, TabRowMenuComponent,],
    imports: [
        CommonModule,
        PagesRoutingModule,
        SharedModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class PagesModule { }
