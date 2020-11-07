import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

import { EditDemographicsComponent } from "./dialog/edit-demographics/edit-demographics.component";
import { AlertService } from 'src/app/shared/services/alert.service';
import { DemographicsService } from '../../service';
import { DemographicsModel } from '../../model';
@Component({
    selector: 'app-demographics',
    templateUrl: './demographics.component.html',
    styleUrls: ['./demographics.component.scss']
})
export class DemographicsComponent implements OnInit {
    relationshipFirstName: any;
    relationshipLastName: any;

    constructor(
        public dialog: MatDialog,
        public alertService: AlertService,
        public activatedRoute: ActivatedRoute,
        public demographicsService: DemographicsService
    ) { }
    patientList: any;
    currentPatient: any;
    firstName: string;
    firstName1: string;
    lastName: string;
    phone: string;
    email: string;
    gender: number;
    address: string;
    dob: string;
    nationalId: string;
    relationship: string;
    patientId: number;
    profileImageString: any;
    emergencyPhone: string;
    isShow: boolean = false;
    MediaURL: any;
    listRelationship: any;
    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(param => this.patientId = +param.get('patientId'));
        this.getAllPatient();
        this.getCurrentPatient();
        // this.getPatient();
    }

    showEdit() {
        this.isShow = !this.isShow;
    }

    openEditDialog() {
        const dialogRef = this.dialog.open(EditDemographicsComponent, {
            panelClass: "edit",
            data: this.currentPatient
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.getCurrentPatient();
        });
    }

    getAllPatient() {
        this.demographicsService.getAllPatient().subscribe(data => {
            this.patientList = data;
        });
    }

    getCurrentPatient() {
        this.demographicsService.getPatientById(this.patientId).subscribe(data => {
            this.currentPatient = data;
            this.firstName = this.currentPatient.FirstName;
            this.lastName = this.currentPatient.LastName;
            this.phone = this.currentPatient.Phone;
            this.email = this.currentPatient.Email;
            this.gender = this.currentPatient.Gender;
            this.address = this.currentPatient.Address;
            this.profileImageString = this.currentPatient.MediaURL;
            if (this.currentPatient.DOB == null) {
                this.dob = "";
            }
            else {
                this.dob = this.currentPatient.DOB.split('T')[0];
            }
            this.nationalId = this.currentPatient.NationalId;
            this.relationship = this.currentPatient.Relationship;
            console.log(this.relationship);
            this.emergencyPhone = this.currentPatient.EmergencyPhone;
            this.relationshipFirstName = this.currentPatient.RelationshipFirstName;
            this.relationshipLastName = this.currentPatient.RelationshipLastName;

        })
    }

    updateCurrentPatient() {
        let patient = new DemographicsModel();
        patient.FirstName = this.firstName;
        patient.LastName = this.lastName;
        patient.Phone = this.phone;
        patient.Email = this.email;
        patient.Gender = this.gender;
        patient.DOB = this.dob;
        patient.NationalId = this.nationalId;
        patient.Relationship = this.relationship;
        patient.Address = this.address;
        patient.EmergencyPhone = this.emergencyPhone;
        this.demographicsService.update(patient, this.patientId).subscribe(res => {
            console.log(patient);
            this.isShow = !this.isShow;
            this.alertService.changeMessage({
                color: 'green',
                text: `Sửa thành công`
            });
        }, null, () => { this.getCurrentPatient() });
    }

    // getPatient() {

    //   this.patientImmunizationscheduleService.getAllPatient().subscribe(res => {
    //   this.patientList = res
    //     console.log(res);

    //   })
    // }
    // getById() {
    //   this.patientImmunizationscheduleService.getPatientById(1).subscribe(res => {
    //     console.log( res);

    //   })
    // }

}
