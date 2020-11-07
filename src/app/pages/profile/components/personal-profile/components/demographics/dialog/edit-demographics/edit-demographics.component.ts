import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AlertService } from 'src/app/shared/services/alert.service';
import { DemographicsService } from '../../../../service';
import { DemographicsModel } from '../../../../model';

@Component({
    selector: 'app-edit-demographics',
    templateUrl: './edit-demographics.component.html',
    styleUrls: ['./edit-demographics.component.scss']
})
export class EditDemographicsComponent implements OnInit {
    RelationshipFirstName: string;
    RelationshipLastName: string;

    constructor(
        public dialogRef: MatDialogRef<EditDemographicsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
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
    relationship: number;
    patientId: number;
    profileImageString: any;
    emergencyPhone: string;
    isShow: boolean = false;
    profileImagePath: any;
    listRelationship: any;
    relationshipName: string;

    ngOnInit(): void {
        this.currentPatient = this.data;
        this.firstName = this.currentPatient.FirstName;
        this.lastName = this.currentPatient.LastName;
        this.phone = this.currentPatient.Phone;
        this.email = this.currentPatient.Email;
        this.gender = this.currentPatient.Gender;
        this.address = this.currentPatient.Address;
        this.profileImageString = this.data.MediaURL;

        if (this.currentPatient.DOB == null) {
            this.dob = "";
        }
        else {
            this.dob = this.currentPatient.DOB.split('T')[0];
        }
        this.nationalId = this.currentPatient.NationalId;
        this.relationshipName = this.currentPatient.Relationship;
        this.emergencyPhone = this.currentPatient.EmergencyPhone;
        this.RelationshipFirstName = this.data.RelationshipFirstName;
        this.RelationshipLastName = this.data.RelationshipLastName;
        this.getListRelationship();
    }

        
    getListRelationship(){
        this.demographicsService.getRelationship().subscribe(res => {
            this.listRelationship = res;
            this.relationship = res.find(x => x.Value === this.relationshipName).NumericKey;
            console.log(this.relationship);
        });
    }

    closeDialog() {
        this.dialogRef.close();
    }

    processFileProfileImage(files: File) {
        var reader = new FileReader();
        this.profileImagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = _event => {
            this.profileImageString = reader.result;
            // console.log(this.profileImageString.split(",")[1]);
        };
    }
    clickRelationship(relationship){
        this.relationship = +relationship;
        console.log(this.relationship);
        
    }

    updateCurrentPatient() {
        let patient = new DemographicsModel();
        patient.MediaURL = this.profileImageString.split(",")[1];
        patient.FirstName = this.firstName;
        patient.LastName = this.lastName;
        patient.Phone = this.phone;
        patient.Email = this.email;
        patient.Gender = this.gender;
        patient.DOB = this.dob;
        patient.NationalId = this.nationalId;
        patient.EmergencyRelationshipType = +this.relationship;
        patient.RelationshipFirstName = this.RelationshipFirstName;
        patient.RelationshipLastName = this.RelationshipLastName;
        patient.Address = this.address;
        patient.EmergencyPhone = this.emergencyPhone;
        this.demographicsService.update(patient, this.data.PatientId).subscribe(res => {
            this.dialogRef.close();
            this.alertService.changeMessage({
                color: 'green',
                text: `Sửa thành công`
            });
        });
    }
}
