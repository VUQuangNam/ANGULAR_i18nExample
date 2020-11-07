import {
    BrowserModule,
    HAMMER_GESTURE_CONFIG,
    HammerGestureConfig,
    HammerModule,
    TransferState,
} from "@angular/platform-browser";
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from "@angular/common";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//shared
import { SharedModule } from "../app/shared/shared.module";

//interceptor
import { LoaderService } from "./shared/services/loader.service";
import { LoaderInterceptor } from "./shared/interceptors/loader.interceptor";
import { APIInterceptor } from "./shared/interceptors/api.interceptor";
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { GridModule } from "@progress/kendo-angular-grid";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { ChartsModule } from "@progress/kendo-angular-charts";
import "hammerjs";
import * as Hammer from "hammerjs";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// making hammer config (3)
export class MyHammerConfig extends HammerGestureConfig {
    overrides = <any>{
        swipe: { direction: Hammer.DIRECTION_ALL },
    };
}
export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        GridModule,
        ButtonsModule,
        InputsModule,
        ChartsModule,
        HammerModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        LoaderService,
        {
            provide: APP_BASE_HREF,
            useValue: "/",
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: APIInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true,
        },
        { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
