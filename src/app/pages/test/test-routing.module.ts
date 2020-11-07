import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//component
import { ExampleComponent } from './components/example/example.component';
import { Test2Component } from '../test/components/test2/test2.component';

const routes: Routes = [
  {
    path: '',
    component: ExampleComponent
  },
  {
    path: 'test2',
    component: Test2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
