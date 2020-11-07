import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TabMenuService } from 'src/app/shared/services/tabMenu.service';
import { AlertService } from "../../../../shared/services/alert.service";
//service
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-recent-clients',
  templateUrl: './recent-clients.component.html',
  styleUrls: ['./recent-clients.component.scss']
})
export class RecentClientsComponent implements OnInit {

  patients: any;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private patientService: PatientService,
    private menuService: TabMenuService
  ) { }
   
 listPatient: any;

 getListPatient(){
   this.patientService.list().subscribe(patient => {
      this.listPatient = patient.filter(x => x.VisitId !== 0);
      console.log('danh sách bệnh nhân có visitid',this.listPatient);
   });
 }
 
 routerLink(patientId: number){
   this.router.navigateByUrl(`pages/profile/detail/${patientId}/profile-info`);
   this.menuService.showSmallMenu(false);
 }
 routerLinkListPatient(){
   this.router.navigateByUrl(`pages/clients`);
   this.menuService.showSmallMenu(false);
 }

  ngOnInit(): void {
    this.getListPatient();
  }

}
