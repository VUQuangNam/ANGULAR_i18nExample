import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabMenuService } from "../../../shared/services/tabMenu.service";
import { PatientService } from '../services/patient.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//component
import { SearchPatientComponent } from "./dialog/search-patient/search-patient.component";


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  patients: any;
  openClients: any;
  showOpenClients: boolean = false;
  hideOpenClients: boolean = true;
  hideSchedule: boolean = true;
  hideLastResults: boolean = true;
  hideReview: boolean = true;

  constructor(
    private patientService: PatientService,
    private router: Router,
    public dialog: MatDialog,
    public hideMenu: TabMenuService

  ) { }

  ngOnInit(): void {
    this.getPatients();
  }

  showAllOpenClients() {
    this.hideOpenClients = false;
    this.showOpenClients = true;
  }
  viewLessOpenClients(){
    this.hideOpenClients = true;
    this.showOpenClients = false;
  }
  showAllLastResults() {
    this.hideLastResults = false;
    this.showOpenClients = true;
  }
  viewLessLastResults(){
    this.hideLastResults = true;
    this.showOpenClients = false;
  }
  showAllSchedule(){
      this.hideSchedule = false;
      this.showOpenClients = true;
  }
  viewLessSchedule(){
    this.hideSchedule = true;
      this.showOpenClients = false;
  }
  showAllReview() {
    this.hideReview = false;
    this.showOpenClients = true;
  }
  viewLessReview(){
    this.hideReview = true;
    this.showOpenClients = false;
  }

  createPatient() {
    this.router.navigateByUrl('/pages/clients/registration');
    this.hideMenu.sentHideMenuValue(true);
  }

  getPatients() {
    this.patientService.list().subscribe(data => {
      this.patients = data;
      console.log('DS benh nhan', this.patients);
      this.openClients = this.patients.filter(x => x.VisitId !== 0);
    })
  }
  openDialog(): void {
    this.getPatients();
    const dialogRef = this.dialog.open(SearchPatientComponent, {
      height: '80%',
      width: '100%',
      panelClass: "edit",
      data: this.patients
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
