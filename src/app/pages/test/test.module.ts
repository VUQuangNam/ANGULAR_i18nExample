import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { ExampleComponent } from './components/example/example.component';
import { Test2Component } from './components/test2/test2.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [ExampleComponent, Test2Component],
  imports: [
    CommonModule,
    TestRoutingModule,
    SharedModule
  ]
})
export class TestModule { }
