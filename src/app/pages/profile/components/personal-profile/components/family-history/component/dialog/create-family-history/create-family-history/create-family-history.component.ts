import { Component, OnInit, Inject } from "@angular/core";

import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import Swal from "sweetalert2";

import { AlertService } from "src/app/shared/services/alert.service";
import { FamilyHistoryService } from "../../../../services";

@Component({
  selector: "app-create-family-history",
  templateUrl: "./create-family-history.component.html",
  styleUrls: ["./create-family-history.component.scss"],
})
export class CreateFamilyHistoryComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateFamilyHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public familyHistoryService: FamilyHistoryService,
    public alertService: AlertService
  ) {}

  listRelationShip = [
    {
      idRelationShip: 1,
      Name: "Grandfather",
    },
    {
      idRelationShip: 2,
      Name: "Grandmother",
    },
    {
      idRelationShip: 3,
      Name: "Father",
    },
    {
      idRelationShip: 4,
      Name: "Mother",
    },
    {
      idRelationShip: 5,
      Name: "Uncle",
    },
    {
      idRelationShip: 6,
      Name: "Aunt",
    },
    {
      idRelationShip: 7,
      Name: "Brother",
    },
    {
      idRelationShip: 8,
      Name: "Sister",
    },
    {
      idRelationShip: 9,
      Name: "Son",
    },
    {
      idRelationShip: 10,
      Name: "Daughter",
    },
  ];

  heartAttack: number = 0;
  stroke: number = 0;
  dementia: number = 0;
  diabetes: number = 0;
  blood: number = 0;
  cancer: number = 0;

  arrayHeartFamily = [];
  arrayStrokeFamily = [];
  arrayDementiaFamily = [];
  arrayDiabetesFamily = [];
  arrayBloodFamily = [];
  arrayCancerFamily = [];
  dataFamilyHistory: any;
  ngOnInit(): void {
    console.log(this.data);
    this.dataFamilyHistory = {
      PatientId: this.data,
      ListFamilyFactor: [
        {
          DiseaseId: 1,
          RelationshipList: this.arrayHeartFamily,
        },
        {
          DiseaseId: 2,
          RelationshipList: this.arrayStrokeFamily,
        },
        {
          DiseaseId: 3,
          RelationshipList: this.arrayDementiaFamily,
        },
        {
          DiseaseId: 4,
          RelationshipList: this.arrayDiabetesFamily,
        },
        {
          DiseaseId: 5,
          RelationshipList: this.arrayBloodFamily,
        },
        {
          DiseaseId: 6,
          RelationshipList: this.arrayCancerFamily,
        },
      ],
    };
  }

  // getListRelationship() {
  //   this.familyHistoryService.getListRelationship().subscribe((res) => {
  //     this.listRelationShip = res;
  //     console.log("aaa", this.listRelationShip);
  //   });
  // }

  createFamilyHistory() {
    this.familyHistoryService
      .create(this.dataFamilyHistory)
      .subscribe((res) => {
        Swal.fire({
          icon: "success",
          title: "Create success!",
          showConfirmButton: false,
          timer: 1500,
        });
        this.dialogRef.close();
      });
  }

  clickBlood(blood) {
    this.blood = blood;
  }

  listheartAttack(relationshipId, isChecked) {
    if (isChecked) {
      this.arrayHeartFamily.push(relationshipId);
    } else {
      let index = this.arrayHeartFamily.indexOf(relationshipId);
      this.arrayHeartFamily.splice(index, 1);
    }
  }

  listDementia(relationshipId, isChecked) {
    if (isChecked) {
      this.arrayDementiaFamily.push(relationshipId);
    } else {
      let index = this.arrayDementiaFamily.indexOf(relationshipId);
      this.arrayDementiaFamily.splice(index, 1);
    }
  }
  listDiabetes(relationshipId, isChecked) {
    if (isChecked) {
      this.arrayDiabetesFamily.push(relationshipId);
    } else {
      let index = this.arrayDiabetesFamily.indexOf(relationshipId);
      this.arrayDiabetesFamily.splice(index, 1);
    }
  }
  listHighBlood(relationshipId, isChecked) {
    if (isChecked) {
      this.arrayBloodFamily.push(relationshipId);
    } else {
      let index = this.arrayBloodFamily.indexOf(relationshipId);
      this.arrayBloodFamily.splice(index, 1);
    }
  }
  listStroke(relationshipId, isChecked) {
    if (isChecked) {
      this.arrayStrokeFamily.push(relationshipId);
    } else {
      let index = this.arrayStrokeFamily.indexOf(relationshipId);
      this.arrayStrokeFamily.splice(index, 1);
    }
  }
  listCancer(relationshipId, isChecked) {
    if (isChecked) {
      this.arrayCancerFamily.push(relationshipId);
    } else {
      let index = this.arrayCancerFamily.indexOf(relationshipId);
      this.arrayCancerFamily.splice(index, 1);
    }
    console.log(this.dataFamilyHistory);
  }

  clickCancer(cancer) {
    this.cancer = cancer;
  }

  clickDiabetes(diabetes) {
    this.diabetes = diabetes;
  }

  clickDementia(dementia) {
    this.dementia = dementia;
  }

  clickStroke(stroke) {
    this.stroke = stroke;
  }

  selectType(heartAttack) {
    this.heartAttack = heartAttack;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
