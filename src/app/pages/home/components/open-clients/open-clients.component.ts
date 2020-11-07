import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabMenuService } from 'src/app/shared/services/tabMenu.service';

@Component({
  selector: 'app-open-clients',
  templateUrl: './open-clients.component.html',
  styleUrls: ['./open-clients.component.scss']
})
export class OpenClientsComponent implements OnInit {

  constructor(
    private router: Router,
    private menuService: TabMenuService
  ) { }

  ngOnInit(): void {
  }
  routerLinkListPatient(){
    this.router.navigateByUrl(`pages/clients`);
    this.menuService.showSmallMenu(false);
  }
 

}
