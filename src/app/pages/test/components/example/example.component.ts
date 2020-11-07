import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  show() {
    let notification = {
      text: 'Thành công !',
      color: 'green'
    };
    this.alertService.changeMessage(notification);
  }

}
