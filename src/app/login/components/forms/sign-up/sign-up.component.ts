import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterModel } from '../../../models/register.model';
import { AccountRegisterService } from '../../../services/register.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;

  constructor(
    private accountRegisterService: AccountRegisterService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registerAccount() {
    let accountModel = new RegisterModel();
    accountModel.Email = this.email;
    accountModel.Password = this.password;
    accountModel.ConfirmPassword = this.password;
    console.log(accountModel);
    this.accountRegisterService.create(accountModel).subscribe(res => {
      swal.fire(
        'Account registration is successful!',
        'You clicked the button!',
        'success'
      );
      this.router.navigateByUrl('/login');
    })
  }

}
