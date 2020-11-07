import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { FamilyHistoryService } from '../../../services';

@Component({
    selector: 'app-detail-family',
    templateUrl: './detail-family.component.html',
    styleUrls: ['./detail-family.component.scss']
})
export class DetailFamilyComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<DetailFamilyComponent>,
        public familyService: FamilyHistoryService
    ) { }
    heartAttack: number = 1;
    checkFamily: number;
    isChecked: number;
    listRelationShip = [
        {
            idRelationShip: 1,
            Name: "Husband"
        },
        {

            idRelationShip: 2,
            Name: "Wife"
        },
        {
            idRelationShip: 3,
            Name: "Child"
        },
        {
            idRelationShip: 4,
            Name: "Parent"
        },
        {
            idRelationShip: 5,
            Name: "Friend"
        },
        {
            idRelationShip: 6,
            Name: "Other"
        },
    ]
    ngOnInit(): void {
        console.log(this.heartAttack);

        console.log(this.data);
        this.isChecked = this.data.RelationshipNumbericKey;
        this.checkFamily = this.data.DiseaseId;

    }

    updateRelationShipNumbericKey(relationShipId) {
        this.isChecked = relationShipId
        let model = {
            RelationshipNumbericKey: relationShipId,
            DiseaseId: this.data.DiseaseId,
        }

        this.familyService.putFamilyHistory(this.data.PatientFamilyfactorId, model).subscribe(res => {

        });
    }

    save() {
        if (this.heartAttack == 1) {
            Swal.fire({
                icon: 'success',
                title: 'Edit success!',
                showConfirmButton: false,
                timer: 1500
            });
            this.dialogRef.close();
        }
        else {
            this.deleteItem();
            Swal.fire({
                icon: 'success',
                title: 'Edit success!',
                showConfirmButton: false,
                timer: 1500
            });
            this.dialogRef.close();
        }

    }

    deleteItem() {
        this.familyService.deleteFamilyHistory(this.data.PatientFamilyfactorId).subscribe(ress => {
        });
    }

    selectType(heartAttack) {
        this.heartAttack = heartAttack;
    }

    closeDialog() {
        this.dialogRef.close();
    }

}
