import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { SignUpComponent } from './components/forms/sign-up/sign-up.component';
import { SignInComponent } from './components/forms/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './components/forms/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    LoginRegisterComponent, 
    SignUpComponent,
    SignInComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ]
})
export class LoginModule { }
