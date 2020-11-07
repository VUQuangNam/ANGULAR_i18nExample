import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../../services/sign-in.service"
import { Router } from '@angular/router';
import { AlertService } from "../../../../shared/services/alert.service";
import { LoginModule } from 'src/app/login/login.module';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    private alertService: AlertService,
    private loginService: LoginService,
    private router: Router

  ) { }
  error: any;
  userName: string;
  pwd: string;
  ngOnInit(): void {
  }

  login(): void {
    this.loginService.login(this.userName, this.pwd).subscribe((data: any) => {
      console.log(data.userName);
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('access_user', JSON.stringify(data));
      setTimeout(() => this.router.navigateByUrl('/pages/home'), 300);
    },
      (err) => {
        this.error = err;
        console.log(err);

      }
      , () => this.alertService.changeMessage({
        color: 'green',
        text: `Welcome!`
      }));
  }
}
