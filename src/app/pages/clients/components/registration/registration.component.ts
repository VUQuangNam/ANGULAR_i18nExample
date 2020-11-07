import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { from } from 'rxjs';
import { RegistrationService } from "../../services/registration.service";
import { RegistrationModel } from "../../models/registration.model";
import { AlertService } from "../../../../shared/services/alert.service";
import { TabMenuService } from "../../../../shared/services/tabMenu.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {


  constructor(
    public registrationService: RegistrationService,
    private router: Router,
    private alertService: AlertService,
    private location: Location,
    private showMenu: TabMenuService,
    public hideMenu: TabMenuService

  ) { }

  profileImagePath: any;
  profileImageString: any;
  RelationshipFirstName: string;
  RelationshipLastName: string;
  isCheck: boolean = false;
  relationship: number = 1;
  listRelationship: any;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: number = 1;
  address: string;
  nationalId: string;
  emergencyPhone: string;
  DOB: string;
  patientId: number;

  processFileProfileImage(files: File) {
    var reader = new FileReader();
    this.profileImagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.profileImageString = reader.result;
      // console.log(this.profileImageString.split(",")[1]);
    };
  }
 
  ngOnInit(): void {
    console.log(this.profileImageString);
    this.getListRelationship();
  }
  getListRelationship(){
    this.registrationService.getRelationship().subscribe(res => {
        this.listRelationship = res;
        console.log(res);
    });
}
clickRelationship(relationship){
    this.relationship = +relationship;
}
  back() {
    this.location.back();
    this.showMenu.sentHideMenuValue(false);
  }

  createCustomer() {
    this.isCheck = true;
    let customer = new RegistrationModel();
    customer.FirstName = this.firstName;
    customer.LastName = this.lastName;
    customer.Phone = this.phone;
    customer.Email = this.email;
    customer.DOB = this.DOB;
    customer.Gender = this.gender;
    customer.Address = this.address;
    customer.NationalId = this.nationalId;
    customer.EmergencyRelationshipType = +this.relationship;
    customer.RelationshipFirstName = this.RelationshipFirstName;
    customer.RelationshipLastName = this.RelationshipLastName;
    customer.EmergencyPhone = this.emergencyPhone;
    customer.MediaURL = this.profileImageString ? this.profileImageString.split(",")[1] : null
    this.registrationService.create(customer).subscribe(res => {
      this.isCheck = false;
      this.router.navigateByUrl('pages/clients')
      this.hideMenu.sentHideMenuValue(false);
      this.patientId = customer.PatientId;
      console.log("customer", customer);
      console.log("res.PatientId", res);
      this.alertService.changeMessage({
        color: 'green',
        text: `Tạo thành công`
      });
    })
  }
}
