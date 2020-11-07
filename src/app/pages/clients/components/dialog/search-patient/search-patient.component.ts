import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
//service

import { PatientService } from '../../../services/patient.service';
@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.scss']
})
export class SearchPatientComponent implements OnInit {
  @Inject(MAT_DIALOG_DATA) public data: any
  constructor(
    private patientService: PatientService,
    private router: Router,
    private dialog: MatDialogRef<SearchPatientComponent>

  ) { }
  patients: any;
  patientsSub: any = [];
  timer: any;
  keypress: any;
  ngOnInit(): void {
    this.getPatients();
  }
  getPatients() {
    this.patientService.list().subscribe(data => {
      this.patients = data;
      this.patients.forEach(x => {
        x.FirstName = x.FirstName || "";
        x.LastName = x.LastName || "";
      });
      this.patientsSub = this.patients;
      console.log('DS benh nhan', this.patients);
    })
  }

  searchPatient(keyWord) {
    if (keyWord) {
      clearTimeout(this.keypress);
      this.keypress = setTimeout(() => {
        this.patientService.searchPatient(keyWord).subscribe(res => {
          this.patientsSub = res;
        });
      }, 500);
    }
    else {
      this.patientsSub = this.patients;
    }
  }

  closeDialog() {
    this.dialog.close();
  }

  routerLink(patientId: number) {
    this.router.navigateByUrl(`pages/profile/detail/${patientId}/profile-info`);
    this.closeDialog();
  }

  // onSearch(key) {
  //   if (!key) {this.patientsSub = this.patients;}
  //   else{
  //     this.patientsSub = this.patients.filter(x => x.FirstName.toLowerCase().indexOf(key.toLowerCase()) > -1 
  //     || x.LastName.toLowerCase().indexOf(key.toLowerCase()) > -1 || x.PatientId === +key)
  //   }
  // }
  deletePatient(patientId) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9FB9C8',
      cancelButtonColor: '',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.patientService.delete(patientId).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'Delete success!',
            showConfirmButton: false,
            timer: environment.timeCloseDialog
          });
          this.getPatients();
        });
      }
    })
  }
}
