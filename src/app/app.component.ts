import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { BaseComponent } from './shared/components/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
  constructor(public router: Router) { super(router); this.checkToken() }
}
