import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";
import swal from "sweetalert2";

import { AllergyService } from "../../service";
import { AllergyModel, SymptonsModel, PatientAllergyModel } from "../../model";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-create-allegry",
  templateUrl: "./create-allegry.component.html",
  styleUrls: ["./create-allegry.component.scss"],
})
export class CreateAllegryComponent implements OnInit {
  [x: string]: any;
  constructor(
    public dialogRef: MatDialogRef<CreateAllegryComponent>,
    public allergyService: AllergyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  name: string;
  allergyId: number;
  startDate: string;
  allergyname: string;
  frequency: string;
  allergyList: any = [];
  symptomsList: any = [];
  filterAllergy: any = [];
  result: any = [Object];
  searchField: string = "";
  keypress;
  isLoading = true;
  model: any = {};

  ngOnInit() {
    this.getAllergy();
    this.model.PatientId = this.data;
  }

  onChangeValue(item) {
    this.allergyid = item.AllergyId;
    this.filterAllergy = [];
  }

  setTermValue(item) {
    this.showItem = true;
    this.SNOMEDFullName = item.FullName;
    this.name = item.FullName;
    this.SNOMEDCode = item.SNOMEDCode;
    this.SNOMEDName = item.CommonName;
    this.symptomsList = [];
  }

  filterListAllergy(key) {
    if (!key) this.filterAllergy = [];
    this.filterAllergy = this.allergyList.filter(
      (x) => x.Name.toLowerCase().indexOf(key.toLowerCase()) > -1
    );
  }

  getAllergy() {
    this.allergyService.getAllegry().subscribe((res) => {
      this.allergyid = res[0].AllergyId;
      this.allergyName = res[0].Name;
      this.allergyList = res;
      this.allergyList = this.allergyList.map((x) => {
        return {
          Name: x.Name,
          AllergyId: x.AllergyId,
        };
      });
      // console.log("danh sách  dị ứng", this.allergyList);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
  createAllegryPatient() {
    let model = new PatientAllergyModel();
    model.PatientId = this.data;
    model.SymptomSNOMEDDescription = this.name;
    model.StartDate = this.startDate;
    model.Frequency = this.frequency;
    model.SymptomSNOMEDCode = this.SNOMEDCode;
    model.SymptomSNOMEDTerm = this.SNOMEDName;
    model.AllergyId = this.allergyId;

    this.allergyService.createAllegryPatient(model).subscribe((res) => {
      swal.fire({
        icon: "success",
        title: "Create success!",
        showConfirmButton: false,
        timer: environment.timeCloseDialog,
      });
      this.dialogRef.close();
    });
  }

  searchTermSymptom(key) {
    try {
      this.isLoading = false;
      clearTimeout(this.keypress);
      this.keypress = setTimeout(() => {
        this.allergyService.SearchSymptons(key).subscribe((res) => {
          this.symptomsList = res;
          this.isLoading = true;
        });
      }, 500);
    } catch (ex) {
      console.log(ex);
    }
  }
}
