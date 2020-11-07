//Angular module
import {
    NgModule,
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import {
    MatDialogModule,
    MAT_DIALOG_DATA,
    MatDialogRef,
} from "@angular/material/dialog";

//Angular material
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { MatBadgeModule } from "@angular/material/badge";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatListModule } from "@angular/material/list";
//component
import { MenuBarComponent } from "./components/menu-bar/menu-bar.component";
import { HeaderComponent } from "./components/header/header.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { UserComponent } from "./components/user/user.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        MenuBarComponent,
        HeaderComponent,
        NotificationsComponent,
        UserComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatSidenavModule,
        MatMenuModule,
        MatTabsModule,
        FormsModule,
        MatBadgeModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatListModule,
        MatDialogModule,
        TranslateModule
    ],
    exports: [
        ReactiveFormsModule,
        MatButtonToggleModule,
        HttpClientModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatCheckboxModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MenuBarComponent,
        HeaderComponent,
        MatSidenavModule,
        MatIconModule,
        NotificationsComponent,
        MatMenuModule,
        UserComponent,
        MatTabsModule,
        FormsModule,
        MatBadgeModule,
        MatDialogModule,
        MatSelectModule,
        MatListModule,
        MatProgressSpinnerModule,
        TranslateModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
    ],
})
export class SharedModule { }
