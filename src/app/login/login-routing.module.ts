import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { SignUpComponent } from './components/forms/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forms/forgot-password/forgot-password.component';


const routes: Routes = [
  {
    path: '',
    component: LoginRegisterComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
