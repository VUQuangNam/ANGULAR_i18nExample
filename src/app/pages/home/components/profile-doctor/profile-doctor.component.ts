import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { TabMenuService } from "../../../../shared/services/tabMenu.service";
import { ProviderService } from "../../services/provider.service";
import { ProviderModel } from '../../models/provider.model';
import Swal from 'sweetalert2'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-doctor',
  templateUrl: './profile-doctor.component.html',
  styleUrls: ['./profile-doctor.component.scss']
})
export class ProfileDoctorComponent implements OnInit {

  constructor(
    public location: Location,
    public showMenu: TabMenuService,
    public providerService: ProviderService
  ) { }

  profileImagePath: any;
  profileImageString: any;
  model: any;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: number;
  id: any;

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.providerService.getProfileProvider().subscribe(res => {
      this.model = res;
      this.firstName = this.model.FirstName;
      this.lastName = this.model.LastName;
      this.email = this.model.Email;
      this.gender = this.model.Gender;
      this.phone = this.model.Phone;
      this.profileImageString = this.model.MediaURL;
      this.dob = this.model.DOB.split('T')[0] || "";
      this.id = this.model.ProviderId;
      console.log(this.model);

    });
  }

  updateProfileProvider() {
    let model = new ProviderModel();
    model.FirstName = this.firstName;
    model.LastName = this.lastName;
    model.Email = this.email;
    model.Gender = +this.gender;
    model.DOB = this.dob;
    model.Phone = this.phone;
    model.MediaURL = this.profileImageString.split(',')[1];
    this.providerService.updateProfileProvider(this.id, model).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: 'Edit success!',
        showConfirmButton: false,
        timer: environment.timeCloseDialog
      })
      this.getProfile();
    });

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
  back() {
    this.location.back();
    this.showMenu.sentHideMenuValue(false);

  }

}
