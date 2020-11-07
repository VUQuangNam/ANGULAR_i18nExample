import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { MedicalHistoryModel } from '../../../../model';
import { MedicalHistoryService } from '../../../../service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-detail-medical-history',
    templateUrl: './detail-medical-history.component.html',
    styleUrls: ['./detail-medical-history.component.scss']
})
export class DetailMedicalHistoryComponent implements OnInit {
    [x: string]: any;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<DetailMedicalHistoryComponent>,
        public dialog: MatDialog,
        public medicalService: MedicalHistoryService,
        public alertService: AlertService
    ) { }

    type: number;
    name: string;
    since: string;
    medicalList: any
    surgicalList: any
    ngOnInit(): void {
        this.type = this.data.DataCurrent.Type;
        this.name = this.data.DataCurrent.SNOMEDCode;
        this.since = this.data.DataCurrent.StartDate.split('T')[0];
        this.getMedical(this.key)
        this.getSurgical(this.key)
    }
    getMedical(key){
        this.medicalService.SearchMdeical(key).subscribe(res => {
             this.medicalList = res;
        });
        }
        getSurgical(key){
        this.medicalService.SearchSurgical(key).subscribe(res => {
             this.surgicalList = res;
        });
        }
    
        searchName(key, type){
            switch (type) {
                case 1:
                if (!key) this.medicalList = [];
                this.showItem = false;
                if (key.length >= 3 ) 
                setTimeout(() => {
                this.getMedical(key);
                }, 500);
                    break;
                    case 2:
                        if (!key) this.surgicalList = [];
                        this.showItem = false;
                        if (key.length >= 3 ) 
                        setTimeout(() => {
                        this.getSurgical(key);
                        }, 500);
                        break;
                default:
                    break;
            }
            
        }
        setTermMedical(name, symptomId, SNOMEDCode) {
            this.showItem = true;
            this.name = name;
            this.SNOMEDCode = SNOMEDCode;
            this.medicalList = [];
            this.filterSymptom = [];
          }
          setTermSurgical(name, symptomId, SNOMEDCode) {
            this.showItem = true;
            this.name = name;
            this.SNOMEDCode = SNOMEDCode;
            this.surgicalList = [];
            this.filterSymptom = [];
          }

    updateItem() {
        let model = new MedicalHistoryModel();
        model.SNOMEDCode = this.name;
        model.Type = this.type;
        model.StartDate = this.since;
        this.medicalService.putPatientMedical(this.data.DataCurrent.PatientMedicalfactorId, model).subscribe(res => {
            Swal.fire({
                icon: 'success',
                title: 'Update success!',
                showConfirmButton: false,
                timer: 1500
            });
            this.dialogRef.close();
        });
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    selectType(type: number) {
        this.type = type;
    }

}
