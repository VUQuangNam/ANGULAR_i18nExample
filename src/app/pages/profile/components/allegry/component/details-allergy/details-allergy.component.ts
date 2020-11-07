import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { AlertService } from "src/app/shared/services/alert.service";
import { environment } from 'src/environments/environment';
import Swal from "sweetalert2";
import { AllergyService } from "../../service";

@Component({
  selector: "app-details-allergy",
  templateUrl: "./details-allergy.component.html",
  styleUrls: ["./details-allergy.component.scss"],
})
export class DetailsAllergyComponent implements OnInit {
  [x: string]: any;
  constructor(
    public allergyService: AllergyService,
    public alertService: AlertService,
    private dialogRef: MatDialogRef<DetailsAllergyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  model: any = {};
  allergyList: any = [];
  symptomsList: any = [];
  filterAllergy: any = [];
  filterSymptons: any = [];

  ngOnInit() {
    console.log(this.data);
    this.getAllergy();
    this.getSymptons(this.key);
    this.model = this.data;
    this.model.StartDate = this.model.StartDate.split("T")[0];
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getSymptons(key) {
    this.allergyService.SearchSymptons(key).subscribe((res) => {
      this.symptomsList = res;
    });
  }
  searchTermSymptom(key) {
    if (!key) this.symptomsList = [];
    this.showItem = false;
    if (key.length >= 3)
      setTimeout(() => {
        this.getSymptons(key);
      }, 500);
  }
  setTermValue(item) {
    this.showItem = true;
    this.SNOMEDFullName = item.FullName;
    this.name = item.FullName;
    this.SNOMEDCode = item.SNOMEDCode;
    this.SNOMEDName = item.CommonName;
    this.symptomsList = [];
  }
  getAllergy() {
    this.allergyService.getAllegry().subscribe((res) => {
      this.allergyList = res;
      this.allergyList = this.allergyList.map((x) => {
        return {
          Name: x.Name,
          AllergyId: x.AllergyId,
        };
      });
    });
  }
  updateAllegryPatient() {
    this.allergyService
      .updateAllegryPatient(this.data.PatientAllergySymptomId, this.model)
      .subscribe((res) => {
        Swal.fire({
          icon: "success",
          title: "Update success!",
          showConfirmButton: false,
          timer: environment.timeCloseDialog,
        });
        this.dialogRef.close();
      });
  }

  filterListAllergy(key) {
    if (!key) this.filterAllergy = [];
    if (key)
      this.filterAllergy = this.allergyList.filter(
        (x) => x.Name.toLowerCase().indexOf(key.toLowerCase()) > -1
      );
  }

  filterListSymptons(key) {
    if (!key) this.filterSymptons = [];
    if (key)
      this.filterSymptons = this.symptomsList.filter(
        (x) => x.Name.toLowerCase().indexOf(key.toLowerCase()) > -1
      );
  }
}
